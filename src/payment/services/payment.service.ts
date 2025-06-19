import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreatePaymentDepositDto } from '../dtos/create-payment-deposit.dto';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { Request } from 'express';
import { CreatePaymentDepositResponseDto } from '../dtos/create-payment-deposit-response.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  verifyVNPaySignature(query: Record<string, string>): boolean {
    console.log(query);

    const vnp_SecureHash = query['vnp_SecureHash'];
    delete query['vnp_SecureHash'];
    delete query['vnp_SecureHashType'];

    const sortedParams = Object.keys(query)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = query[key];
          return acc;
        },
        {} as Record<string, string>,
      );

    const signData = Object.entries(sortedParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    const hash = crypto
      .createHmac('sha256', process.env.VNP_HASHSECRET) // Use 'md5' if MD5 is required
      .update(signData)
      .digest('hex');

    return hash === vnp_SecureHash;
  }

  sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  async CreateDepositRequest(
    dto: CreatePaymentDepositDto,
    userId: number,
    req: Request,
  ): Promise<CreatePaymentDepositResponseDto> {
    const ipAddr =
      req.headers['x-forwarded-for']?.toString() ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress ||
      '';

    const date = new Date();
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const createDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
    const orderId = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          token: {
            increment: dto.amount,
          },
        },
      }),
      this.prisma.payment.create({
        data: {
          userId,
          amount: dto.amount,
          provider: 'VNPay',
          providerRef: orderId,
          status: 'COMPLETED',
          purpose: 'DEPOSIT',
        },
      }),
    ]);

    const vnpParams: Record<string, any> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.VNP_TMNCODE,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Nap ${dto.amount} token for user ${userId}`,
      vnp_OrderType: 'other',
      vnp_Amount: dto.amount * 1000 * 100,
      vnp_ReturnUrl: `${process.env.VNP_RETURNURL}/deposit-success`,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Sort params by key
    const sortedParams = this.sortObject(vnpParams);

    var querystring = require('qs');
    var signData = querystring.stringify(sortedParams, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    sortedParams['vnp_SecureHash'] = signed;

    const paymentUrl = `${process.env.VNP_URL}?${qs.stringify(sortedParams, { encode: false })}`;

    return {
      url: paymentUrl,
    };
  }

  async mockDepositSuccess(dto: CreatePaymentDepositDto, userId: number) {
    const mockRef = `mock-success-${Date.now()}`;

    const result = await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          token: {
            increment: dto.amount,
          },
        },
      }),
      this.prisma.payment.create({
        data: {
          userId,
          amount: dto.amount,
          provider: 'MockGateway',
          providerRef: mockRef,
          status: 'COMPLETED',
          purpose: 'DEPOSIT',
        },
      }),
    ]);

    return result;
  }
}

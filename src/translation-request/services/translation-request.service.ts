import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateTranslationRequestDto } from "../dtos/create-translation-request.dto";
import { Constraint } from "src/utils/constraint";
import { InsufficientTokenException } from "../exceptions/insufficient-token.exception";
import { PaginationQueryDto } from "src/dtos/pagination-query.dto";
import { PaginatedTranslationRequestDto } from "../dtos/paginated-translation-request.dto";
import { plainToInstance } from "class-transformer";
import { TranslationRequestDto } from "../dtos/translation-request.dto";

@Injectable()
export class TranslationRequestService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(queryDto: PaginationQueryDto): Promise<PaginatedTranslationRequestDto> {
    const { page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.translationRequest.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          payment: true,
        },
      }),
      this.prisma.translationRequest.count(),
    ]);

    return {
      data: plainToInstance(TranslationRequestDto, data),
      limit,
      page,
      total
    }
  }

  async create(createDto: CreateTranslationRequestDto, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        token: true
      }
    });

    if (!user || user.token < Constraint.REQUEST_FEE) {
      throw new InsufficientTokenException();
    }

    const providerRef = `req-${Date.now()}`;

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: userId
        },
        data: {
          token: {
            decrement: Constraint.REQUEST_FEE
          }
        }
      });

      const payment = await tx.payment.create({
        data: {
          userId,
          amount: Constraint.REQUEST_FEE,
          provider: 'Internal',
          providerRef,
          purpose: 'REQUEST',
          status: 'COMPLETED',
        },
      })

      return tx.translationRequest.create({
        data: {
          title: createDto.title,
          authorName: createDto.authorName,
          additionalComment: createDto.additionalComment,
          userId,
          paymentId: payment.id
        }
      });
    });
  }
}


import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { PaginatedUserDto } from '../dtos/paginated-user.dto';
import { UserDto } from '../dtos/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  async findAllPaginated(query: PaginationQueryDto): Promise<PaginatedUserDto> {
    const { page = 1, limit = 10 } = query;

    const [total, users] = await this.prismaService.$transaction([
      this.prismaService.user.count(),
      this.prismaService.user.findMany({
        select: {
          username: true,
          email: true,
          role: true,
          id: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'asc' },
      }),
    ]);

    return {
      total,
      page,
      limit,
      data: plainToInstance(UserDto, users, {
        excludeExtraneousValues: true,
      }),
    };
  }
}

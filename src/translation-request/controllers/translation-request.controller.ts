import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { TranslationRequestService } from "../services/translation-request.service";
import { CreateTranslationRequestDto } from "../dtos/create-translation-request.dto";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { AuthorizedUser } from "src/auth/models/authorized.user";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/jwt.guard";
import { PaginationQueryDto } from "src/dtos/pagination-query.dto";
import { PaginatedTranslationRequestDto } from "../dtos/paginated-translation-request.dto";

@Controller('translation-request')
export class TranslationRequestController {
  constructor(private readonly translationRequestService: TranslationRequestService) { }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create translation request and deduct token' })
  async create(@Body() dto: CreateTranslationRequestDto, @GetUser() user: AuthorizedUser) {
    return this.translationRequestService.create(dto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all translation requests (paginated)' })
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedTranslationRequestDto> {
    return this.translationRequestService.findAll(query);
  }
}

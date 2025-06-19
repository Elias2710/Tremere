import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateTranslationRequestDto } from "../dtos/create-translation-request.dto";
import { PaginationQueryDto } from "src/dtos/pagination-query.dto";
import { PaginatedTranslationRequestDto } from "../dtos/paginated-translation-request.dto";
export declare class TranslationRequestService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(queryDto: PaginationQueryDto): Promise<PaginatedTranslationRequestDto>;
    create(createDto: CreateTranslationRequestDto, userId: number): Promise<any>;
}

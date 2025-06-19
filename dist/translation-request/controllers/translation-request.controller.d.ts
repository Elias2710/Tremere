import { TranslationRequestService } from "../services/translation-request.service";
import { CreateTranslationRequestDto } from "../dtos/create-translation-request.dto";
import { AuthorizedUser } from "src/auth/models/authorized.user";
import { PaginationQueryDto } from "src/dtos/pagination-query.dto";
import { PaginatedTranslationRequestDto } from "../dtos/paginated-translation-request.dto";
export declare class TranslationRequestController {
    private readonly translationRequestService;
    constructor(translationRequestService: TranslationRequestService);
    create(dto: CreateTranslationRequestDto, user: AuthorizedUser): Promise<any>;
    findAll(query: PaginationQueryDto): Promise<PaginatedTranslationRequestDto>;
}

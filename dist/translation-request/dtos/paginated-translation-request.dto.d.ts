import { TranslationRequestDto } from "./translation-request.dto";
export declare class PaginatedTranslationRequestDto {
    page: number;
    limit: number;
    total: number;
    data: TranslationRequestDto[];
}

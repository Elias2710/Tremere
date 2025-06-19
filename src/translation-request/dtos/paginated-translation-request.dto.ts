import { ApiProperty } from "@nestjs/swagger";
import { TranslationRequestDto } from "./translation-request.dto";

export class PaginatedTranslationRequestDto {

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ type: [TranslationRequestDto] })
  data: TranslationRequestDto[];
}

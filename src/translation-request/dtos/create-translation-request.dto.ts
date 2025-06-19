import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateTranslationRequestDto {
  @ApiProperty({ example: 'My Awesome Manga' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({ example: 'This is a high-priority request', required: false })
  @IsOptional()
  @IsString()
  additionalComment?: string;
}

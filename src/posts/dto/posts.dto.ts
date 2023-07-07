import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsValidCategoriesConstraint } from '../validation/posts.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creator?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pubDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dcCreator?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentSnippet?: string;

  @ApiProperty({ type: [String, [String], null] })
  @Validate(IsValidCategoriesConstraint)
  @Type(() => String)
  categories?: string[] | string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  guid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isoDate?: string;
}

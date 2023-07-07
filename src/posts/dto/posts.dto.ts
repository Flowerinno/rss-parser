import { IsOptional, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsValidCategoriesConstraint } from '../posts.validation';

export class CreatePostDto {
  @IsString()
  creator?: string;

  @IsString()
  title?: string;

  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  pubDate?: string;

  @IsOptional()
  @IsString()
  dcCreator?: string;

  @IsString()
  content?: string;

  @IsString()
  contentSnippet?: string;

  @Validate(IsValidCategoriesConstraint)
  @Type(() => String)
  categories?: string[] | string | null;

  @IsString()
  guid?: string;

  @IsOptional()
  @IsString()
  isoDate?: string;
}

export class CreatePostDto {
  id?: number;

  creator?: string;

  title?: string;

  link?: string;

  pubDate?: string;

  content?: string;

  contentSnippet?: string;

  categories?: string;
}

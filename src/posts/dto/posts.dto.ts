export class CreatePostDto {
  creator?: string;

  title?: string;

  link?: string;

  pubDate?: string;

  dcCreator?: string;

  content?: string;

  contentSnippet?: string;

  categories?: string[] | string | null;

  guid?: string;

  isoDate?: string;
}

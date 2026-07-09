export interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
}

export interface RawBlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

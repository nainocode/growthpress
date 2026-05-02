export type PostCategory = "Tech" | "Earning" | "Dropshipping" | "Freelancing" | "AI";

export interface AffiliateProduct {
  title: string;
  description: string;
  ctaLabel: "Buy Now" | "Learn More";
  url: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: PostCategory;
  tags: string[];
  featuredImage: string;
  featured?: boolean;
  trending?: boolean;
  affiliateProducts?: AffiliateProduct[];
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTimeText: string;
  headings: HeadingItem[];
}

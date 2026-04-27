export interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  description: string;
  isNew?: boolean;
  isSlideshow?: boolean;
  caseStudy: {
    type: "image" | "video";
    src: string;
  }[];
}

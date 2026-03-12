export interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  description: string;
  caseStudy: {
    type: "image" | "video";
    src: string;
  }[];
}

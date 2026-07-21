import type { Metadata } from "next";

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildSeoMetadata({
  title,
  description,
  path = "/"
}: SeoMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

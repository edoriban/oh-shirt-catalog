export interface Category {
  slug: string;
  name: string;
  description: string;
  accent: string;
  count: number;
}

export const categories: Category[] = [
  {
    slug: "demon-slayer",
    name: "Demon Slayer",
    description: "Kimetsu no Yaiba",
    accent: "#e74c8b",
    count: 28,
  },
  {
    slug: "star-wars",
    name: "Star Wars",
    description: "A Galaxy Far, Far Away",
    accent: "#ffd700",
    count: 25,
  },
  {
    slug: "caballeros-del-zodiaco",
    name: "Caballeros del Zodiaco",
    description: "Saint Seiya",
    accent: "#7b68ee",
    count: 16,
  },
  {
    slug: "one-piece",
    name: "One Piece",
    description: "La Gran Era Pirata",
    accent: "#ff6b35",
    count: 14,
  },
  {
    slug: "thundercats",
    name: "ThunderCats",
    description: "Thunder, Thunder, ThunderCats!",
    accent: "#e83e8c",
    count: 12,
  },
  {
    slug: "stranger-things",
    name: "Stranger Things",
    description: "The Upside Down",
    accent: "#cc0000",
    count: 6,
  },
];

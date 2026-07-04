export type Stand = {
  id: string;
  number: string;
  title: string;
  zone: "Residential" | "Commercial" | "Mixed Use";
  size: number; // sqm
  price: number; // USD
  status: "Available" | "Reserved" | "Sold";
  road: string;
  featured?: boolean;
  image: string;
  video: string;
  highlights: string[];
  description: string;
};

const img = (id: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=70`;

const VIDEO_A =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const VIDEO_B =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const VIDEO_C =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export const stands: Stand[] = [
  {
    id: "ew-2411",
    number: "2411",
    title: "Cornerstone Plot near 30m Road",
    zone: "Residential",
    size: 480,
    price: 18500,
    status: "Available",
    road: "30m Road",
    featured: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_A,
    highlights: ["Corner stand", "Tarred road access", "Title deed ready"],
    description:
      "Prime corner stand fronting the 30m main road. Ideal for a family home with excellent visibility and easy access to community amenities.",
  },
  {
    id: "ew-2456",
    number: "2456",
    title: "Quiet Interior Stand · 18m Road",
    zone: "Residential",
    size: 360,
    price: 14200,
    status: "Available",
    road: "18m Road",
    featured: true,
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_B,
    highlights: ["Walking distance to school", "Flat terrain", "Water line in place"],
    description:
      "A quiet interior stand on the 18m road, perfectly sized for a modern family residence with a generous garden.",
  },
  {
    id: "ew-2509",
    number: "2509",
    title: "Premium Plot · Near Community Hall",
    zone: "Mixed Use",
    size: 540,
    price: 22500,
    status: "Available",
    road: "15m Road",
    featured: true,
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_C,
    highlights: ["Near community hall", "Mixed use zoning", "High resale potential"],
    description:
      "Centrally located premium stand close to the local authority and community hall. Excellent investment opportunity.",
  },
  {
    id: "ew-16921",
    number: "16921",
    title: "Family Stand · Near Creche",
    zone: "Residential",
    size: 320,
    price: 12800,
    status: "Available",
    road: "12m Road",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_A,
    highlights: ["Walk to creche", "Quiet street", "Affordable entry"],
    description: "Affordable family stand within a short walk to the creche and church.",
  },
  {
    id: "ew-17021",
    number: "17021",
    title: "Open Space Frontage Plot",
    zone: "Residential",
    size: 400,
    price: 16000,
    status: "Reserved",
    road: "12m Road",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_B,
    highlights: ["Faces open space", "Great views", "Reservation pending"],
    description: "Stand fronting a 1.34ha open green space — perfect for a home with a view.",
  },
  {
    id: "ew-15993",
    number: "15993",
    title: "Commercial Frontage · 15m Road",
    zone: "Commercial",
    size: 620,
    price: 32500,
    status: "Available",
    road: "15m Road",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_C,
    highlights: ["Commercial zoning", "High footfall", "Near PFS"],
    description:
      "Rare commercial frontage opportunity near the PFS and community amenities. High visibility location.",
  },
  {
    id: "ew-16870",
    number: "16870",
    title: "Schoolside Family Stand",
    zone: "Residential",
    size: 380,
    price: 15400,
    status: "Available",
    road: "15m Road",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_A,
    highlights: ["Across from primary school", "Family friendly", "Pipeline servitude nearby"],
    description: "Family stand directly opposite the 3.5ha primary school — ideal for households with young children.",
  },
  {
    id: "ew-17047",
    number: "17047",
    title: "Open Space Edge · Southern Block",
    zone: "Residential",
    size: 350,
    price: 13900,
    status: "Sold",
    road: "12m Road",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=70",
    video: VIDEO_B,
    highlights: ["Quiet edge location", "Near open space", "Recently sold"],
    description: "Recently sold stand on the southern block — listed for reference.",
  },
];

export const getStand = (id: string) => stands.find((s) => s.id === id);

// EDIT THIS FILE to update the whole site. Empty strings = hidden/unverified.
export const personal = {
  name: "Britt Heartrose D. Pepino",
  monogram: "My Portfolio",
  location: "Gigaquit, Surigao Del Norte, Philippines",
  focus: "Graphic Design",
  school: "Nort Eastern Mindanao State University",
  email: "bhpepino@nemsu.edu.ph",            // e.g. "you@email.com" — enables copy-email + mailto fallback
  resume: "",           // e.g. "/resume.pdf" (put file in /public) — button hidden if empty
  photo: "/profile.jpg",            // e.g. "/profile.jpg" (put file in /public) — shown in About section
  heroPhoto: "/profile.jpg",        // e.g. "/profile.jpg" (put file in /public) — shown in Hero arch (screenshot)
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT ?? "", // Formspree URL, see README
  socials: { Instagram: "", Behance: "", Email: "", Facebook: "", LinkedIn: "" } as Record<string, string>,
  tagline: "Creating with intention. Designing with imagination.",
};

export const categories = ["Poster Design", "Branding & Identity", "Marketing & Advertising"] as const;
export type Category = (typeof categories)[number];

export interface Project {
  id: string; title: string; category: Category; description: string;
  palette: string[];
  cover?: string; gallery?: string[]; link?: string; ratio?: string; sample: boolean;
}

// All real work with images provided:
export const projects: Project[] = [
  {
    id: "p1",
    title: "Informative promotional infographic",
    category: "Poster Design",
    cover: "/images/p1.png",
    sample: false,
    description: "Designed a promotional poster showcasing the printing shop’s services, using colorful illustrations, organized layouts, and clear information to make the advertisement engaging and easy to understand.",
    palette: ["#e30613", "#ffffff", "#171717"]
  },
  {
    id: "p2",
    title: "Justirose Cafe and Bakery Logo",
    category: "Branding & Identity",
    cover: "/images/p2.jpg",
    sample: false,
    description: "Designed a logo for Justirose Cafe and Bakery, combining a coffee cup and botanical elements with elegant typography and a green-and-gold color scheme to reflect the brand’s identity and create a warm, inviting, and sophisticated visual style.",
    palette: ["#a88952", "#5e6a27", "#8b5e3c"]
  },
  {
    id: "p3",
    title: "Luxury Handbag Promotional Advertisement",
    category: "Marketing & Advertising",
    cover: "/images/social1.jpg",
    sample: false,
    description: "Created a luxury handbag advertisement, focusing on elegant typography, a sophisticated color palette, and product presentation to attract potential customers.",
    palette: ["#C8B9FF", "#3155E7", "#171717"]
  },
  {
    id: "p4",
    title: "El Cinco Farmville & Resort Promotional Layout",
    category: "Marketing & Advertising",
    cover: "/images/p4.jpg",
    sample: false,
    description: "Designed a promotional layout for El Cinco Farmville & Resort, highlighting its dining, accommodation, event facilities, and rest houses through attractive photography and elegant design elements.",
    palette: ["#F7F5F0", "#171717", "#3155E7"]
  },
];

// Suggestions to verify — not claims of mastery.
export const skills = [
  { group: "Graphic Design", items: ["Layout & Composition", "Typography", "Color Theory", "Visual Hierarchy", "Poster Design", "Social Media Graphics", "Print Design", "Branding & Visual Identity"] },
  { group: "Digital Design", items: ["Digital Content Design", "Marketing Graphics", "Promotional Materials", "Creative Layouts", "Basic UI Design"] },
  { group: "Creative & Technical", items: ["Image Editing", "Photo Manipulation", "Visual Storytelling", "Design Presentation", "File Preparation for Print"] },
  { group: "Tools (verify)", items: ["Canva", "Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Figma"] },
];

export const services = [
  ["Poster & Promotional Design", "Event and advertising graphics with clear hierarchy."],
  ["Social Media Graphics", "Cohesive post and campaign layouts."],
  ["Logo & Branding Concepts", "Marks, palettes and type systems."],
  ["Business Cards & Marketing Materials", "Compact, print-ready brand pieces."],
  ["Print Layout & Publication", "Flyers, brochures and editorial layouts."],
  ["Digital Content Design", "Visuals made for screens."],
];

export const steps = [
  ["Discover", "Understand the goal, audience, message, and intended use of the design."],
  ["Explore", "Research references, experiment with typography, select colors, and develop visual directions."],
  ["Design", "Refine the composition, develop the chosen concept, and create the visual materials."],
  ["Refine", "Review the design, improve the details, and prepare the final output for its intended use."],
];

// Education & achievements: leave empty to hide the sections. Fill with VERIFIED info only.
export const education: { school: string; program: string; dates: string; notes?: string }[] = [];
export const achievements: { title: string; org: string; date: string; description?: string }[] = [];

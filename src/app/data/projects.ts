export interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "MenuMixer",
    description:
      "MenuMixer helps you create personalized meal plans tailored to your preferences, with automated shopping lists and step-by-step instructions.",
    link: "https://menumixer.io",
  },
  {
    title: "Sovereignty Toolkit",
    description: "A comprehensive toolkit for digital & financial sovereignty.",
    link: "https://sovereigntoolkit.netlify.app/",
  },
  {
    title: "Resy Booking Bot",
    description:
      "A bot that automates reservation bookings on Resy and other restaurant booking platforms, securing tables at your favorite restaurants effortlessly.",
    image: "/images/resy-booking-bot-canvas.png",
  },
];

export default projects;

// Helper to get all project URLs (for screenshot generation)
export function getProjectUrls(): string[] {
  return projects
    .filter((project) => project.link)
    .map((project) => project.link as string);
}

// Helper to get project info by URL (for static link previews)
export function getProjectInfoByUrl(url: string) {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    const project = projects.find(
      (p) => p.link && new URL(p.link).hostname.replace("www.", "") === domain
    );

    if (project) {
      return {
        title: project.title,
        description: project.description,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

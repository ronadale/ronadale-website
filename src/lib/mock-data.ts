export interface Artist {
  id: string;
  name: string;
  slug: string;
}

export interface PressLink {
  id: string;
  title: string;
  url: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  artist: Artist;
  status: 'past' | 'current' | 'upcoming';
  description: string;
  gallery: GalleryImage[];
  pressRelease?: string;
  pressLinks: PressLink[];
  order: number;
  residencyPeriod: string;
}

export interface SiteSettings {
  title: string;
  heroImage: string;
  contactText: string;
  contactDetails: {
    email: string;
    phone?: string;
    address?: string;
    website?: string;
  };
}

// Mock data for development
export const mockSiteSettings: SiteSettings = {
  title: "Ronadale",
  heroImage: "/hero.jpg",
  contactText: "44 Ronadale road, Craryville NY. Open by Appointment",
  contactDetails: {
    email: "info@ranadale.com",
    address: "44 Ronadale road\nCraryville New York\n12521"
  }
};

export const mockProjects: Project[] = [
  // Past Projects
  {
    id: "1",
    title: "Echoes of the Valley",
    slug: "echoes-of-the-valley",
    artist: { id: "artist1", name: "Sarah Martinez", slug: "sarah-martinez" },
    status: "past",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img1", image: "/mockup/1.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img2", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img3", image: "/mockup/3.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img4", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img5", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img1b", image: "/mockup/1.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img2b", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img3b", image: "/mockup/3.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img4b", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img5b", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img1c", image: "/mockup/1.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img2c", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img3c", image: "/mockup/3.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img4c", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img5c", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img1d", image: "/mockup/1.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img2d", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img3d", image: "/mockup/3.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img4d", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img5d", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressRelease: "/press/echoes-press-release.pdf",
    pressLinks: [
      { id: "press1", title: "– ArtForum Review", url: "https://artforum.com/echoes-valley" },
      { id: "press2", title: "– Mountain Arts Magazine", url: "https://mountainarts.com/sarah-martinez" }
    ],
    order: 1,
    residencyPeriod: "15 Jan – 15 Mar 2024"
  },
  {
    id: "2",
    title: "Digital Landscapes",
    slug: "digital-landscapes",
    artist: { id: "artist2", name: "James Chen", slug: "james-chen" },
    status: "past",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img4", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img5", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressRelease: "/press/digital-landscapes-press-release.pdf",
    pressLinks: [
      { id: "press3", title: "– Digital Arts Quarterly", url: "https://digitalarts.com/james-chen" }
    ],
    order: 2,
    residencyPeriod: "20 Mar – 20 May 2024"
  },
  // Current Projects
  {
    id: "3",
    title: "Mycelial Networks",
    slug: "mycelial-networks",
    artist: { id: "artist3", name: "Sarah Bridge", slug: "sarah-bridge" },
    status: "current",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img6", image: "/mockup/3.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img7", image: "/mockup/1.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressLinks: [
      { id: "press4", title: "– Scientific American", url: "https://scientificamerican.com/mycelial-art" }
    ],
    order: 1,
    residencyPeriod: "10 Oct – 20 Dec 2024"
  },
  {
    id: "4",
    title: "Memory Stones",
    slug: "memory-stones",
    artist: { id: "artist4", name: "Kenji Nakamura", slug: "kenji-nakamura" },
    status: "past",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img8", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" },
      { id: "img9", image: "/mockup/5.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressLinks: [],
    order: 3,
    residencyPeriod: "15 Nov 2024 – 15 Jan 2025"
  },
  // Upcoming Projects
  {
    id: "5",
    title: "Wind Patterns",
    slug: "wind-patterns",
    artist: { id: "artist5", name: "Maria Santos", slug: "maria-santos" },
    status: "upcoming",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img10", image: "/mockup/4.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressLinks: [],
    order: 1,
    residencyPeriod: "1 Feb – 1 Apr 2025"
  },
  {
    id: "6",
    title: "Urban Archaeology",
    slug: "urban-archaeology",
    artist: { id: "artist6", name: "Robert Kim", slug: "robert-kim" },
    status: "past",
    description: "Sanya Kantarovsky works across the fields of film, sculpture, drawing, printmaking and curating, with painting at the centre of his practice. His approach to painting is iterative and intuitive, working through successive versions of a motif, with a layered process of addition and erasure. In painting especially, Kantarovsky's surfaces can take on various forms, ranging from evaporated pools of solvent and paint to thick impasto or chalky flatness, reminiscent of fresco or clay. These mediated processes serve to widen the gap between the hand and the surface, obscuring technique.",
    gallery: [
      { id: "img11", image: "/mockup/2.jpg", caption: "I am a Body Shop, 2023. Oil on canvas, 221 x 170.2 cm, 87 x 67 in" }
    ],
    pressLinks: [],
    order: 4,
    residencyPeriod: "15 Apr – 15 Jun 2025"
  }
];

// Helper functions
export const getProjectsByStatus = (status: 'past' | 'current' | 'upcoming'): Project[] => {
  return mockProjects
    .filter(project => project.status === status)
    .sort((a, b) => a.order - b.order);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return mockProjects.find(project => project.slug === slug);
};
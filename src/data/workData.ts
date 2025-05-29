export interface WorkItem {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  technologies: string[];
  projectUrl?: string; // Optional external link to live project
  codeUrl?: string;    // Optional link to GitHub/code repository
  featured?: boolean;  // Optional flag for featured projects
  date?: string;       // Optional date or timeframe
  role?: string;       // Optional role in the project
  company?: string;    // New field for company/organization
  specialTags?: string[]; // New field for special awards/tags
}

const workData: WorkItem[] = [
  {
    id: "project-1",
    title: "Speech Intent Recognition",
    description: "Engineered an advanced voice-driven diagnostic assistant that leverages state-of-the-art audio analysis and natural language processing to seamlessly transcribe patient voice notes and elegantly extract self-reported medical conditions.",
    imageSrc: "/riskcovry_hackathon.jpeg", // Place images in the public folder
    imageAlt: "Riskcovry Hackathon",
    technologies: ["Python"],
    codeUrl: "https://github.com/badrinadhgupta/riskcovry",
    featured: false,
    role: "Lead Developer",
    company: "Riskcovry",
    specialTags: ["Ode-to-Code Hackathon Winner"]
  },
  {
    id: "project-2",
    title: "Infrastructure Monitoring System",
    description: "Developed a real-time monitoring platform that continuously tracks the health of all services, instantly detecting issues and delivering automated, actionable alerts. This system ensures rapid incident response and maximizes service reliability.",
    technologies: ["Elasticsearch", "Kibana", "perl", "python"],
    role: "Lead Developer",
    company: "NVIDIA",
    specialTags: ["Internal Tool"]
  },
  {
    id: "project-3",
    title: "Workflow Automation System",
    description: "Built a workflow system for the ASIC Physical Design team that automates request routing, approval handling, and script execution for tasks like prioritization and branching, streamlining complex engineering processes.",
    technologies: ["Python", "Elasticsearch"],
    company: "NVIDIA",
    role: "Lead Developer",
    specialTags: ["Internal Tool"]
  },
  {
    id: "project-4",
    title: "Bit Rate Processing in 5G",
    description: "Simulated the flow of bits in 5G NR as per 3GPP standards, with a primary focus on LDPC encoding. Developed robust modules for both LDPC encoding and decoding, ensuring accurate bitstream processing.",
    technologies: ["Python", "MATLAB"],
    role: "Team Lead, Module Developer",
    company: "Academic Capstone",
    specialTags: ["Capstone Project"]
  },
  {
    id: "project-5",
    title: "Atlas",
    description: "Atlas is a sophisticated platform that seamlessly aggregates and analyzes data from every stage of a chip's lifecycle, transforming complex verification results into clear, actionable insights. Designed for engineering leaders, it delivers a real-time, holistic view of project health—surfacing critical trends, bottlenecks, and progress through elegant, intuitive dashboards—empowering confident, data-driven decision making in even the most complex environments.",
    technologies: ["Python", "NextJS", "TailwindCSS", "ElasticSearch", "perl"],
    role: "Lead Developer",
    company: "NVIDIA",
    specialTags: ["Internal Tool"]
  }
];

export default workData; 
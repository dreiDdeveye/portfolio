import gymQrAnalyticsImage from '../assets/gym-qr-analytics.png';
import gymQrMembersImage from '../assets/gym-qr-members.png';
import gymQrScanLogsImage from '../assets/gym-qr-scan-logs.png';
import gymQrScannerImage from '../assets/gym-qr-scanner.png';
import undergradsActionsMenuImage from '../assets/undergrads-actions-menu.png';
import undergradsAddOrderImage from '../assets/undergrads-add-order.png';
import undergradsCustomerDetailsImage from '../assets/undergrads-customer-details.png';
import undergradsDashboardImage from '../assets/undergrads-dashboard.png';

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'hardware' | 'network' | 'software' | 'design';
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface EducationEntry {
  level: string;
  school: string;
  period: string;
  details?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'design' | 'it' | 'both';
  subtitle: string;
  description: string;
  resumeBullets?: string[];
  tools: string[];
  image: string;
  proofImages?: string[];
  features: string[];
  solution: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    linkedinDisplay: string;
    about: string;
    highlights: string[];
  };
  education: {
    degree: string;
    school: string;
    graduated: string;
    relevantCoursework: string[];
    entries: EducationEntry[];
  };
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Paul Andrei Vicente',
    title: 'BSIT Graduate | IT Support & Graphic Design',
    tagline: 'Bridging reliable systems support with clear, practical visual communication.',
    location: 'Tuburan, Ligao City, Albay',
    email: 'vicentepaulandrei1823@gmail.com',
    phone: '+63 992 319 3769',
    linkedin: 'https://www.linkedin.com/in/paul-andrei-vicente-a7341740a',
    linkedinDisplay: 'linkedin.com/in/paul-andrei-vicente-a7341740a',
    about:
      'Detail-oriented BSIT graduate with hands-on experience in hardware and software troubleshooting, basic networking, and technical support through internship experience at TESDA. Skilled in Microsoft Office, Canva, Adobe tools, and end-user support with strong problem-solving skills and an AI enthusiast mindset.',
    highlights: [
      'Hardware & Software Troubleshooting',
      'LAN Setup & IP Addressing',
      'Typography, Layout, and Visual Hierarchy',
      'End-User Technical Support',
    ],
  },
  education: {
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    school: 'Infotech Development System Colleges (IDSC)',
    graduated: 'May 8, 2026',
    relevantCoursework: [
      'Computer Systems Architecture',
      'Data Communications & Networking',
      'Human-Computer Interaction',
      'Multimedia & Graphics Systems',
      'Systems Administration & Maintenance',
    ],
    entries: [
      {
        level: 'Bachelor of Science in Information Technology (BSIT)',
        school: 'Infotech Development System Colleges (IDSC)',
        period: 'Graduated: May 8, 2026',
      },
      {
        level: 'Secondary',
        school: 'Mayon Institute of Science and Technology',
        period: '2017 - 2021',
        details: ['General Academic Strand (GAS)'],
      },
      {
        level: 'Elementary',
        school: 'Ligao East Central School',
        period: '2011 - 2018',
      },
    ] as EducationEntry[],
  },
  experience: [
    {
      role: 'IT Intern',
      company: 'Technical Education and Skills Development Authority (TESDA)',
      location: 'Rawis, Legazpi City',
      period: 'Feb 12 - Apr 30, 2025',
      achievements: [
        'Diagnosed and resolved computer hardware and software issues, minimizing office downtime and maintaining operational efficiency.',
        'Supported routine system maintenance and diagnostics to sustain reliable performance of office workstations.',
        'Set up and maintained basic network connections, applying LAN fundamentals in a live professional environment.',
        'Provided prompt, courteous technical assistance to staff, resolving IT concerns and supporting day-to-day end-user needs.',
        'Gained real-world exposure to workplace IT systems, professional standards, and government office operations.',
      ],
      skillsUsed: ['Hardware Troubleshooting', 'LAN Setup', 'OS Configuration', 'End-User Support', 'System Diagnostics'],
    },
  ],
  skills: [
    { name: 'Hardware & Software Troubleshooting', level: 60, category: 'hardware', description: 'Diagnosing hardware faults, resolving software issues, and restoring workstation functionality.' },
    { name: 'System Maintenance & Diagnostics', level: 70, category: 'hardware', description: 'Preventive maintenance, cleanup, virus checks, and routine workstation diagnostics.' },
    { name: 'End-User Technical Support', level: 50, category: 'hardware', description: 'Patient user assistance, clear instructions, and day-to-day technical troubleshooting.' },

    { name: 'LAN Setup & IP Addressing Basics', level: 40, category: 'network', description: 'Basic LAN configuration, IP addressing, and connection setup for office environments.' },
    { name: 'Network Troubleshooting & Basic Configuration', level: 70, category: 'network', description: 'Resolving connectivity issues, checking routers/switches, and applying basic configuration fixes.' },

    { name: 'Microsoft Office', level: 85, category: 'software', description: 'Word documents, Excel worksheets, and PowerPoint presentations for office productivity.' },
    { name: 'Canva', level: 100, category: 'software', description: 'Quick layout creation, branded posters, and social media visuals.' },
    { name: 'Adobe Photoshop', level: 95, category: 'software', description: 'Image editing, composition, and visual asset preparation.' },
    { name: 'Adobe Illustrator', level: 60, category: 'software', description: 'Vector design, icons, logos, and scalable artwork.' },
    { name: 'Figma', level: 90, category: 'software', description: 'UI layouts, wireframes, and collaborative design workflows.' },

    { name: 'Social Media Poster Design', level: 90, category: 'design', description: 'Creating attention-grabbing promotional graphics for digital platforms.' },
    { name: 'Typography, Color Theory & Visual Hierarchy', level: 80, category: 'design', description: 'Applying type, color, spacing, and layout to guide reader attention effectively.' },
  ] as Skill[],
  projects: [
    {
      id: 'project-1',
      title: 'BaCasFitness Gym Access',
      category: 'it',
      subtitle: 'QR-based Attendance Tracking',
      description: 'Built a QR-based attendance system for gym member check-ins and hours tracking using AI-powered development tools.',
      resumeBullets: [
        'Built a QR-based attendance system for gym member check-ins and hours tracking using AI-powered development tools.',
      ],
      tools: ['QR Code', 'Attendance Tracking', 'AI Development Tools'],
      image: gymQrScannerImage,
      proofImages: [gymQrScannerImage, gymQrMembersImage, gymQrScanLogsImage, gymQrAnalyticsImage],
      features: [
        'Fast member check-in flow using QR scanning',
        'Simple hour tracking for attendance monitoring',
        'Clean interface for quick gym front-desk use',
      ],
      solution: 'Improved attendance recording speed and reduced manual logging errors with a streamlined check-in process.',
    },
    {
      id: 'project-2',
      title: 'The Undergrads Ordering System',
      category: 'it',
      subtitle: 'Ordering and Inventory Management',
      description: 'Built an ordering and inventory management system using AI-powered development tools.',
      resumeBullets: [
        'Built an ordering and inventory management system using AI-powered development tools.',
        'Implemented order-processing, inventory tracking, and user-friendly interfaces.',
      ],
      tools: ['Ordering System', 'Inventory Tracking', 'AI Development Tools'],
      image: undergradsDashboardImage,
      proofImages: [
        undergradsDashboardImage,
        undergradsCustomerDetailsImage,
        undergradsAddOrderImage,
        undergradsActionsMenuImage,
      ],
      features: [
        'User-friendly ordering flow for customers and staff',
        'Inventory tracking to support stock visibility',
        'Organized processing for smoother daily operations',
      ],
      solution: 'Made order handling and inventory monitoring more efficient through a simple, practical workflow.',
    },
  ] as Project[],
};

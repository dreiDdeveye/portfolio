import workstationImage from '../assets/image-pri3DOVpzgeVvruiQZLb6NooNGyxyV.png';

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

export interface Project {
  id: string;
  title: string;
  category: 'design' | 'it' | 'both';
  subtitle: string;
  description: string;
  tools: string[];
  image: string; // optional project reference image
  features: string[];
  solution: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Paul Andrei Vicente",
    title: "Entry-level IT Support & Graphic Designer",
    tagline: "Bridging reliable systems infrastructure with high-impact visual communications.",
    location: "Tuburan, Ligao City, Albay",
    email: "paulandreivicente0426@gmail.com",
    phone: "+63 992 319 3769",
    linkedin: "https://www.linkedin.com/in/paul-andrei-vicente-a7341740a",
    linkedinDisplay: "linkedin.com/in/paul-andrei-vicente-a7341740a",
    about: "Detail-oriented BSIT graduate with hands-on experience in hardware and software troubleshooting, basic networking, and technical support through internship experience at TESDA. Skilled in Microsoft Office, Canva, Adobe tools, and end-user support with strong problem-solving and communication skills.",
    highlights: [
      "Hardware & Software Diagnostics",
      "Local Area Network (LAN) Setup",
      "Creative Typography & Visual Layouts",
      "End-User Experience Optimization"
    ]
  },
  education: {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    school: "Infotech Development System Colleges (IDSC)",
    graduated: "May 8, 2026",
    relevantCoursework: [
      "Computer Systems Architecture",
      "Data Communications & Networking",
      "Human-Computer Interaction",
      "Multimedia & Graphics Systems",
      "Systems Administration & Maintenance"
    ]
  },
  experience: [
    {
      role: "IT Intern",
      company: "Technical Education and Skills Development Authority (TESDA)",
      location: "Rawis, Legazpi City",
      period: "Feb 12 - Apr 30, 2025",
      achievements: [
        "Diagnosed and resolved computer hardware and software issues, minimizing office downtime and maintaining operational efficiency.",
        "Supported routine system maintenance and diagnostics to sustain reliable performance of office workstations.",
        "Set up and maintained basic network connections, applying LAN fundamentals in a live professional environment.",
        "Provided prompt, courteous technical assistance to staff, resolving IT concerns and supporting day-to-day end-user needs.",
        "Gained real-world exposure to workplace IT systems, professional standards, and government office operations."
      ],
      skillsUsed: ["Hardware Troubleshooting", "LAN Setup", "OS Configuration", "End-User Support", "System Diagnostics"]
    }
  ],
  skills: [
    // Hardware & Software Support
    { name: "Hardware Troubleshooting", level: 90, category: "hardware", description: "System disassembly, component testing, RAM/Storage upgrades, and power diagnostics." },
    { name: "Software Fault Isolation", level: 88, category: "hardware", description: "OS registry fixes, driver optimization, software conflict resolution, and boot repairs." },
    { name: "System Maintenance & Diagnostics", level: 92, category: "hardware", description: "Preventative hardware cleaning, thermal management, virus removal, and system benchmarks." },
    { name: "End-User Technical Support", level: 95, category: "hardware", description: "Clear, patient troubleshooting support, step-by-step guidance, and effective ticket resolution." },
    
    // Networking Fundamentals
    { name: "LAN Setup & Cabling", level: 85, category: "network", description: "Ethernet cable termination (Cat5e/Cat6), switch connection setups, and physical layer integrity." },
    { name: "Network Troubleshooting", level: 86, category: "network", description: "IP addressing, DNS configuration, router settings, and resolving packet loss or intermittent access." },
    { name: "Basic Resource Sharing", level: 88, category: "network", description: "Configuring shared network folders, network printers, and localized workspace access permissions." },

    // Tools & Software
    { name: "Figma", level: 88, category: "software", description: "High-fidelity wireframes, UI layouts, prototyping, and design system asset organization." },
    { name: "Adobe Photoshop", level: 85, category: "software", description: "Advanced image manipulation, composite creations, masking, color grading, and asset preparation." },
    { name: "Adobe Illustrator", level: 82, category: "software", description: "Vector logos, high-resolution icons, typography treatments, and scalable digital assets." },
    { name: "Canva Pro", level: 95, category: "software", description: "Rapid content generation, branded presentation templates, and optimized social media visuals." },
    { name: "Microsoft Office Suite", level: 92, category: "software", description: "Advanced Excel macros, Word technical documentation, and polished PowerPoint slide engineering." },

    // Graphic Design
    { name: "Visual Hierarchy", level: 90, category: "design", description: "Strategic arrangement of elements to guide reader attention and optimize information retention." },
    { name: "Typography & Layouts", level: 88, category: "design", description: "Font pairing selection, kerning adjustments, and grid-based poster and print alignments." },
    { name: "Color Theory Application", level: 87, category: "design", description: "Evocative palette selection reflecting brand traits, ensuring accessible WCAG color contrast standards." }
  ] as Skill[],

  projects: [
    {
      id: "project-1",
      title: "TESDA Skills Advancement Campaign",
      category: "design",
      subtitle: "Social Media Information Design & Digital Layout",
      description: "A comprehensive digital layout pack designed to boost awareness for vocational technology certifications and community outreach programs.",
      tools: ["Canva", "Adobe Photoshop", "Visual Hierarchy", "Typography"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      features: [
        "Optimized 1:1 and 9:16 vertical layouts for multi-platform delivery",
        "Strategic usage of highly visible contrast overlays to guarantee readability on mobile devices",
        "Consistent integration of official branding frameworks and authoritative typographic scales"
      ],
      solution: "Created an engaging, accessible visual hierarchy that broke down complex certification prerequisites into digestible step-by-step graphical modules."
    },
    {
      id: "project-2",
      title: "Government Office LAN Setup Blueprint",
      category: "it",
      subtitle: "Physical Network Mapping & Workstation Optimization",
      description: "A schematic outline and execution standard for stabilizing local area network connections across highly utilized office workstations.",
      tools: ["LAN Setup", "Hardware Diagnostics", "Network Configuration", "Microsoft Visio"],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      features: [
        "Structured path layout minimizing electromagnetic interference and physical tripping hazards",
        "Static IP distribution matrix to prevent IP conflicts among network shared print nodes",
        "Optimized router and switch placement mapped directly to maximum user density zones"
      ],
      solution: "Implemented systematic diagnostic routines to instantly isolate faulty cable segments and misconfigured switchports, dropping network latency and connectivity complaints."
    },
    {
      id: "project-3",
      title: "Tech-Forward Brand Suite & Social Layouts",
      category: "design",
      subtitle: "Vector Typography & Identity Engineering",
      description: "A sleek, minimalist brand portfolio identity kit utilizing bold typography and measured color accents for emerging digital enterprises.",
      tools: ["Adobe Illustrator", "Figma", "Color Theory", "Grid Systems"],
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
      features: [
        "Fully vector design ensuring pixel-perfect scaling from tiny app icons to large format print materials",
        "Meticulous custom typography choices enforcing premium professional presence",
        "Built-in design documentation for hand-off to client stakeholders"
      ],
      solution: "Demonstrates strong understanding of negative space and crisp edge alignments to project absolute technical competence and modern aesthetic appeal."
    },
    {
      id: "project-4",
      title: "Workstation Preventive Maintenance Protocol",
      category: "it",
      subtitle: "Hardware Longevity & System De-escalation Strategy",
      description: "An operational manual and diagnostic flowchart designed for internal support staff to handle standard computing bottlenecks prior to hardware replacement.",
      tools: ["System Maintenance", "Software Fault Isolation", "Technical Support", "Microsoft Office"],
      image: workstationImage,
      features: [
        "Step-by-step hardware debugging sequence (POST analysis, RAM seating, thermal throttling check)",
        "Software environment optimization script guidelines (temp file sweeps, startup audits)",
        "Clear documentation templates for efficient shift handovers and transparent IT asset logging"
      ],
      solution: "Ensures minimal idle times by providing straightforward, logical paths for diagnosing workstation failures, reducing unnecessary external technical support overhead."
    }
  ] as Project[]
};

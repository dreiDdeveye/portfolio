import gymQrAnalyticsImage from '../assets/gym-qr-analytics.png';
import gymQrMembersImage from '../assets/gym-qr-members.png';
import gymQrScanLogsImage from '../assets/gym-qr-scan-logs.png';
import gymQrScannerImage from '../assets/gym-qr-scanner.png';
import fallbackProfileImage from '../assets/profile-photo.jpg';
import undergradsActionsMenuImage from '../assets/undergrads-actions-menu.png';
import undergradsAddOrderImage from '../assets/undergrads-add-order.png';
import undergradsCustomerDetailsImage from '../assets/undergrads-customer-details.png';
import undergradsDashboardImage from '../assets/undergrads-dashboard.png';

export const RESUME_ENDPOINT = 'https://resume-psi-three-53.vercel.app/resume.json';

export type SkillCategory = 'hardware' | 'network' | 'software' | 'design';

export interface ResumeJson {
  personalInfo?: {
    name?: string;
    headline?: string;
    photo?: {
      src?: string;
      alt?: string;
    };
    location?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: SocialLink[];
  professionalSummary?: string;
  workExperience?: ResumeWorkExperience[];
  skills?: {
    technical?: ResumeSkillGroup[];
    soft?: string[];
  };
  projects?: ResumeProject[];
  education?: ResumeEducation[];
  certifications?: ResumeCertification[];
}

export interface SocialLink {
  label?: string;
  url?: string;
  type?: string;
}

interface ResumeWorkExperience {
  sectionLabel?: string;
  role?: string;
  organization?: string;
  location?: string;
  date?: string;
  highlights?: string[];
}

interface ResumeSkillGroup {
  title?: string;
  items?: string[];
  display?: 'inline' | string;
}

interface ResumeProject {
  name?: string;
  highlights?: string[];
}

interface ResumeEducation {
  degree?: string;
  school?: string;
  strand?: string;
  date?: string;
}

interface ResumeCertification {
  name?: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
  highlights?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  description: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
  display?: 'inline' | string;
  category: SkillCategory;
}

export interface Experience {
  sectionLabel: string;
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
  details: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'design' | 'it' | 'both';
  subtitle: string;
  description: string;
  resumeBullets: string[];
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
    initials: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    about: string;
    photo: {
      src: string;
      alt: string;
    };
  };
  socialLinks: {
    label: string;
    url: string;
    type: string;
  }[];
  education: {
    degree: string;
    school: string;
    graduated: string;
    entries: EducationEntry[];
  };
  certifications: Certification[];
  experience: Experience[];
  skillGroups: SkillGroup[];
  skills: Skill[];
  projects: Project[];
}

const projectVisuals = [
  {
    image: gymQrScannerImage,
    proofImages: [gymQrScannerImage, gymQrMembersImage, gymQrScanLogsImage, gymQrAnalyticsImage],
  },
  {
    image: undergradsDashboardImage,
    proofImages: [
      undergradsDashboardImage,
      undergradsCustomerDetailsImage,
      undergradsAddOrderImage,
      undergradsActionsMenuImage,
    ],
  },
];

const categoryLevel: Record<SkillCategory, number> = {
  hardware: 65,
  network: 60,
  software: 85,
  design: 85,
};

export async function fetchPortfolioData(endpoint = RESUME_ENDPOINT): Promise<PortfolioData> {
  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error(`Resume request failed with status ${response.status}`);
  }

  const resume = (await response.json()) as ResumeJson;
  return normalizeResumeData(resume, endpoint);
}

export function normalizeResumeData(resume: ResumeJson, endpoint = RESUME_ENDPOINT): PortfolioData {
  const name = cleanText(resume.personalInfo?.name, 'Portfolio Owner');
  const title = cleanText(resume.personalInfo?.headline, 'Professional Portfolio');
  const socialLinks = normalizeSocialLinks(resume.socialLinks);
  const educationEntries = normalizeEducation(resume.education);
  const skillGroups = normalizeSkillGroups(resume.skills?.technical);
  const skills = flattenSkills(skillGroups);
  const experience = normalizeExperience(resume.workExperience, skills);
  const projects = normalizeProjects(resume.projects);
  const portfolioLink = socialLinks.find((link) => link.type.toLowerCase() === 'portfolio');

  return {
    personal: {
      name,
      title,
      initials: getInitials(name),
      tagline: title,
      location: cleanText(resume.personalInfo?.location ?? resume.contact?.address),
      email: cleanText(resume.contact?.email),
      phone: cleanText(resume.contact?.phone),
      about: cleanText(resume.professionalSummary),
      photo: {
        src: resolveAssetUrl(resume.personalInfo?.photo?.src, endpoint) ?? fallbackProfileImage,
        alt: cleanText(resume.personalInfo?.photo?.alt, `${name} portrait`),
      },
    },
    socialLinks,
    education: {
      degree: educationEntries[0]?.level ?? '',
      school: educationEntries[0]?.school ?? '',
      graduated: educationEntries[0]?.period ?? '',
      entries: educationEntries,
    },
    certifications: normalizeCertifications(resume.certifications),
    experience,
    skillGroups,
    skills,
    projects: projects.length > 0 ? projects : normalizeProjects([{ name: portfolioLink?.label, highlights: [] }]),
  };
}

function normalizeSocialLinks(links: SocialLink[] = []) {
  return links
    .map((link) => ({
      label: cleanText(link.label ?? link.url),
      url: cleanText(link.url),
      type: cleanText(link.type, 'Link'),
    }))
    .filter((link) => link.label && link.url);
}

function normalizeEducation(entries: ResumeEducation[] = []): EducationEntry[] {
  return entries
    .map((entry) => ({
      level: cleanText(entry.degree),
      school: cleanText(entry.school),
      period: cleanText(entry.date),
      details: [entry.strand].map((item) => cleanText(item)).filter(Boolean),
    }))
    .filter((entry) => entry.level || entry.school || entry.period);
}

function normalizeCertifications(entries: ResumeCertification[] = []): Certification[] {
  return entries
    .map((entry) => ({
      name: cleanText(entry.name),
      issuer: cleanText(entry.issuer),
      date: cleanText(entry.date),
      credentialUrl: cleanText(entry.credentialUrl),
      highlights: normalizeStringList(entry.highlights),
    }))
    .filter((entry) => entry.name || entry.issuer);
}

function normalizeExperience(entries: ResumeWorkExperience[] = [], skills: Skill[]): Experience[] {
  const skillNames = skills.map((skill) => skill.name).slice(0, 5);

  return entries
    .map((entry) => ({
      sectionLabel: cleanText(entry.sectionLabel, 'Experience'),
      role: cleanText(entry.role),
      company: cleanText(entry.organization),
      location: cleanText(entry.location),
      period: cleanText(entry.date),
      achievements: normalizeStringList(entry.highlights),
      skillsUsed: skillNames,
    }))
    .filter((entry) => entry.role || entry.company || entry.achievements.length > 0);
}

function normalizeSkillGroups(groups: ResumeSkillGroup[] = []): SkillGroup[] {
  return groups
    .map((group) => {
      const title = cleanText(group.title);
      return {
        title,
        items: normalizeStringList(group.items),
        display: group.display,
        category: getSkillCategory(title),
      };
    })
    .filter((group) => group.title || group.items.length > 0);
}

function flattenSkills(groups: SkillGroup[]): Skill[] {
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      name: item,
      level: categoryLevel[group.category],
      category: group.category,
      description: group.title,
    })),
  );
}

function normalizeProjects(entries: ResumeProject[] = []): Project[] {
  return entries
    .map((entry, index) => {
      const title = cleanText(entry.name, `Project ${index + 1}`);
      const bullets = normalizeStringList(entry.highlights);
      const visuals = projectVisuals[index % projectVisuals.length];

      return {
        id: `project-${index + 1}`,
        title,
        category: 'it' as const,
        subtitle: bullets[0] ? getProjectSubtitle(bullets[0]) : 'Portfolio project',
        description: bullets[0] ?? title,
        resumeBullets: bullets.length > 0 ? bullets : [title],
        tools: getProjectTools(title, bullets),
        image: visuals.image,
        proofImages: visuals.proofImages,
        features: bullets,
        solution: bullets[1] ?? bullets[0] ?? title,
      };
    })
    .filter((project) => project.title);
}

function getSkillCategory(title: string): SkillCategory {
  const normalized = title.toLowerCase();

  if (normalized.includes('network')) return 'network';
  if (normalized.includes('design') || normalized.includes('graphic')) return 'design';
  if (normalized.includes('tool') || normalized.includes('software')) return 'software';
  return 'hardware';
}

function getProjectSubtitle(text: string) {
  const firstSentence = text.split(/[.!?]/)[0]?.trim();
  return firstSentence || 'Portfolio project';
}

function getProjectTools(title: string, bullets: string[]) {
  const source = `${title} ${bullets.join(' ')}`.toLowerCase();
  const tools = new Set<string>();

  if (source.includes('qr')) tools.add('QR Code');
  if (source.includes('attendance')) tools.add('Attendance Tracking');
  if (source.includes('ordering')) tools.add('Ordering System');
  if (source.includes('inventory')) tools.add('Inventory Tracking');
  if (source.includes('ai')) tools.add('AI Development Tools');

  return tools.size > 0 ? Array.from(tools) : ['Project Delivery'];
}

function resolveAssetUrl(src: string | undefined, endpoint: string) {
  const value = cleanText(src);

  if (!value) return undefined;

  try {
    return new URL(value, endpoint).toString();
  } catch {
    return value;
  }
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function normalizeStringList(items: string[] = []) {
  return items.map((item) => cleanText(item)).filter(Boolean);
}

function cleanText(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

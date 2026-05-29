import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  FileText,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import portraitImage from './assets/profile-photo.jpg';

type SkillFilter = 'all' | 'hardware' | 'network' | 'software' | 'design';
type IconType = typeof Mail;

const filters: { id: SkillFilter; label: string }[] = [
  { id: 'all', label: 'All skills' },
  { id: 'hardware', label: 'IT support' },
  { id: 'network', label: 'Networking' },
  { id: 'software', label: 'Software' },
  { id: 'design', label: 'Design' },
];

const quickStrengths = [
  { icon: Wrench, title: 'Hardware and software support', text: 'Diagnostics, maintenance, OS setup, driver issues, and clear user guidance.' },
  { icon: Network, title: 'Basic network support', text: 'LAN setup, cabling checks, shared resources, and connectivity troubleshooting.' },
  { icon: Sparkles, title: 'Graphic design support', text: 'Readable layouts, social materials, presentations, and branded visual assets.' },
];

const getGmailComposeUrl = (email: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export default function App() {
  const { personal, education, experience, skills, projects } = PORTFOLIO_DATA;
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const filteredSkills = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesFilter = activeFilter === 'all' || skill.category === activeFilter;
      const matchesQuery =
        query.length === 0 ||
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, searchTerm, skills]);

  const handleCopy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleDownloadResume = () => {
    document.body.classList.add('printing-resume');
    window.setTimeout(() => window.print(), 50);
  };

  useEffect(() => {
    const cleanupPrintMode = () => document.body.classList.remove('printing-resume');

    window.addEventListener('afterprint', cleanupPrintMode);
    return () => window.removeEventListener('afterprint', cleanupPrintMode);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm text-white">PV</span>
            <span className="hidden sm:inline">{personal.name}</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#experience" className="hover:text-slate-950">Experience</a>
            <a href="#work" className="hover:text-slate-950">Work</a>
            <a href="#resume" className="hover:text-slate-950">Resume</a>
            <a href="#skills" className="hover:text-slate-950">Skills</a>
            <a href="#contact" className="hover:text-slate-950">Contact</a>
          </div>
          <a
            href={getGmailComposeUrl(personal.email)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_360px] lg:py-20">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                Available for junior IT support and graphic design roles
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                {personal.name}
              </h1>
              <p className="mt-4 text-xl font-semibold text-slate-700">{personal.title}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{personal.about}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getGmailComposeUrl(personal.email)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Mail className="h-4 w-4" />
                  Contact Paul
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  View portfolio
                </a>
                <a
                  href="#resume"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
                >
                  <FileDown className="h-4 w-4" />
                  View resume
                </a>
              </div>
            </div>

            <aside className="rounded-lg border border-slate-200 bg-[#f7f8fb] p-5">
              <div className="flex justify-center rounded-md bg-white p-4">
                <img
                  src={portraitImage}
                  alt={`${personal.name} portrait`}
                  className="h-56 w-44 rounded-md border border-slate-200 object-cover object-top shadow-sm"
                />
              </div>
              <div className="mt-5 space-y-4">
                <InfoLine icon={MapPin} label="Location" value={personal.location} />
                <InfoLine icon={GraduationCap} label="Education" value={`BSIT, graduated ${education.graduated}`} />
                <InfoLine icon={Laptop} label="Focus" value="IT Support, LAN basics, visual design" />
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-[#f7f8fb] py-12">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-3">
            {quickStrengths.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="experience" className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Experience" title="Practical support experience in a professional office." />
            <div className="mt-8 space-y-6">
              {experience.map((role) => (
                <article key={`${role.company}-${role.role}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                    <div>
                      <p className="text-sm font-semibold uppercase text-emerald-700">{role.period}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">{role.role}</h3>
                      <p className="mt-2 font-medium text-slate-700">{role.company}</p>
                      <p className="mt-4 flex gap-2 text-sm text-slate-500">
                        <MapPin className="mt-0.5 h-4 w-4 flex-none" />
                        {role.location}
                      </p>
                    </div>
                    <div>
                      <ul className="grid gap-3 md:grid-cols-2">
                        {role.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-3 text-sm leading-7 text-slate-600">
                            <Check className="mt-1.5 h-4 w-4 flex-none text-emerald-600" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {role.skillsUsed.map((skill) => (
                          <span key={skill} className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-b border-slate-200 bg-[#f7f8fb] py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Selected Work"
              title="Projects that show both technical and visual communication ability."
              description="Each item is written for quick employer review: what it is, what tools were used, and what problem it solves."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {projects.map((project) => (
                <article key={project.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <img src={project.image} alt="" className="h-52 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase text-emerald-700">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950">{project.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{project.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                    <p className="mt-4 border-l-2 border-emerald-500 pl-4 text-sm leading-7 text-slate-700">{project.solution}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span key={tool} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Resume"
                title="Resume preview for quick employer review."
              />
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4" />
                Open full resume
              </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
              <div className="resume-preview-frame flex justify-center overflow-hidden bg-slate-200 px-4 py-8">
                <ResumeDocument />
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Skills"
              title="A scannable view of relevant abilities."
              description="Filter by area or search for a specific capability."
            />
            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                      activeFilter === filter.id
                        ? 'border-slate-950 bg-slate-950 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <label className="relative block w-full lg:w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search skills"
                  className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-100"
                />
              </label>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredSkills.map((skill) => (
                <article key={skill.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-950">{skill.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase text-emerald-700">{skill.category}</p>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{skill.level}%</span>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${skill.level}%` }} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{skill.description}</p>
                </article>
              ))}
              {filteredSkills.length === 0 ? <p className="py-8 text-sm text-slate-600">No matching skills found.</p> : null}
            </div>
          </div>
        </section>

        <section id="education" className="border-b border-slate-200 bg-[#f7f8fb] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading eyebrow="Education" title={education.degree} />
              <p className="mt-5 font-medium text-slate-700">{education.school}</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">Graduated {education.graduated}</p>
            </div>
            <div className="grid content-start gap-4 sm:grid-cols-2">
              {education.relevantCoursework.map((course) => (
                <div key={course} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <FileText className="mt-1 h-4 w-4 flex-none text-emerald-700" />
                  <p className="text-sm font-medium leading-7 text-slate-700">{course}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-950 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-300">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Ready to discuss an opportunity.</h2>
              <p className="mt-4 max-w-xl leading-8 text-slate-300">
                Reach out for junior IT support, technical assistance, LAN setup support, or graphic design tasks.
              </p>
              <a
                href={getGmailComposeUrl(personal.email)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                <Mail className="h-4 w-4" />
                Send email
              </a>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <ContactRow
                icon={Mail}
                label="Email"
                value={personal.email}
                href={getGmailComposeUrl(personal.email)}
                copied={copiedKey === 'email'}
                onCopy={() => handleCopy(personal.email, 'email')}
              />
              <ContactRow
                icon={Phone}
                label="Phone"
                value={personal.phone}
                href={`tel:${personal.phone}`}
                copied={copiedKey === 'phone'}
                onCopy={() => handleCopy(personal.phone, 'phone')}
              />
              <ContactRow
                icon={ExternalLink}
                label="LinkedIn"
                value={personal.linkedinDisplay}
                href={personal.linkedin}
                copied={copiedKey === 'linkedin'}
                onCopy={() => handleCopy(personal.linkedin, 'linkedin')}
              />
            </div>
          </div>
        </section>
      </main>

      {resumeOpen ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-slate-950/80 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Full resume preview">
          <div className="resume-modal-shell relative mx-auto flex w-fit flex-col items-end gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
              >
                <Download className="h-4 w-4" />
                Download resume
              </button>
              <button
                type="button"
                onClick={() => setResumeOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-lg transition hover:text-slate-950"
                aria-label="Close resume preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ResumeDocument />
          </div>
        </div>
      ) : null}
      <div className="print-only">
        <ResumeDocument printable />
      </div>
    </div>
  );
}

function ResumeDocument({ printable = false }: { printable?: boolean }) {
  const { personal, education, experience, skills } = PORTFOLIO_DATA;
  const supportSkills = skills.filter((skill) => skill.category === 'hardware').slice(0, 3);
  const networkSkills = skills.filter((skill) => skill.category === 'network').slice(0, 2);
  const designSkills = skills.filter((skill) => skill.category === 'design').slice(0, 2);
  const softwareSkills = skills.filter((skill) => skill.category === 'software').map((skill) => skill.name);

  return (
    <article id={printable ? 'print-resume' : undefined} className="a4-resume bg-white text-black shadow-xl">
      <header className="grid grid-cols-[1fr_1.25in] gap-8 border-b-2 border-black pb-4">
        <div>
          <h1 className="resume-name">{personal.name}</h1>
          <div className="mt-3 space-y-1 text-[10.5pt] leading-snug">
            <p>{personal.location}</p>
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
            <p>{personal.linkedinDisplay}</p>
          </div>
        </div>
        <img src={portraitImage} alt="" className="h-[1.35in] w-[1.25in] border border-slate-300 object-cover" />
      </header>

      <p className="mt-4 border-b border-slate-300 pb-4 text-[10.5pt] leading-relaxed">{personal.about}</p>

      <ResumeSection title="Internship Experience">
        {experience.map((role) => (
          <div key={`${role.company}-${role.role}`}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[11pt] font-bold">{role.role}</h3>
                <p className="text-[10.5pt]">{role.company}</p>
                <p className="text-[10pt]">{role.location}</p>
              </div>
              <p className="whitespace-nowrap text-[10pt]">{role.period}</p>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[10pt] leading-relaxed">
              {role.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Education">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-[11pt] font-bold">{education.degree}</h3>
            <p className="text-[10.5pt]">{education.school}</p>
          </div>
          <p className="whitespace-nowrap text-[10pt]">Graduated: {education.graduated}</p>
        </div>
      </ResumeSection>

      <ResumeSection title="Technical Skills">
        <SkillList title="Hardware & Software Support" items={supportSkills.map((skill) => skill.name)} />
        <SkillList title="Networking Fundamentals" items={networkSkills.map((skill) => skill.name)} />
        <div className="mt-3 text-[10pt]">
          <h3 className="font-bold">Tools & Software</h3>
          <p className="mt-1">{softwareSkills.join(' | ')}</p>
        </div>
        <SkillList title="Graphic Design" items={designSkills.map((skill) => skill.name)} />
      </ResumeSection>
    </article>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-black pb-1 text-[13pt] font-bold uppercase tracking-[0.16em]">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function SkillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-3 text-[10pt]">
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-1 list-disc space-y-1 pl-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}

function InfoLine({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-1 h-4 w-4 flex-none text-emerald-700" />
      <div>
        <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-medium leading-6 text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  copied,
  onCopy,
}: {
  icon: IconType;
  label: string;
  value: string;
  href: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <a href={href} target={label === 'LinkedIn' || label === 'Email' ? '_blank' : undefined} rel="noreferrer" className="flex min-w-0 gap-4 transition hover:text-emerald-300">
        <Icon className="mt-1 h-5 w-5 flex-none text-emerald-300" />
        <span className="min-w-0">
          <span className="block text-sm font-semibold uppercase text-slate-400">{label}</span>
          <span className="mt-1 block break-all text-sm font-medium text-white">{value}</span>
        </span>
      </a>

      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md border border-white/15 bg-white/5 text-slate-200 transition hover:border-emerald-300 hover:text-emerald-300"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

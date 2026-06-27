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
  Send,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { fetchPortfolioData, type PortfolioData, type SkillGroup } from './data/portfolioData';

type SkillFilter = 'all' | 'hardware' | 'network' | 'software' | 'design';
type IconType = typeof Mail;
type PortfolioLoadState = 'loading' | 'ready' | 'error';
const FACEBOOK_PROFILE_URL = 'https://web.facebook.com/pulyinus.dream';

const filters: { id: SkillFilter; label: string }[] = [
  { id: 'all', label: 'All skills' },
  { id: 'hardware', label: 'IT support' },
  { id: 'network', label: 'Networking' },
  { id: 'software', label: 'Software' },
  { id: 'design', label: 'Design' },
];

const getGmailComposeUrl = (email: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loadState, setLoadState] = useState<PortfolioLoadState>('loading');
  const [loadError, setLoadError] = useState('');
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const isLoading = loadState === 'loading';
  const hasLoadError = loadState === 'error';
  const personal = portfolioData?.personal;
  const education = portfolioData?.education;
  const experience = portfolioData?.experience ?? [];
  const skills = portfolioData?.skills ?? [];
  const skillGroups = portfolioData?.skillGroups ?? [];
  const projects = portfolioData?.projects ?? [];
  const certifications = portfolioData?.certifications ?? [];
  const socialLinks = portfolioData?.socialLinks ?? [];
  const portfolioLink = socialLinks.find((link) => link.type.toLowerCase() === 'portfolio');
  const linkedinLink = socialLinks.find((link) => link.type.toLowerCase() === 'linkedin');
  const firstName = personal?.name.split(/\s+/)[0] ?? 'me';

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

  const quickStrengths = useMemo(() => getQuickStrengths(skillGroups), [skillGroups]);

  useEffect(() => {
    let isMounted = true;

    async function loadResume() {
      setLoadState('loading');
      setLoadError('');

      try {
        const data = await fetchPortfolioData();

        if (isMounted) {
          setPortfolioData(data);
          setLoadState('ready');
        }
      } catch (error) {
        if (isMounted) {
          setLoadState('error');
          setLoadError(error instanceof Error ? error.message : 'Unable to load resume data.');
        }
      }
    }

    void loadResume();

    return () => {
      isMounted = false;
    };
  }, []);

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

  useEffect(() => {
    if (!portfolioData) return;

    document.title = `${portfolioData.personal.name} | ${portfolioData.personal.title}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', portfolioData.personal.about);
  }, [portfolioData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasLoadError || !portfolioData || !personal || !education) {
    return <ErrorScreen message={loadError} />;
  }

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
          <div className="flex items-center gap-2">
            <a
              href={FACEBOOK_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
            >
              <Send className="h-4 w-4" />
              Message
            </a>
            <a
              href={getGmailComposeUrl(personal.email)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
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
                  Contact {firstName}
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  View projects
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
                  src={personal.photo.src}
                  alt={personal.photo.alt}
                  className="h-56 w-44 rounded-md border border-slate-200 object-cover object-top shadow-sm"
                />
              </div>
              <div className="mt-5 space-y-4">
                <InfoLine icon={MapPin} label="Location" value={personal.location} />
                <InfoLine icon={GraduationCap} label="Education" value={[education.degree, education.graduated].filter(Boolean).join(', ')} />
                <InfoLine icon={Laptop} label="Focus" value={personal.title} />
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
                  <div className="flex h-52 items-center justify-center bg-slate-950">
                    <img src={project.image} alt={`${project.title} proof`} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase text-emerald-700">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950">{project.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{project.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                    {project.proofImages ? (
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {project.proofImages.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() => setPreviewImage({ src: image, alt: `${project.title} proof ${index + 1}` })}
                            className="group overflow-hidden rounded-md border border-slate-200 bg-slate-950 text-left transition hover:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                          >
                            <img
                              src={image}
                              alt={`${project.title} proof ${index + 1}`}
                              className="h-28 w-full object-cover object-left-top transition group-hover:scale-[1.03]"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}
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
                <ResumeDocument data={portfolioData} />
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
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Education" title="Academic background and milestones." />
            <div className="mt-8 grid gap-4">
              {education.entries.map((entry) => (
                <article key={`${entry.level}-${entry.school}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{entry.level}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-700">{entry.school}</p>
                      {entry.details ? <p className="mt-2 text-sm leading-7 text-slate-600">{entry.details.join(' • ')}</p> : null}
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold text-emerald-700">{entry.period}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow="Certifications" title="Credentials and professional learning." />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {certifications.length > 0 ? (
                certifications.map((certification) => (
                  <article key={`${certification.name}-${certification.issuer}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{certification.name}</h3>
                        {certification.issuer ? <p className="mt-1 text-sm font-medium text-slate-700">{certification.issuer}</p> : null}
                        {certification.highlights.length > 0 ? (
                          <ul className="mt-3 grid gap-2">
                            {certification.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3 text-sm leading-7 text-slate-600">
                                <Check className="mt-1.5 h-4 w-4 flex-none text-emerald-600" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-start gap-2 lg:items-end">
                        {certification.date ? <p className="whitespace-nowrap text-sm font-semibold text-emerald-700">{certification.date}</p> : null}
                        {certification.credentialUrl ? (
                          <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950">
                            <ExternalLink className="h-4 w-4" />
                            Credential
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
                  Certifications will appear here when they are added to the resume JSON.
                </p>
              )}
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
              {linkedinLink ? (
                <ContactRow
                  icon={ExternalLink}
                  label={linkedinLink.type}
                  value={linkedinLink.label}
                  href={linkedinLink.url}
                  copied={copiedKey === 'linkedin'}
                  onCopy={() => handleCopy(linkedinLink.url, 'linkedin')}
                />
              ) : null}
              {portfolioLink ? (
                <ContactRow
                  icon={ExternalLink}
                  label={portfolioLink.type}
                  value={portfolioLink.label}
                  href={portfolioLink.url}
                  copied={copiedKey === 'portfolio'}
                  onCopy={() => handleCopy(portfolioLink.url, 'portfolio')}
                />
              ) : null}
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
            <ResumeDocument data={portfolioData} />
          </div>
        </div>
      ) : null}
      {previewImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Project proof preview">
          <div className="flex max-h-full w-full max-w-6xl flex-col items-end gap-3">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-lg transition hover:text-slate-950"
              aria-label="Close project proof preview"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className="max-h-[85vh] w-full rounded-lg bg-slate-950 object-contain shadow-2xl"
            />
          </div>
        </div>
      ) : null}
      <div className="print-only">
        <ResumeDocument data={portfolioData} printable />
      </div>
    </div>
  );
}

function ResumeDocument({ data, printable = false }: { data: PortfolioData; printable?: boolean }) {
  const { personal, education, experience, skillGroups, projects, certifications, socialLinks } = data;

  return (
    <article id={printable ? 'print-resume' : undefined} className="a4-resume bg-white text-black shadow-xl">
      <header className="grid grid-cols-[1fr_1.25in] gap-8 border-b-2 border-black pb-3">
        <div>
          <h1 className="resume-name">{personal.name}</h1>
          <div className="mt-2 space-y-0.5 text-[10pt] leading-snug">
            <p>{personal.location}</p>
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
            {socialLinks.map((link) => (
              <p key={link.url}>
                <a href={link.url}>{link.label}</a>
              </p>
            ))}
          </div>
        </div>
        <img src={personal.photo.src} alt="" className="h-[1.35in] w-[1.25in] border border-slate-300 object-cover" />
      </header>

      <p className="mt-3 border-b border-slate-300 pb-3 text-[10pt] leading-snug">{personal.about}</p>

      <ResumeSection title="Internship Experience">
        {experience.map((role) => (
          <div key={`${role.company}-${role.role}`} className="space-y-1">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[11pt] font-bold">{role.role}</h3>
                <p className="text-[10pt] leading-snug">{role.company}</p>
                <p className="text-[9.5pt] leading-snug">{role.location}</p>
              </div>
              <p className="whitespace-nowrap text-[9.5pt]">{role.period}</p>
            </div>
            <ul className="list-disc space-y-0.5 pl-6 text-[9.5pt] leading-snug">
              {role.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Technical Skills">
        <div className="grid grid-cols-2 gap-x-10">
          {splitSkillGroups(skillGroups).map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((group) => (
                <SkillList key={group.title} title={group.title} items={group.items} inline={group.display === 'inline'} />
              ))}
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        {projects.map((project) => (
          <div key={project.id} className="space-y-1">
            <h3 className="text-[11pt] font-bold">{project.title}</h3>
            <ul className="list-disc space-y-0.5 pl-6 text-[9.5pt] leading-snug">
              {(project.resumeBullets ?? [project.description]).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </ResumeSection>

      {certifications.length > 0 ? (
        <ResumeSection title="Certifications">
          {certifications.map((certification) => (
            <div key={`${certification.name}-${certification.issuer}`} className="space-y-1">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-[10.5pt] font-bold leading-snug">{certification.name}</h3>
                  {certification.issuer ? <p className="text-[10pt] leading-snug">{certification.issuer}</p> : null}
                </div>
                {certification.date ? <p className="whitespace-nowrap text-[9.5pt]">{certification.date}</p> : null}
              </div>
            </div>
          ))}
        </ResumeSection>
      ) : null}

      <ResumeSection title="Education">
        {education.entries.map((entry) => (
          <div key={`${entry.level}-${entry.school}`} className="space-y-1">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[10.5pt] font-bold leading-snug">{entry.level}</h3>
                <p className="text-[10pt] leading-snug">{entry.school}</p>
                {entry.details ? <p className="text-[9.5pt] leading-snug">{entry.details.join(' | ')}</p> : null}
              </div>
              <p className="whitespace-nowrap text-[9.5pt]">{entry.period}</p>
            </div>
          </div>
        ))}
      </ResumeSection>

    </article>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-3">
      <h2 className="border-b border-black pb-0.5 text-[12pt] font-bold uppercase tracking-[0.14em]">{title}</h2>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}

function splitSkillGroups(groups: SkillGroup[]) {
  const midpoint = Math.ceil(groups.length / 2);
  return [groups.slice(0, midpoint), groups.slice(midpoint)];
}

function getQuickStrengths(groups: SkillGroup[]) {
  const icons = [Wrench, Network, Sparkles];

  return groups.slice(0, 3).map((group, index) => ({
    icon: icons[index] ?? Wrench,
    title: group.title,
    text: group.items.slice(0, 3).join(', '),
  }));
}

function SkillList({ title, items, inline = false }: { title: string; items: string[]; inline?: boolean }) {
  return (
    <div className="mt-2 text-[9.5pt]">
      <h3 className="font-bold">{title}</h3>
      {inline ? (
        <p className="mt-1">{items.join(' | ')}</p>
      ) : (
        <ul className="mt-0.5 list-disc space-y-0.5 pl-6 leading-snug">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-5 text-slate-900">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-600" />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase text-emerald-700">Loading resume</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Fetching the latest portfolio data.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">The portfolio is pulling content from the live resume JSON endpoint.</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-5 text-slate-900">
      <div className="w-full max-w-md rounded-lg border border-rose-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-rose-700">Resume unavailable</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Could not load portfolio data.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{message || 'Please check the resume JSON endpoint and try again.'}</p>
      </div>
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
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex min-w-0 gap-4 transition hover:text-emerald-300">
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

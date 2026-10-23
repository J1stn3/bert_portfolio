import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import { personal, projects, categories, skills, services, steps, education, achievements, type Project } from "./data/content";

const NAV = ["Home", "About", "Portfolio", "Services", "Process", "Contact"];
const id = (s: string) => s.toLowerCase();
const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6 } };
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-serif italic text-xl text-cobalt mb-3">{children}</p>
);
const Btn = ({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) => (
  <motion.a whileTap={{ scale: 0.96 }} href={href}
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 ${dark ? "bg-cobalt text-[#071510] shadow-[0_0_20px_rgba(198,241,53,0.35)] hover:bg-white hover:text-[#071510]" : "border border-[#1E4937] bg-[#0E251C]/60 text-ink backdrop-blur hover:border-cobalt hover:text-cobalt"}`}>
    {children}
  </motion.a>
);

function Art({ p, big }: { p: Project; big?: boolean }) {
  if (p.cover) {
    return (
      <img
        src={p.cover}
        alt={p.title}
        loading="lazy"
        className="w-full h-auto block object-contain"
      />
    );
  }
  const [a, b, c] = p.palette;
  return (
    <div className={`relative w-full ${p.ratio ?? "aspect-[4/5]"} overflow-hidden`} style={{ background: a }} role="img" aria-label={`${p.title} — sample placeholder artwork`}>
      <div className="absolute -right-1/4 -bottom-1/4 aspect-square w-3/4 rounded-full" style={{ background: b }} />
      <div className="absolute left-[8%] top-[10%] h-[34%] w-[34%]" style={{ background: c }} />
      <span className={`absolute left-[8%] bottom-[8%] font-display font-bold leading-none ${big ? "text-9xl" : "text-6xl"}`} style={{ color: c === a ? b : c, mixBlendMode: "difference" }}>
        {p.title[0]}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-ink">SAMPLE</span>
    </div>
  );
}

function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#071510]/85 backdrop-blur-md border-b border-[#1E4937]/50">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" className="font-display text-xl font-bold tracking-tight text-ink">{personal.monogram}<span className="text-cobalt">.</span></a>
        <ul className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n}><a href={`#${id(n)}`} aria-current={active === id(n) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-cobalt ${active === id(n) ? "text-cobalt underline underline-offset-8" : "text-ink/80"}`}>{n}</a></li>
          ))}
          {personal.resume && <li><a href={personal.resume} download className="text-sm font-semibold text-cobalt hover:underline">Resume</a></li>}
        </ul>
        <button className="md:hidden text-ink" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <motion.div style={{ scaleX: scrollYProgress }} className="h-0.5 origin-left bg-cobalt shadow-[0_0_8px_rgba(198,241,53,0.8)]" />
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#1E4937]/50 bg-[#071510] px-5 md:hidden">
            {NAV.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${id(n)}`} className="block py-3 font-display text-2xl text-ink hover:text-cobalt">{n}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 px-5 md:px-10">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#133527]/50 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-[#C6F135]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-12 w-full">
        <div className="md:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 font-serif text-2xl italic text-cobalt">{(personal as any).heroTagline ?? "Aspiring Graphic Designer"}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl text-ink">
            Hi, I'm <span className="text-cobalt">{(personal as any).nickname ?? "Britt"}.</span>
          </motion.h1>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 font-display text-2xl font-medium sm:text-3xl text-ink/90">
            {(personal as any).heroHeadline ?? "Graphic Designer in Progress. Creative by Nature."}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-5 max-w-xl text-base sm:text-lg text-mute leading-relaxed">
            {(personal as any).heroBio ?? "I'm an aspiring graphic designer passionate about visual communication, creative experimentation, and transforming ideas into meaningful designs. I enjoy exploring typography, colors, layouts, and visual concepts to create designs that communicate clearly and leave a lasting impression."}
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn dark href="#portfolio">Explore My Work <ArrowUpRight size={18} /></Btn>
            <Btn href="#contact">Let's Connect</Btn>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md md:col-span-5" aria-hidden="true">
          <div className="absolute inset-0 overflow-hidden rounded-t-full border border-[#1E4937] bg-gradient-to-b from-[#133527] to-[#071510] shadow-[0_0_50px_rgba(198,241,53,0.15)]">
            {personal.heroPhoto ? (
              <img src={personal.heroPhoto} alt={personal.name} className="h-full w-full object-cover" />
            ) : null}
          </div>
          {!personal.heroPhoto && (
            <>
              <div className="absolute -left-4 bottom-10 h-28 w-28 rounded-full bg-[#122F22]" />
              <div className="absolute right-0 top-1/3 h-24 w-40 bg-[#05110C]" />
              <span className="absolute bottom-6 left-6 font-display text-8xl font-bold tracking-tighter text-ink">{personal.monogram}</span>
            </>
          )}
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute -right-3 top-4 h-16 w-16 rounded-full border-2 border-dashed border-[#1E4937]" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const rows = [
    ["Name", personal.name],
    ["Creative Focus", personal.focus],
    ["Location", personal.location],
    ["School / University", (personal as any).school],
    ["Learning Goals", (personal as any).learning]
  ].filter(([_, v]) => Boolean(v));

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <motion.div {...reveal} className="md:col-span-5">
          {personal.photo ? (
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[#1E4937] bg-[#0E251C] shadow-xl">
              <img src={personal.photo} alt={personal.name} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[4/5] bg-[#0E251C] border border-[#1E4937] rounded-2xl p-6 flex items-end">
              <p className="font-serif text-2xl italic text-mute">Profile image placeholder — add your portrait or a personal artwork.</p>
            </div>
          )}
        </motion.div>
        <motion.div {...reveal} className="md:col-span-7">
          <Label>About me</Label>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">
            {(personal as any).aboutHeadline ?? "Design is how I make ideas visible."}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-mute whitespace-pre-line leading-relaxed">
            {(personal as any).aboutBio ?? "I'm drawn to visual communication, and I'm curious about how typography, color, composition and layout shape the way people feel and understand a message. I'm building my skills one project at a time, aiming to create purposeful, visually engaging work and to keep growing as a graphic designer."}
          </p>
          <dl className="mt-10 divide-y divide-[#1E4937]/50 border-y border-[#1E4937]/50">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm uppercase tracking-widest text-mute">{k}</dt>
                <dd className="col-span-2 font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
      <motion.div {...reveal} className="mt-24">
        <Label>Design skills</Label>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="rounded-2xl border border-[#1E4937]/60 bg-[#0B2017]/70 p-6 backdrop-blur transition-all duration-300 hover:border-cobalt/50 hover:bg-[#0E281D]">
              <h3 className="mb-4 border-b border-[#1E4937] pb-2 font-display text-lg font-bold text-ink">{g.group}</h3>
              <ul className="space-y-2 text-mute">{g.items.map((s) => <li key={s} className="hover:text-ink transition-colors">{s}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-mute">Skills and tools listed are suggestions — edit in <code>src/data/content.ts</code> to match what you actually use.</p>
      </motion.div>
    </section>
  );
}

function Modal({ p, onClose, onNav }: { p: Project; onClose: () => void; onNav: (d: number) => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNav(1); if (e.key === "ArrowLeft") onNav(-1); };
    document.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose, onNav]);
  return (
    <motion.div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()}
        initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} className="mx-auto grid max-w-6xl bg-[#091D15] border border-[#1E4937] text-ink md:grid-cols-2 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-center bg-[#05110C] p-4 md:p-8 min-h-[350px]">
          {p.cover ? (
            <img src={p.cover} alt={p.title} className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg" />
          ) : (
            <div className="w-full aspect-[4/5]"><Art p={p} big /></div>
          )}
        </div>
        <div className="flex flex-col justify-between p-6 md:p-10">
          <div>
            <div className="flex justify-between items-start">
              <p className="font-serif text-xl italic text-cobalt">{p.category}</p>
              <button autoFocus aria-label="Close project" onClick={onClose} className="p-1 text-mute hover:text-cobalt transition-colors"><X /></button>
            </div>
            <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">{p.title}</h3>
            <p className="mt-4 text-mute leading-relaxed">{p.description}</p>
            <div className="my-6 flex gap-2" aria-label="Color palette">{p.palette.map((c) => <span key={c} title={c} className="h-8 w-8 rounded-full border border-[#1E4937]" style={{ background: c }} />)}</div>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 font-semibold text-cobalt hover:underline">View project <ArrowUpRight size={16} /></a>}
          </div>
          <div className="mt-8 flex gap-4 border-t border-[#1E4937] pt-4 text-sm font-medium text-mute">
            <button onClick={() => onNav(-1)} className="hover:text-cobalt transition-colors">← Previous</button>
            <button onClick={() => onNav(1)} className="hover:text-cobalt transition-colors">Next →</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Portfolio() {
  const [cat, setCat] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  const cur = projects.find((p) => p.id === openId);
  const nav = (d: number) => {
    const l = list; const i = l.findIndex((p) => p.id === openId);
    if (i >= 0) setOpenId(l[(i + d + l.length) % l.length].id);
  };
  return (
    <section id="portfolio" className="relative bg-[#05110C] px-5 py-24 text-ink md:px-10 border-y border-[#1E4937]/50">
      <div className="mx-auto max-w-7xl">
        <Label>Featured portfolio</Label>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl text-ink">
          {(personal as any).portfolioHeadline ?? "Selected work."}
        </h2>
        <p className="mt-4 max-w-xl text-mute">
          {(personal as any).portfolioSubtitle ?? "A curated selection of graphic design, branding, and promotional projects."}
        </p>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {["All", ...categories].map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${cat === c ? "border-cobalt bg-cobalt text-[#071510] shadow-[0_0_15px_rgba(198,241,53,0.3)]" : "border-[#1E4937] bg-[#0E251C]/60 text-mute hover:border-cobalt/60 hover:text-ink"}`}>{c}</button>
          ))}
        </div>
        <motion.ul layout className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li layout key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.06 }} className="mb-6 break-inside-avoid">
                <button onClick={() => setOpenId(p.id)} className="group block w-full text-left rounded-2xl border border-[#1E4937]/70 bg-gradient-to-b from-[#0E251C] to-[#071711] p-3 transition-all duration-300 hover:border-cobalt/60 hover:shadow-[0_10px_30px_rgba(198,241,53,0.12)]" aria-label={`Open ${p.title}`}>
                  <div className="overflow-hidden rounded-xl bg-black/30">
                    <Art p={p} />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between px-1">
                    <h3 className="font-display text-xl font-medium text-ink group-hover:text-cobalt transition-colors">{p.title}</h3>
                    <ArrowUpRight className="text-mute transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cobalt" size={18} />
                  </div>
                  <p className="mt-1 text-sm text-mute px-1">{p.category}</p>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="mt-10 text-mute">No projects in this category yet.</p>}
      </div>
      <AnimatePresence>{cur && <Modal key="m" p={cur} onClose={() => setOpenId(null)} onNav={nav} />}</AnimatePresence>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <motion.div {...reveal}>
        <Label>Design interests</Label>
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">What I love to make.</h2>
        <p className="mt-3 text-mute">Areas I'm exploring and open to working on — not a fixed service menu.</p>
        <ul className="mt-10 border-t border-[#1E4937]">
          {services.map(([t, d], i) => (
            <li key={t} className="group grid grid-cols-[3rem_1fr] items-baseline gap-2 border-b border-[#1E4937]/50 py-6 transition-colors hover:bg-[#0E251C]/60 md:grid-cols-[4rem_1fr_1fr] px-3 rounded-lg">
              <span className="font-serif italic text-cobalt text-xl">0{i + 1}</span>
              <h3 className="font-display text-xl font-medium md:text-2xl text-ink group-hover:text-cobalt transition-colors">{t}</h3>
              <p className="col-start-2 text-mute md:col-start-3">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-display text-2xl text-ink">Have a creative idea? <a href="#contact" className="text-cobalt underline underline-offset-4 hover:text-white transition-colors">Let's talk about it.</a></p>
      </motion.div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-[#091D15] border-y border-[#1E4937]/60 px-5 py-24 md:px-10 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#133527]/30 blur-3xl" />
      <div className="mx-auto max-w-7xl relative">
        <Label>Creative process</Label>
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">How I approach a project.</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <motion.li key={t} {...reveal} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t-2 border-cobalt pt-4 bg-[#0B2017]/60 p-5 rounded-b-xl border-x border-b border-[#1E4937]/40">
              <span className="font-display text-6xl font-bold text-cobalt">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{t}</h3>
              <p className="mt-2 text-mute">{d}</p>
            </motion.li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-mute">A proposed workflow, not a documented professional process.</p>
      </div>
    </section>
  );
}

function Growth() {
  if (!education.length && !achievements.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      {education.length > 0 && <><Label>Education & development</Label>
        {education.map((e) => <div key={e.school} className="mb-4 border-b border-[#1E4937]/50 pb-4"><h3 className="font-display text-xl text-ink">{e.program}</h3><p className="text-mute">{e.school} · {e.dates}</p>{e.notes && <p className="text-mute">{e.notes}</p>}</div>)}</>}
      {achievements.length > 0 && <div className="mt-12"><Label>Achievements</Label>
        {achievements.map((a) => <div key={a.title} className="mb-4 border-b border-[#1E4937]/50 pb-4"><h3 className="font-display text-xl text-ink">{a.title}</h3><p className="text-mute">{a.org} · {a.date}</p>{a.description && <p className="text-mute">{a.description}</p>}</div>)}</div>}
    </section>
  );
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const v = Object.fromEntries(["name", "email", "subject", "message"].map((k) => [k, String(f.get(k) ?? "").trim()]));
    const er: Record<string, string> = {};
    if (!v.name) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Please enter a valid email address.";
    if (!v.subject) er.subject = "Please add a subject.";
    if (v.message.length < 10) er.message = "Message should be at least 10 characters.";
    setErrs(er);
    if (Object.keys(er).length) return;
    if (personal.formEndpoint) {
      setState("sending");
      try {
        const r = await fetch(personal.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(v) });
        setState(r.ok ? "ok" : "err");
        if (r.ok) e.currentTarget.reset();
      } catch { setState("err"); }
    } else if (personal.email) {
      location.href = `mailto:${personal.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`)}`;
    } else setState("err");
  }
  const field = "w-full border-b-2 border-[#1E4937] bg-transparent py-3 text-ink placeholder:text-mute/60 outline-none focus:border-cobalt transition-colors";
  const links = Object.entries(personal.socials).filter(([, u]) => u);
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div {...reveal}>
          <Label>Contact</Label>
          <h2 className="font-display text-5xl font-bold leading-none tracking-tighter md:text-7xl text-ink">Let's Create Something Meaningful.</h2>
          <p className="mt-6 max-w-md text-lg text-mute">I'm always interested in exploring creative ideas, learning from others, and connecting with people who appreciate thoughtful design.</p>
          {personal.email && (
            <button onClick={() => { navigator.clipboard?.writeText(personal.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="mt-6 inline-flex items-center gap-2 font-medium text-cobalt hover:text-white transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied!" : personal.email}
            </button>
          )}
          {links.length > 0 && <ul className="mt-6 flex flex-wrap gap-4">{links.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noreferrer" className="underline underline-offset-4 text-mute hover:text-cobalt transition-colors">{n}</a></li>)}</ul>}
        </motion.div>
        <motion.form {...reveal} onSubmit={submit} noValidate className="space-y-6" aria-live="polite">
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          {([["name", "Full Name", "text"], ["email", "Email Address", "email"], ["subject", "Subject", "text"]] as const).map(([n, l, t]) => (
            <div key={n}><label htmlFor={n} className="text-sm font-semibold text-ink">{l}</label>
              <input id={n} name={n} type={t} className={field} aria-invalid={!!errs[n]} aria-describedby={errs[n] ? `${n}-e` : undefined} />
              {errs[n] && <p id={`${n}-e`} className="mt-1 text-sm text-red-400">{errs[n]}</p>}</div>
          ))}
          <div><label htmlFor="message" className="text-sm font-semibold text-ink">Message</label>
            <textarea id="message" name="message" rows={4} className={field} aria-invalid={!!errs.message} aria-describedby={errs.message ? "message-e" : undefined} />
            {errs.message && <p id="message-e" className="mt-1 text-sm text-red-400">{errs.message}</p>}</div>
          <button disabled={state === "sending"} className="rounded-full bg-cobalt px-8 py-3 font-semibold text-[#071510] shadow-[0_0_20px_rgba(198,241,53,0.35)] transition-all hover:bg-white hover:text-[#071510] disabled:opacity-50">
            {state === "sending" ? "Sending…" : "Send Message"}
          </button>
          {state === "ok" && <p className="text-cobalt font-medium">Thank you — your message was sent.</p>}
          {state === "err" && <p className="text-red-400">Couldn't send. {personal.formEndpoint || personal.email ? "Please try again later." : "Contact form isn't configured yet (see README)."}</p>}
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040C08] border-t border-[#1E4937]/60 px-5 py-12 text-ink md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div><p className="font-display text-5xl font-bold text-ink">{personal.monogram}<span className="text-cobalt">.</span></p>
          <p className="mt-2 text-ink">{personal.name}</p><p className="font-serif italic text-mute">{personal.tagline}</p></div>
        <ul className="flex flex-wrap gap-5 text-sm text-mute">{NAV.map((n) => <li key={n}><a href={`#${id(n)}`} className="hover:text-cobalt transition-colors">{n}</a></li>)}</ul>
        <a href="#home" aria-label="Back to top" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1E4937] text-mute hover:border-cobalt hover:bg-cobalt hover:text-[#071510] transition-colors"><ArrowUp /></a>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-mute/60">© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(id(n)); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (<><Nav active={active} /><main><Hero /><About /><Portfolio /><Services /><Process /><Growth /><Contact /></main><Footer /></>);
}

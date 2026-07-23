"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  ChevronDown,
  Clapperboard,
  Crown,
  Film,
  Image as ImageIcon,
  Menu,
  Mail,
  Moon,
  MapPin,
  Phone,
  Play,
  Quote,
  Share2,
  Sun,
  Users,
  X,
} from "lucide-react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const aboutLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const aboutRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const serviceItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const galleryItem = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const testimonialItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const ctaItem = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

function Button({ href, variant = "solid", className, children }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50";
  const solid =
    "bg-[#C9A84C] text-black hover:bg-[#C9A84C]/90 shadow-[0_18px_50px_rgba(0,0,0,0.55)]";
  const ghostWhite =
    "border border-white/70 text-white hover:bg-white hover:text-black";
  const ghostGold =
    "border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black";
  const navCta =
    "border border-[#C9A84C] text-[#C9A84C] bg-[#1E293B] hover:bg-[#C9A84C] hover:text-[#1E293B]";
  const darkOutline =
    "border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black";

  const cls = cx(
    base,
    variant === "solid"
      ? solid
      : variant === "ghostGold"
        ? ghostGold
        : variant === "navCta"
          ? navCta
          : variant === "darkOutline"
            ? darkOutline
            : ghostWhite,
    className
  );

  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

function useCountUp({ to, start = 0, durationMs = 1200, enabled }) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (to - start) * eased);
      setValue(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [durationMs, enabled, start, to]);

  return value;
}

function SectionTitle({ kicker, title, center }) {
  return (
    <div className={cx(center && "text-center")}>
      <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C]">
        {kicker}
      </p>
      <h2 className="mt-4 font-[var(--font-serif)] text-3xl md:text-5xl leading-tight text-white">
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState("dark"); // "dark" | "light"
  const isDark = theme === "dark";
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const gallery = useMemo(
    () => [
      { id: 101, h: "h-[260px]", src: "/wedding_1.png" },
      { id: 102, h: "h-[420px]", src: "/wedding_2.png" },
      { id: 103, h: "h-[320px]", src: "/wedding_3.png" },
      { id: 104, h: "h-[520px]", src: "/wedding_4.png" },
      { id: 105, h: "h-[360px]", src: "/wedding_5.png" },
      { id: 106, h: "h-[460px]", src: "/wedding_6.png" },
    ],
    []
  );

  const weddings = 2000;
  const years = 10;
  const cities = 5;
  const awards = 50;

  return (
    <div
      className={cx(
        "min-h-full transition-colors duration-500",
        isDark ? "bg-[#0A0A0A] text-white" : "bg-[#FCF9F5] text-[#333333]"
      )}
    >
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <header
        className={cx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? isDark
              ? "bg-black/85 backdrop-blur-md"
              : "bg-[#FCF9F5]/92 backdrop-blur-md border-b border-black/10"
            : "bg-transparent"
        )}
      >
        <nav className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          <a
            href="#home"
            className={cx(
              "font-[var(--font-serif)] text-2xl sm:text-3xl font-bold tracking-[0.12em]",
              isDark ? "text-white" : "text-[#333333]"
            )}
          >
            FBV
          </a>

          <ul className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.26em] uppercase list-none">
            {[
              ["HOME", "#home"],
              ["ABOUT", "#about"],
              ["SERVICES", "#services"],
              ["GALLERY", "#gallery"],
              ["TESTIMONIALS", "#testimonials"],
              ["CONTACT", "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button href="#contact" variant="navCta" className="px-5 py-2.5">
                BOOK NOW →
              </Button>
            </div>
            <button
              type="button"
              className={cx(
                "flex md:hidden h-10 w-10 items-center justify-center rounded-full transition",
                isDark
                  ? "border border-white/15 bg-white/5 hover:bg-white/10"
                  : "border border-black/10 bg-black/5 hover:bg-black/10"
              )}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <motion.div
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, pointerEvents: "auto", display: "block" },
            closed: { opacity: 0, pointerEvents: "none", transitionEnd: { display: "none" } },
          }}
          className="md:hidden"
        >
          <div className="absolute inset-0" aria-hidden="true" />
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 pb-6">
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl p-5 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between">
                <div className="text-[11px] tracking-[0.26em] uppercase text-white/70">
                  Menu
                </div>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid gap-2 text-[12px] tracking-[0.24em] uppercase">
                {[
                  ["HOME", "#home"],
                  ["ABOUT", "#about"],
                  ["SERVICES", "#services"],
                  ["GALLERY", "#gallery"],
                  ["TESTIMONIALS", "#testimonials"],
                  ["CONTACT", "#contact"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cx(
                      "rounded-2xl px-4 py-3 transition",
                      isDark
                        ? "text-white/85 hover:text-white hover:bg-white/5"
                        : "text-[#333333]/85 hover:text-[#333333] hover:bg-black/5"
                    )}
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div className="mt-4">
                <Button href="#contact" variant="navCta" className="w-full">
                  BOOK NOW →
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <main id="home">
        <section className="relative min-h-screen overflow-hidden">
          <video
            src="/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 bg-black/40 z-[1]" />

          <div className="relative z-10 w-full max-w-screen-xl mx-auto flex min-h-screen flex-col items-start justify-end md:justify-center px-6 py-16 md:px-16 md:py-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="w-full max-w-4xl pb-12 md:pb-0"
            >
              <motion.p
                variants={fadeInUp}
                className="text-[11px] sm:text-xs tracking-[0.38em] uppercase text-[#C9A84C] text-center md:text-left"
              >
                WEDDING STORYTELLERS IN HYDERABAD
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className="mt-7 font-[var(--font-serif)] text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-center md:text-left"
              >
                Crafted with Love,
                <br />
                <span className="text-white">Framed by <span className="font-[var(--font-serif)] font-extrabold">VARUN</span></span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-sm md:text-base text-center md:text-left max-w-xl text-[#AAAAAA]"
              >
                Timeless wedding stories, captured with elegance and emotion.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <Button href="#gallery" variant="solid" className="w-full sm:w-auto">
                  EXPLORE OUR STORIES
                </Button>
                <Button href="#contact" variant="darkOutline" className="w-full sm:w-auto">
                  {"LET'S TALK →"}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-wrap justify-center md:justify-start gap-6 mt-6"
            >
              {[
                ["2000+", "Stories"],
                ["10+", "Years"],
                ["5", "Cities"],
                ["50+", "Awards"],
              ].map(([n, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-sm px-6 py-4"
                >
                  <div className="font-[var(--font-serif)] text-2xl sm:text-3xl text-[#C9A84C]">
                    {n}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.28em] uppercase text-white/70">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
              <span className="text-[10px] tracking-[0.34em] uppercase">
                Scroll
              </span>
              <ChevronDown className="h-6 w-6 animate-bounce text-[#C9A84C]" />
            </div>

            <p className="sr-only">
              Video is a placeholder. Replace with your real wedding film later.
            </p>
          </div>
        </section>

        <section className={cx(isDark ? "bg-[#C9A84C] text-black" : "bg-[#D4AF37] text-black")}>
          <div className="overflow-hidden w-full">
            <div
              className="flex w-max whitespace-nowrap py-3.5"
              style={{ animation: "marqueeLeft 20s linear infinite" }}
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-12 px-6 text-xs sm:text-sm font-semibold tracking-[0.30em] uppercase shrink-0"
                >
                  <span>PHOTOGRAPHY</span>
                  <span className="opacity-40">·</span>
                  <span>ALBUMS</span>
                  <span className="opacity-40">·</span>
                  <span>PRE-WEDDING</span>
                  <span className="opacity-40">·</span>
                  <span>WEDDINGS</span>
                  <span className="opacity-40">·</span>
                  <span>FILMS</span>
                  <span className="opacity-40">·</span>
                  <span>EVENTS</span>
                  <span className="opacity-40">·</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className={cx("relative overflow-hidden", isDark ? "bg-[#0A0A0A]" : "bg-[#FCF9F5]")}
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={aboutLeft}
                style={{ willChange: "transform" }}
                className="relative"
              >
                <div className="absolute -inset-6 rounded-[2.25rem] bg-[radial-gradient(60%_60%_at_30%_20%,rgba(201,168,76,0.18)_0%,rgba(0,0,0,0)_65%)] blur-2xl opacity-70" />
                <div
                  className={cx(
                    "relative overflow-hidden rounded-[2.25rem] shadow-[0_30px_80px_rgba(0,0,0,0.75)]",
                    isDark ? "border border-white/10" : "border border-black/10"
                  )}
                >
                  <div
                    className="h-[520px] sm:h-[620px] w-full bg-cover bg-center will-change-transform"
                    style={{
                      backgroundImage:
                        "url('https://picsum.photos/700/900?random=1')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={aboutRight}
                style={{ willChange: "transform" }}
              >
                <p
                  className={cx(
                    "text-xs tracking-[0.35em] uppercase",
                    isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                  )}
                >
                  OUR STORY
                </p>
                <h2
                  className={cx(
                    "mt-4 font-[var(--font-serif)] text-3xl md:text-5xl leading-tight",
                    isDark ? "text-white" : "text-[#333333]"
                  )}
                >
                  From the land of culture, tradition and elegance
                </h2>
                <p
                  className={cx(
                    "mt-6 text-sm md:text-base leading-loose",
                    isDark ? "text-[#AAAAAA]" : "text-[#333333]/75"
                  )}
                >
                  We’re a wedding production house—filmmakers and photographers
                  who build narrative, mood, and momentum. We create imagery
                  that’s bold, refined, and cinematic—crafted for couples who
                  want their wedding to feel like a legacy.
                </p>

                 <div className="mt-10 flex flex-col sm:block">
                   <Button href="#contact" variant="ghostGold" className="w-full sm:w-auto">
                     Know More <ArrowRight className="h-4 w-4" />
                   </Button>
                 </div>

                <div className="mt-10 grid grid-cols-3 gap-4">
                  {[
                    { icon: Crown, label: "Luxury" },
                    { icon: Clapperboard, label: "Cinematic" },
                    { icon: ImageIcon, label: "Editorial" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className={cx(
                        "rounded-3xl p-4 text-center",
                        isDark
                          ? "border border-white/10 bg-white/5"
                          : "border border-black/10 bg-black/5"
                      )}
                    >
                      <b.icon
                        className={cx(
                          "mx-auto h-5 w-5",
                          isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                        )}
                      />
                      <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-white/70">
                        {b.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className={cx("relative overflow-hidden", isDark ? "bg-[#111111]" : "bg-[#E8E2D6]")}
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              className="text-center"
              style={{ willChange: "transform" }}
            >
              <SectionTitle kicker="WHAT WE CRAFT" title="Crafting Memories That Last Forever." center />
              <p
                className={cx(
                  "mx-auto mt-5 max-w-2xl text-sm leading-loose",
                  isDark ? "text-[#AAAAAA]" : "text-[#333333]/75"
                )}
              >
                We create wedding films, photographs, and albums that preserve emotions, details, and memories for generations to come.
              </p>
            </motion.div>

            <div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {[
                {
                  icon: Film,
                  title: "Wedding Films",
                  desc: "Emotion-driven cinematic films crafted to relive your wedding day for years to come.",
                  link: "EXPLORE FILMS →",
                },
                {
                  icon: Camera,
                  title: "Photography",
                  desc: "Authentic moments and timeless portraits captured with elegance and creativity.",
                  link: "EXPLORE GALLERY →",
                },
                {
                  icon: BookOpen,
                  title: "Albums",
                  desc: "Handcrafted albums designed to preserve your story in its most beautiful form.",
                  link: "EXPLORE ALBUMS →",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className={cx(
                    "group relative rounded-3xl p-8 w-full",
                    "bg-[#0D0D0D] border border-white/10 text-white",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.55)]",
                    "transition-all duration-300 hover:-translate-y-1.5"
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-300 group-hover:border-[#C9A84C]/60" />
                  <div className="flex items-center gap-3">
                    <div
                      className={cx(
                        "flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/40 border-white/10"
                      )}
                    >
                      <s.icon
                        className={cx(
                          "h-5 w-5 text-[#C9A84C]"
                        )}
                      />
                    </div>
                    <h3
                      className={cx(
                        "font-[var(--font-serif)] text-2xl text-white"
                      )}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className={cx(
                      "mt-5 text-sm leading-loose text-[#AAAAAA]"
                    )}
                  >
                    {s.desc}
                  </p>
                  <div
                    className={cx(
                      "mt-7 h-px w-full bg-white/10"
                    )}
                  />
                  <div className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/70 group-hover:text-[#C9A84C] transition">
                    {s.link}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="relative bg-[#0A0A0A] text-white"
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              className="text-center"
              style={{ willChange: "transform" }}
            >
              <h2
                className="font-[var(--font-serif)] text-3xl md:text-5xl text-white px-4 text-center w-full overflow-visible"
              >
                STORIES WE FRAMED
              </h2>
              <p
                className="mx-auto mt-5 max-w-2xl text-sm leading-loose text-[#AAAAAA]"
              >
                A GLIMPSE INTO THE LOVE STORIES WE'VE HAD THE HONOR TO CAPTURE. ✨📸
              </p>
            </motion.div>

            <div
              className="mt-12 columns-2 lg:columns-3 gap-4"
            >
              {gallery.map((img) => (
                <div key={img.id} className="break-inside-avoid mb-4 w-full">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ willChange: "transform" }}
                    href="#contact"
                    className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.35)]"
                  >
                    <div
                      className={cx(
                        "w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]",
                        img.h
                      )}
                      style={{
                        backgroundImage: `url('${img.src}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <div
                        className="backdrop-blur-sm px-6 py-5 bg-black/70"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs tracking-[0.28em] uppercase text-[#C9A84C]"
                          >
                            View +
                          </span>
                          <ArrowRight
                            className="h-4 w-4 text-[#C9A84C]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={cx(
            isDark ? "bg-[linear-gradient(#111111,#0A0A0A)]" : "bg-[linear-gradient(#E8E2D6,#FCF9F5)]"
          )}
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { n: "2000+", label: "Weddings", icon: Users },
                { n: "10+", label: "Years", icon: Clapperboard },
                { n: "5", label: "Cities", icon: MapPin },
                { n: "50+", label: "Awards", icon: Award },
              ].map((s) => (
                <div
                  key={s.label}
                  className={cx(
                    "rounded-3xl p-7 text-center backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.35)]",
                    isDark
                      ? "border border-white/10 bg-black/35"
                      : "border border-black/10 bg-white/55"
                  )}
                >
                  <s.icon
                    className={cx(
                      "mx-auto h-5 w-5",
                      isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                    )}
                  />
                  <div
                    className={cx(
                      "mt-4 font-[var(--font-serif)] text-4xl md:text-5xl",
                      isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                    )}
                  >
                    {s.n}
                  </div>
                  <div
                    className={cx(
                      "mt-2 text-[11px] tracking-[0.30em] uppercase",
                      isDark ? "text-[#AAAAAA]" : "text-[#333333]/70"
                    )}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className={cx(isDark ? "bg-[#111111]" : "bg-[#E8E2D6]")}
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              style={{ willChange: "transform" }}
            >
              <SectionTitle kicker="From The Client Diaries" title="The love notes we keep." />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 md:px-0"
            >
              {[
                {
                  name: "Aarohi & Karthik",
                  quote:
                    "The film felt like a trailer to our lives—every frame dramatic, intimate, and effortless. We can’t stop rewatching it.",
                },
                {
                  name: "Sana & Faiz",
                  quote:
                    "Bold, luxurious, and cinematic. The way you captured the rituals and the emotion—pure goosebumps.",
                },
                {
                  name: "Meera & Rohan",
                  quote:
                    "The photos look like stills from a movie. The lighting, the composition, the mood—everything is immaculate.",
                },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  variants={testimonialItem}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                  className={cx(
                    "relative w-full p-6 rounded-xl overflow-visible shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
                    isDark
                      ? "bg-[#1A1A1A] border border-[#2A2A2A]"
                      : "bg-[#FCF9F5] border border-black/10"
                  )}
                >
                  <Quote
                    className={cx(
                      "h-8 w-8",
                      isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                    )}
                  />
                  <p
                    className={cx(
                      "mt-5 text-sm leading-relaxed",
                      isDark ? "text-[#AAAAAA]" : "text-[#333333]/75"
                    )}
                  >
                    {t.quote}
                  </p>
                  <div
                    className={cx(
                      "mt-7 h-px w-full",
                      isDark ? "bg-[#C9A84C]/40" : "bg-[#D4AF37]/40"
                    )}
                  />
                  <div
                    className={cx(
                      "mt-4 text-xs font-[var(--font-serif)] italic",
                      isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                    )}
                  >
                    {t.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://picsum.photos/1600/600?random=20')",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(201,168,76,0.20)_0%,rgba(0,0,0,0)_55%)]" />

          <div className="relative w-full max-w-screen-xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ctaItem}
              style={{ willChange: "transform" }}
              className="mx-auto max-w-4xl text-center"
            >
              <p className="text-xs tracking-[0.35em] uppercase text-white/70">
                Limited dates · 2026
              </p>
              <h2 className="mt-5 font-[var(--font-serif)] text-3xl md:text-5xl leading-tight">
                Weave your moments into everlasting memories
              </h2>
               <div className="mt-10 flex justify-center w-full">
                 <Button href="#contact" variant="solid" className="px-8 py-3.5 w-full sm:w-auto">
                   Book Your Date <ArrowRight className="h-4 w-4" />
                 </Button>
               </div>
            </motion.div>
          </div>
        </section>

        <section
          id="contact"
          className={cx(isDark ? "bg-[#0A0A0A]" : "bg-[#FCF9F5]")}
        >
          <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeInUp}
                style={{ willChange: "transform" }}
              >
                <p
                  className={cx(
                    "text-xs tracking-[0.35em] uppercase",
                    isDark ? "text-[#C9A84C]" : "text-[#D4AF37]"
                  )}
                >
                  Contact
                </p>
                <h2
                  className={cx(
                    "mt-4 font-[var(--font-serif)] text-3xl md:text-5xl leading-tight",
                    isDark ? "text-white" : "text-[#333333]"
                  )}
                >
                  Let’s craft your wedding like cinema.
                </h2>
                <p
                  className={cx(
                    "mt-6 text-sm leading-loose",
                    isDark ? "text-[#AAAAAA]" : "text-[#333333]/75"
                  )}
                >
                  Share your date, venue, and vision. This form is a styled
                  placeholder—hook it to your booking tool anytime.
                </p>

                <div className="mt-10 space-y-4 text-sm text-white/85">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#C9A84C]" />
                    <span>hello@rvrpro.example</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#C9A84C]" />
                    <span>+91 99999 99999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#C9A84C]" />
                    <span>Hyderabad · Destination</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeInUp}
                style={{ willChange: "transform" }}
                className={cx(
                  "rounded-3xl p-6 sm:p-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]",
                  isDark
                    ? "border border-white/10 bg-[#111111]"
                    : "border border-black/10 bg-[#E8E2D6]"
                )}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name", placeholder: "Your name" },
                    { label: "Email", placeholder: "you@email.com" },
                    { label: "Wedding date", placeholder: "MM / DD / YYYY" },
                    { label: "Venue", placeholder: "Venue / city" },
                  ].map((f) => (
                    <label key={f.label} className="block">
                      <span className="text-[11px] tracking-[0.26em] uppercase text-white/60">
                        {f.label}
                      </span>
                      <input
                        className={cx(
                          "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none transition focus:ring-2",
                          isDark
                            ? "border border-white/10 bg-black/40 text-white placeholder:text-white/35 focus:border-[#C9A84C]/60 focus:ring-[#C9A84C]/20"
                            : "border border-black/10 bg-white/70 text-[#333333] placeholder:text-[#333333]/35 focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/20"
                        )}
                        placeholder={f.placeholder}
                      />
                    </label>
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="text-[11px] tracking-[0.26em] uppercase text-white/60">
                      Message
                    </span>
                    <textarea
                      rows={4}
                      className={cx(
                        "mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none transition focus:ring-2",
                        isDark
                          ? "border border-white/10 bg-black/40 text-white placeholder:text-white/35 focus:border-[#C9A84C]/60 focus:ring-[#C9A84C]/20"
                          : "border border-black/10 bg-white/70 text-[#333333] placeholder:text-[#333333]/35 focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/20"
                      )}
                      placeholder="Tell us what you’re dreaming up."
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <Button href="#contact" variant="solid" className="w-full">
                    Send Inquiry <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-xs leading-relaxed text-white/50">
                    Replace this form action with your real contact/CRM endpoint.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className={cx(isDark ? "bg-[#050505]" : "bg-[#111111]")}>
        <div className="w-full max-w-screen-xl mx-auto px-5 md:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div
              className={cx(
                "font-[var(--font-serif)] text-2xl sm:text-3xl font-bold tracking-[0.12em]",
                isDark ? "text-white" : "text-white"
              )}
            >
              RVR PRO
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] tracking-[0.26em] uppercase text-white/70">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Gallery", "#gallery"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", icon: Camera, href: "#" },
                { label: "YouTube", icon: Play, href: "#" },
                { label: "Facebook", icon: Share2, href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={cx(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
                    "border border-white/15 bg-white/5 hover:bg-white/10"
                  )}
                >
                  <s.icon
                    className={cx(
                      "h-4 w-4 text-white/80",
                      isDark ? "hover:text-[#C9A84C]" : "hover:text-[#D4AF37]"
                    )}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-[#2A2A2A]" />
          <div className="mt-6 text-center text-xs tracking-wide text-[#AAAAAA]">
            © {new Date().getFullYear()} RVR PRO. All rights reserved.
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        className={cx(
          "fixed bottom-6 right-6 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
          isDark ? "bg-[#C9A84C] text-black" : "bg-[#D4AF37] text-black"
        )}
        style={{ willChange: "transform" }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
}


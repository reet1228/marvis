import { useEffect, useRef, useState } from "react";
import { 
  ArrowRight, ArrowDown, Check, Menu, X, MessageCircle, 
  Sparkles, Layers, Zap, TrendingUp, Cpu, Code, Bot
} from "lucide-react";
import ParallaxStarsBackground from "../components/ParallaxStarsBackground";
import ScrollJourneyLine from "../components/ScrollJourneyLine";
import InteractiveJourneySection from "../components/InteractiveJourneySection";

const navItems = ["About", "Services", "Why Us", "Contact"];

const services = [
  { 
    no: "01", 
    title: "Digital Growth Strategy", 
    copy: "Clear direction for your next stage — from positioning and content to the channels that matter.",
    icon: TrendingUp,
    accent: "text-[#ef233c]"
  },
  { 
    no: "02", 
    title: "Websites & E-Commerce", 
    copy: "Fast, considered digital homes that make your business easier to trust and easier to choose.",
    icon: Code,
    accent: "text-blue-400"
  },
  { 
    no: "03", 
    title: "AI-Powered Creative", 
    copy: "Modern production workflows for product imagery, campaigns and social content that keeps moving.",
    icon: Bot,
    accent: "text-purple-400"
  },
  { 
    no: "04", 
    title: "Marketing Systems", 
    copy: "A practical mix of content, social, paid media and measurement built around your goals.",
    icon: Zap,
    accent: "text-yellow-400"
  },
];

const principles = [
  { no: "01", title: "VISION FIRST", copy: "We start with your business, not a template." },
  { no: "02", title: "TECH + CREATIVITY", copy: "We combine technology with human creative thinking." },
  { no: "03", title: "AI-ENABLED", copy: "We use modern AI workflows to create faster and smarter." },
  { no: "04", title: "GROWTH MINDED", copy: "Every digital asset has a purpose beyond looking good." }
];

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#top" className="inline-flex items-center group" aria-label="MARVISCO home">
      <img 
        src="./marvis-logo-red.png" 
        alt="MARVISCO" 
        className={
          footer 
            ? "h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105" 
            : "h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
        } 
      />
    </a>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    service: "Website",
    budget: "₹10K–₹25K",
    message: ""
  });

  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".compact-reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = art.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      art.style.setProperty("--mouse-x", x.toFixed(3));
      art.style.setProperty("--mouse-y", y.toFixed(3));
    };
    const reset = () => {
      art.style.setProperty("--mouse-x", "0");
      art.style.setProperty("--mouse-y", "0");
    };
    art.addEventListener("pointermove", onPointerMove);
    art.addEventListener("pointerleave", reset);
    return () => {
      art.removeEventListener("pointermove", onPointerMove);
      art.removeEventListener("pointerleave", reset);
    };
  }, []);

  const go = (id: string) => {
    const cleanId = id.toLowerCase().replace(/\s+/g, '-');
    document.querySelector(cleanId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter relative overflow-x-hidden selection-red">
      
      {/* Dynamic Parallax Stars Space Atmosphere */}
      <ParallaxStarsBackground speed={1.2} />

      {/* Animated Scroll Journey Line */}
      <ScrollJourneyLine />

      {/* Top Blur Gradient Overlay */}
      <div className="gradient-blur"></div>

      {/* Glassmorphic Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 pt-6 px-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => go(`#${item.toLowerCase().replace(/\s+/g, '-')}`)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-transparent border-0"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => go("#contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/5 px-6 py-2 transition-transform active:scale-95 border border-white/10"
            >
              <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ef233c_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute inset-[1px] rounded-full bg-black"></span>
              <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                Schedule <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#ef233c]" />
              </span>
            </button>

            <button
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <span className="text-xs font-mono tracking-widest text-red-400">MARVISCO / DIGITAL GROWTH</span>
          {navItems.map((item) => (
            <button key={item} onClick={() => go(`#${item.toLowerCase().replace(/\s+/g, '-')}`)}>
              {item}
              <ArrowRight size={22} className="text-[#ef233c]" />
            </button>
          ))}
          <button className="mobile-menu-talk" onClick={() => go("#contact")}>
            Start a Project <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <main className="relative z-10">
        {/* Red Noir Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-36 pb-20 px-6 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]"></span>
              </span>
              <span className="text-xs font-medium text-red-100/90 tracking-wide font-manrope">
                MARVISCO Digital Intelligence 2.0 is live
              </span>
              <ArrowRight className="w-3 h-3 text-red-400" />
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter font-manrope leading-[1.08] mb-8 animate-fade-up">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                Empowering
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                your vision for the{" "}
                <span className="text-[#ef233c] inline-block relative font-bold">
                  Future
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#ef233c] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up">
              We blend advanced technology, human creativity, and digital marketing systems to build what comes next.
            </p>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-up">
              <button onClick={() => go("#contact")} className="shiny-cta group">
                <span className="relative z-10 flex items-center gap-2 text-white font-medium text-base">
                  Schedule a Meet <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#ef233c]" />
                </span>
              </button>
              
              <button 
                onClick={() => go("#services")} 
                className="group px-8 py-4 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2 text-base"
              >
                Explore Services <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Core Ring Visual */}
          <div className="mt-16 w-full max-w-xs aspect-square relative grid place-items-center" ref={artRef}>
            <div className="compact-art-depth">
              <div className="compact-art-ring ring-1" />
              <div className="compact-art-ring ring-2" />
              <div className="compact-art-ring ring-3" />
              <div className="compact-art-core">M</div>
              <span className="compact-art-label label-vision">VISION</span>
              <span className="compact-art-label label-build">BUILD</span>
              <span className="compact-art-label label-grow">GROW</span>
            </div>
          </div>
        </section>

        {/* Integrated With Capabilities Strip */}
        <div className="w-full border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-10 opacity-70 hover:opacity-100 transition-opacity">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase shrink-0 font-mono">POWERED BY MODERN TECH & CREATIVE:</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center w-full">
              <div className="flex items-center gap-2 font-manrope font-semibold text-zinc-300"><div className="w-4 h-4 bg-[#ef233c] rounded-full"></div>Strategy</div>
              <div className="flex items-center gap-2 font-manrope font-semibold text-zinc-300"><div className="w-4 h-4 bg-white/20 rounded-full"></div>React & Web</div>
              <div className="flex items-center gap-2 font-manrope font-semibold text-zinc-300"><div className="w-4 h-4 bg-purple-500/40 rounded-full"></div>AI Studio</div>
              <div className="flex items-center gap-2 font-manrope font-semibold text-zinc-300"><div className="w-4 h-4 bg-blue-500/40 rounded-full"></div>Marketing Systems</div>
              <div className="flex items-center gap-2 font-manrope font-semibold text-zinc-300"><div className="w-4 h-4 bg-yellow-500/40 rounded-full"></div>Analytics</div>
            </div>
          </div>
        </div>

        {/* Signature Execution Bar */}
        <section className="py-16 border-b border-white/5 bg-zinc-950/40">
          <div className="container text-center">
            <div className="inline-flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-400 mb-4">
              <span className="text-[#ef233c] font-bold">OUR MARKETING</span>
              <span className="text-zinc-600">→</span>
              <span className="text-white font-bold">YOUR VISION</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-snug font-manrope">
              Connecting strategic execution directly to your business potential.
            </h3>
          </div>
        </section>

        {/* About Section */}
        <section className="py-32 px-6 relative" id="about">
          <div className="max-w-7xl mx-auto compact-reveal">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ef233c]"></span>
                01 / ABOUT MARVISCO
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-manrope tracking-tight text-white">
                Transforming vision <br />
                <span className="text-[#ef233c]">into reality.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
              <p className="text-lg text-zinc-400 leading-relaxed">
                MARVISCO is a technology-enabled digital growth partner based in India. We help ambitious businesses build stronger digital identities, reach the right audience, and turn attention into action.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                MARVISCO was created around a simple belief: businesses shouldn't need to navigate websites, content, marketing and technology separately. We bring these capabilities together under one roof.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-xl border border-white/10 bg-zinc-900/40 hover:border-white/20 transition-all">
                <strong className="block text-4xl font-extrabold text-white font-manrope mb-2">01</strong>
                <span className="text-xs font-mono text-zinc-400 tracking-wider">PARTNER FOR YOUR NEXT STAGE</span>
              </div>
              <div className="p-8 rounded-xl border border-white/10 bg-zinc-900/40 hover:border-white/20 transition-all">
                <strong className="block text-4xl font-extrabold text-[#ef233c] font-manrope mb-2">WEB</strong>
                <span className="text-xs font-mono text-zinc-400 tracking-wider">AI + CREATIVE SYSTEMS</span>
              </div>
              <div className="p-8 rounded-xl border border-white/10 bg-zinc-900/40 hover:border-white/20 transition-all">
                <strong className="block text-4xl font-extrabold text-white font-manrope mb-2">GROW</strong>
                <span className="text-xs font-mono text-zinc-400 tracking-wider">BUILT AROUND YOUR BUSINESS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Bento Grid (Red Noir Style) */}
        <section className="py-32 px-6 border-t border-white/5 bg-zinc-950/40" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center max-w-3xl mx-auto compact-reveal">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ef233c]"></span>
                02 / OUR SERVICES
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight font-manrope mb-6">
                The Operating System for <br />
                <span className="text-[#ef233c]">Modern Digital Growth</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                A focused mix of strategy, technology, and creative execution — without agency bloat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => {
                const IconComp = svc.icon;
                return (
                  <div 
                    key={svc.no}
                    className="group relative overflow-hidden p-8 border border-white/10 bg-gradient-to-b from-zinc-900/50 to-black hover:border-white/20 transition-all rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`inline-flex p-3 rounded-lg bg-white/5 border border-white/10 ${svc.accent}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-zinc-500">{svc.no}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white font-manrope mb-3 tracking-tight">{svc.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm mb-6">{svc.copy}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                      <span>EXPLORE SERVICE</span>
                      <ArrowRight className="w-4 h-4 text-[#ef233c] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Scroll-Driven Interactive Journey Section */}
        <InteractiveJourneySection />

        {/* Why MARVISCO (Principles Grid) */}
        <section className="py-32 px-6 relative border-t border-white/5" id="why-us">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center max-w-3xl mx-auto compact-reveal">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ef233c]"></span>
                03 / WHY MARVISCO
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-white font-manrope mb-4">More than an agency.</h2>
              <p className="text-zinc-400">We combine the clarity of a consultant, the craft of a creative team, and the speed of modern technology.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 compact-reveal">
              {principles.map((p) => (
                <div key={p.no} className="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#ef233c] font-bold block mb-4">{p.no}</span>
                    <h3 className="text-lg font-bold font-manrope text-white mb-3 tracking-wide">{p.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{p.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-32 px-6 text-center bg-zinc-950/40 relative border-t border-white/5" id="contact">
          <div className="max-w-3xl mx-auto compact-reveal">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ef233c]"></span>
              04 / LET'S CREATE SOMETHING USEFUL
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-manrope mb-6 tracking-tighter text-white">
              Ready to <span className="text-[#ef233c]">Build?</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Tell us what you're building. We'll figure out the digital side.
            </p>

            <form onSubmit={handleSubmit} className="text-left bg-zinc-900/80 border border-white/10 p-8 md:p-10 rounded-2xl max-w-xl mx-auto shadow-2xl space-y-5 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all" 
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Business Name</label>
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all" 
                    placeholder="Acme Co."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">WhatsApp / Phone</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all" 
                    placeholder="+91 99999 99999"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all" 
                    placeholder="hello@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Service Required</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all"
                  >
                    <option>Website</option>
                    <option>E-Commerce</option>
                    <option>Digital Marketing</option>
                    <option>Social Media</option>
                    <option>AI Content & Video</option>
                    <option>Complete Growth Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Budget</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all"
                  >
                    <option>Under ₹10K</option>
                    <option>₹10K–₹25K</option>
                    <option>₹25K–₹50K</option>
                    <option>₹50K+</option>
                    <option>Not Sure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">Message / Vision Details</label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ef233c] transition-all"
                  placeholder="Tell us what you're building..."
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#ef233c] hover:bg-red-700 text-white font-bold rounded-xl py-4 transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2">
                Send Enquiry <ArrowRight size={16} />
              </button>
            </form>

            <div className="flex justify-center mt-6">
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                WhatsApp Us Directly <ArrowRight size={16} />
              </a>
            </div>

            {submitted && (
              <div className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium">
                <Check size={18} /> Thank you! Your enquiry has been received. We will connect shortly.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Red Noir Footer */}
      <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
          <div className="md:col-span-2">
            <Logo footer />
            <p className="text-zinc-500 max-w-xs leading-relaxed text-sm mt-4">
              Pioneering digital growth, high-performance web systems, and AI-driven creative intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6 font-mono">Platform</h4>
            <ul className="space-y-3 text-zinc-400 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6 font-mono">Connect</h4>
            <ul className="space-y-3 text-zinc-400 text-sm">
              <li><a href="mailto:hello@marvisco.agency" className="hover:text-white transition-colors">hello@marvisco.agency</a></li>
              <li><a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/arohance/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/arohance-india/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Giant Text Stroke Watermark */}
        <div className="flex justify-center items-center py-10 opacity-20 pointer-events-none select-none">
          <h1 className="text-[16vw] leading-none font-bold font-manrope tracking-tighter text-stroke">
            MARVISCO
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] uppercase tracking-widest font-mono">
          <p>&copy; 2026 MARVISCO Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.instagram.com/arohance/" target="_blank" rel="noreferrer" className="hover:text-zinc-400">Instagram</a>
            <a href="https://www.linkedin.com/company/arohance-india/" target="_blank" rel="noreferrer" className="hover:text-zinc-400">LinkedIn</a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="hover:text-zinc-400">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/919999999999" 
        target="_blank" 
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Calculator, MapPinned, Route, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    title: "Route Comparison",
    description:
      "Compare travel routes to choose the best path for time, comfort, and flexibility.",
    icon: Route,
    gradient: "from-brand-500 to-indigo-600",
    glow: "rgba(90, 103, 255, 0.4)",
  },
  {
    title: "Expense Calculator",
    description:
      "Estimate and compare travel costs so you can budget smarter before you book.",
    icon: Calculator,
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    title: "Accommodation Finder",
    description:
      "Find stays that fit your preferences and budget with curated travel suggestions.",
    icon: Building2,
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    title: "Popular Indian Destinations",
    description:
      "Browse the most popular destinations and discover where your next trip could begin.",
    icon: MapPinned,
    href: "/destinations",
    gradient: "from-pink-500 to-rose-600",
    glow: "rgba(236, 72, 153, 0.4)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature, index }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const Icon = feature.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white shadow-lg shadow-black/10 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:translate-y-[-6px]"
    >
      {/* Cursor-following glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.glow}, transparent 60%)`,
          }}
        />
      )}

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: feature.glow }}
      />

      <div className="relative z-10">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon size={24} />
        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white">
          {feature.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {feature.description}
        </p>

        {feature.href ? (
          <Link
            to={feature.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-all duration-300 hover:text-white hover:gap-3"
          >
            Explore destinations
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors group-hover:text-slate-400">
            <Sparkles size={14} />
            AI-Powered
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={sectionRef} className="py-12 sm:py-20">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-brand-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl tracking-tight">
            Everything you need to plan{" "}
            <span className="text-gradient">with confidence.</span>
          </h2>
        </div>
        <Link
          to="/plan"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-all hover:text-white hover:gap-3"
        >
          Open the planner
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
import { useRef } from "react";
import { MapPin, Brain, GitCompare, Download, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Input Destination",
    description: "Enter your dream destination, dates, and travel style preferences.",
    icon: MapPin,
    gradient: "from-brand-500 to-indigo-600",
    glow: "rgba(90, 103, 255, 0.3)",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our neural engine analyzes thousands of options in seconds.",
    icon: Brain,
    gradient: "from-purple-500 to-fuchsia-600",
    glow: "rgba(168, 85, 247, 0.3)",
  },
  {
    number: "03",
    title: "Compare Options",
    description: "Review routes, costs, and accommodations side by side.",
    icon: GitCompare,
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.3)",
  },
  {
    number: "04",
    title: "One-Tap Export",
    description: "Export your perfect itinerary and start your adventure.",
    icon: Download,
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.3)",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={sectionRef} className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center"
      >
        <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-brand-400">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl tracking-tight">
          From idea to itinerary in{" "}
          <span className="text-gradient">4 simple steps.</span>
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          No more endless tabs. Let AI do the heavy lifting while you focus on the excitement.
        </p>
      </motion.div>

      <div className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Connecting line (desktop only) */}
        <div className="absolute top-[72px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] hidden xl:block">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-full bg-gradient-to-r from-brand-500/50 via-purple-500/50 to-emerald-500/50 origin-left"
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              custom={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative text-center"
            >
              {/* Icon container */}
              <div className="relative mx-auto mb-8">
                <div
                  className={`relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}
                  style={{
                    boxShadow: `0 8px 30px ${step.glow}`,
                  }}
                >
                  <Icon size={28} />
                </div>
                {/* Pulse ring on hover */}
                <div
                  className="absolute inset-0 mx-auto h-[72px] w-[72px] rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                  style={{
                    boxShadow: `0 0 0 12px ${step.glow}`,
                  }}
                />
              </div>

              {/* Step number */}
              <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-600 mb-3">
                Step {step.number}
              </p>

              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[0.95rem] leading-7 text-slate-400 max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow between steps (mobile/tablet) */}
              {index < steps.length - 1 && (
                <div className="mt-6 flex justify-center text-slate-700 xl:hidden">
                  <ArrowRight size={20} className="rotate-90" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

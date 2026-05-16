import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Map, Navigation, CreditCard, TrendingUp, Globe, Plane, ShieldCheck, Star, Award, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/variants";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import heroImage from "@/assets/hero-bg.png";

const DYNAMIC_TEXTS = ["imagination.", "expectations.", "boundaries."];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % DYNAMIC_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-[3.5rem] border border-white/5 my-4 bg-slate-950"
    >
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/75" />
      <BackgroundGradient />

      <div className="relative z-10 grid w-full items-center gap-16 px-8 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-20 max-w-7xl mx-auto">
        {/* Content Side */}
        <motion.div variants={fadeUp} className="max-w-2xl space-y-10">
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-6 py-3 text-[0.75rem] font-bold uppercase tracking-[0.3em] text-brand-300 backdrop-blur-xl shadow-[0_0_20px_rgba(90,103,255,0.15)]"
          >
            <Sparkles size={16} className="text-brand-400 animate-pulse" />
            Next-Gen AI Trip Architect
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="text-6xl font-black leading-[1.1] text-white sm:text-7xl lg:text-8xl tracking-tight"
          >
            Travel <span className="text-glow italic">beyond</span> <br />
            <span className="text-gradient inline-flex overflow-hidden h-[1.2em] relative min-w-[320px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={textIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="inline-block absolute left-0"
                >
                  {DYNAMIC_TEXTS[textIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible">expectations.</span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-lg leading-relaxed text-slate-300/80 sm:text-xl max-w-lg font-medium"
          >
            Stop searching, start experiencing. Our neural trip engine crafts perfect itineraries tailored to your unique preferences in seconds.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col gap-6 pt-6">
            <div className="flex flex-wrap gap-6">
              <Link
                to="/plan"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-brand-500 px-10 py-5 text-lg font-bold text-white shadow-[0_0_40px_rgba(90,103,255,0.3)] transition-all hover:bg-brand-400 hover:shadow-[0_0_60px_rgba(90,103,255,0.5)] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start My Journey
                  <ArrowRight size={22} className="transition-transform group-hover:translate-x-1.5" />
                </span>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/25 active:scale-95"
              >
                Explore Tech
              </a>
            </div>

            {/* Trust Badges */}
            <motion.div 
              variants={fadeUp} 
              className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-medium mt-2"
            >
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                <Star size={16} className="text-yellow-400" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm hidden sm:flex">
                <Award size={16} className="text-brand-400" />
                <span>#1 AI Planner</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Stats */}
          <motion.div variants={fadeUp} className="flex items-center gap-8 sm:gap-12 pt-8 sm:pt-10 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-3xl font-black text-white">45k+</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold">Journeys Crafted</p>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden`}>
                      <Users size={16} className="text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5 text-yellow-500">
                  {"*".repeat(5)}
                </div>
              </div>
              <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold mt-2">Trusted globally</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Side - Enhanced UI Preview */}
        <motion.div
          variants={scaleIn}
          className="relative hidden lg:block"
        >
          {/* Main Hero Card with Glow Border */}
          <div className="glow-border rounded-[2.5rem] p-[2px]">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/90 p-10 backdrop-blur-3xl border border-white/5">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 shadow-inner">
                    <Globe size={24} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Tokyo Fusion</h3>
                    <p className="text-xs font-bold text-brand-400/80 uppercase tracking-widest">Premium Itinerary</p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 ring-2 ring-brand-500/20" />
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[0.7rem] font-black uppercase tracking-widest text-slate-500">
                    <span>Optimization Score</span>
                    <span className="text-brand-400">Perfect Match</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/5 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 1, ease: "circOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-400 to-purple-500 shadow-[0_0_15px_rgba(90,103,255,0.5)]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="group rounded-3xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:translate-y-[-4px]">
                    <div className="mb-3 text-brand-400 group-hover:scale-110 transition-transform"><CreditCard size={22} /></div>
                    <p className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">Total Value</p>
                    <p className="text-2xl font-black text-white">$4,820</p>
                  </div>
                  <div className="group rounded-3xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:translate-y-[-4px]">
                    <div className="mb-3 text-emerald-400 group-hover:scale-110 transition-transform"><TrendingUp size={22} /></div>
                    <p className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">Smart Savings</p>
                    <p className="text-2xl font-black text-emerald-400">$840</p>
                  </div>
                </div>

                <div className="relative rounded-3xl border border-brand-500/20 bg-brand-500/5 p-6 overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Sparkles size={40} className="text-brand-400" />
                  </div>
                  <p className="mb-2 flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-300">
                    <Navigation size={14} /> AI recommendation
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium">
                    "We've swapped your hotel in Shinjuku for a boutique Ryokan in Asakusa. More authentic, $200 cheaper, and 15% closer to your targets."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Elements */}
          <motion.div 
            className="absolute -right-8 top-12 z-20 animate-float glass-panel flex items-center gap-4 rounded-[1.25rem] p-5 shadow-2xl border-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-lg">
              <Plane size={24} />
            </div>
            <div>
              <p className="text-[0.6rem] font-black text-brand-400 uppercase tracking-widest">Flight Alert</p>
              <p className="text-sm font-bold text-white">Price Drop Detected</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -left-12 bottom-20 z-20 animate-float-delayed glass-panel flex items-center gap-4 rounded-[1.25rem] p-5 shadow-2xl border-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <Map size={24} />
            </div>
            <div>
              <p className="text-[0.6rem] font-black text-emerald-400 uppercase tracking-widest">Route Update</p>
              <p className="text-sm font-bold text-white">Route Optimized</p>
            </div>
          </motion.div>
          
          <div className="absolute -bottom-10 -left-10 z-0 h-40 w-40 rounded-full bg-brand-500/20 blur-[80px]" />
          <div className="absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-purple-500/20 blur-[80px]" />
        </motion.div>
      </div>
    </motion.section>
  );
}


import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { fadeUp, staggerContainer } from "@/animations/variants";

export default function HeroSection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid items-center gap-10 py-16 lg:grid-cols-2"
    >
      <motion.div variants={fadeUp}>
        <p className="mb-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          AI-ready travel intelligence
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Plan smarter journeys with premium AI travel workflows.
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Compare routes, optimize budgets, and discover personalized trips in a modern command center.
        </p>
      </motion.div>
      <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-6">
        <h3 className="mb-4 text-lg font-medium">Search your next itinerary</h3>
        <div className="space-y-3">
          <Input placeholder="Destination (e.g., Bali, Indonesia)" />
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" />
            <Input type="date" />
          </div>
          <Button className="w-full">Generate AI Plan</Button>
        </div>
      </motion.div>
    </motion.section>
  );
}

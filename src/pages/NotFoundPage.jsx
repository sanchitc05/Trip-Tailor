import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("404");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-16 max-w-xl text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-slate-300">This destination is off the map.</p>
      <Link className="mt-4 inline-block" to="/"><Button>Back to home</Button></Link>
    </motion.div>
  );
}

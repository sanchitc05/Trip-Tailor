import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import andamanImage from "@/assets/andaman.png";
import keralaImage from "@/assets/kerala.png";
import ladakhImage from "@/assets/ladakh.png";
import mysoreImage from "@/assets/mysore.png";
import ootyImage from "@/assets/ooty.png";
import shimlaImage from "@/assets/shimla.png";

const destinations = [
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    rating: 4.8,
    tag: "Hill Station",
    image: shimlaImage,
  },
  {
    name: "Andaman",
    state: "Andaman and Nicobar",
    rating: 4.7,
    tag: "Beaches",
    image: andamanImage,
  },
  {
    name: "Kerala",
    state: "Kerala",
    rating: 4.9,
    tag: "Nature",
    image: keralaImage,
  },
  {
    name: "Mysore",
    state: "Karnataka",
    rating: 4.6,
    tag: "Heritage",
    image: mysoreImage,
  },
  {
    name: "Ooty",
    state: "Tamil Nadu",
    rating: 4.5,
    tag: "Tea Country",
    image: ootyImage,
  },
  {
    name: "Ladakh",
    state: "Ladakh",
    rating: 4.8,
    tag: "Road Trip",
    image: ladakhImage,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function DestinationPreviewCard({ destination, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group relative overflow-hidden rounded-3xl"
    >
      <Link to="/destinations" className="block">
        <div className="relative h-[320px] overflow-hidden sm:h-[360px]">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-widest text-white backdrop-blur-xl">
              <TrendingUp size={12} />
              {destination.tag}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-200">
                  {destination.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-300">
                  <MapPin size={14} className="text-brand-400" />
                  <span className="font-medium">{destination.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-white">{destination.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DestinationsPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="destinations" ref={sectionRef} className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-brand-400">
            Trending Now
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover India's most <span className="text-gradient">loved destinations.</span>
          </h2>
        </div>
        <Link
          to="/destinations"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-all hover:gap-3 hover:text-white"
        >
          View all destinations
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <DestinationPreviewCard
            key={destination.name}
            destination={destination}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

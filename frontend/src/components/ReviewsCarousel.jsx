import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import peopleImage from "@/assets/people.jpg";
import userOneImage from "@/assets/user1.webp";
import userTwoImage from "@/assets/user2.webp";

const reviews = [
  {
    name: "Sarah Johnson",
    location: "Mumbai, India",
    image: peopleImage,
    rating: 5,
    text: "Trip Tailor made planning our family vacation to Rajasthan incredibly easy. The AI recommendations were spot-on and saved us hours of research!",
  },
  {
    name: "Rahul Mehta",
    location: "Bangalore, India",
    image: userOneImage,
    rating: 4,
    text: "Great experience using the expense calculator. It helped us budget our Kerala trip perfectly. The accommodation suggestions were excellent too.",
  },
  {
    name: "Emily Chen",
    location: "Delhi, India",
    image: userTwoImage,
    rating: 5,
    text: "The route comparison feature is fantastic! We discovered some hidden gems in Himachal Pradesh that we wouldn't have found otherwise.",
  },
];

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={18}
          className={`transition-all duration-300 ${
            index < value
              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
              : "text-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ReviewsCarousel() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(([current]) => [(current + 1) % reviews.length, 1]);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const paginate = (newDirection) => {
    setActiveIndex(([current]) => [
      (current + newDirection + reviews.length) % reviews.length,
      newDirection,
    ]);
  };

  const activeReview = reviews[activeIndex];

  return (
    <section id="reviews" ref={sectionRef} className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-brand-400">
          Travelers say
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl tracking-tight">
          Real people, real planning{" "}
          <span className="text-gradient">wins.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20"
      >
        {/* Decorative glow for active review */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-brand-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="grid gap-0 lg:grid-cols-[auto_1fr_auto] lg:items-stretch">
          <button
            type="button"
            className="relative z-10 flex h-14 items-center justify-center border-b border-white/10 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white lg:h-full lg:w-16 lg:border-b-0 lg:border-r"
            onClick={() => paginate(-1)}
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="relative min-h-[280px] sm:min-h-[240px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10 lg:p-12"
              >
                <div className="relative">
                  <img
                    src={activeReview.image}
                    alt={activeReview.name}
                    className="h-28 w-28 rounded-3xl object-cover shadow-2xl shadow-black/40 ring-2 ring-white/10 sm:h-36 sm:w-36"
                  />
                  <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                    <Quote size={18} />
                  </div>
                </div>
                <div>
                  <Rating value={activeReview.rating} />
                  <p className="mt-5 text-lg leading-8 text-slate-200 sm:text-xl font-medium">
                    &ldquo;{activeReview.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{activeReview.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{activeReview.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="relative z-10 flex h-14 items-center justify-center border-t border-white/10 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white lg:h-full lg:w-16 lg:border-l lg:border-t-0"
            onClick={() => paginate(1)}
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </motion.div>

      <div className="mt-6 flex justify-center gap-2.5">
        {reviews.map((review, index) => (
          <button
            key={review.name}
            type="button"
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "w-10 bg-brand-400 shadow-[0_0_10px_rgba(90,103,255,0.5)]"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
            onClick={() => setActiveIndex([index, index > activeIndex ? 1 : -1])}
            aria-label={`Show review from ${review.name}`}
          />
        ))}
      </div>
    </section>
  );
}
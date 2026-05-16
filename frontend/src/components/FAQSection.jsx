import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";

const faqs = [
  {
    question: "How does Trip Tailor work?",
    answer:
      "We provide personalized travel options, comparing routes, expenses, and accommodations tailored to your preferences.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, our basic features are completely free. We also offer premium plans for advanced options.",
  },
  {
    question: "Can I customize my travel preferences?",
    answer:
      "Absolutely. You can customize your travel preferences to receive tailored suggestions that best match your needs.",
  },
  {
    question: "What support options are available?",
    answer:
      "We offer 24/7 customer support through chat, email, and phone for all your travel inquiries.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Frequently asked questions.
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <Card key={faq.question} className="border-white/10 bg-white/5 p-0 text-white shadow-lg shadow-black/10">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-base font-medium sm:text-lg">{faq.question}</span>
                <ChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180" : "rotate-0"}`} size={20} />
              </button>
              <div
                className={`grid overflow-hidden px-5 transition-all duration-300 sm:px-6 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"}`}
              >
                <div className="overflow-hidden text-sm leading-6 text-slate-300 sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
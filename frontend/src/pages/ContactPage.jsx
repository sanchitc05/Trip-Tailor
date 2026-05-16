import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { contactApi } from "@/services/contact";
import { contactSchema } from "@/utils/validation";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact");

  const [submitState, setSubmitState] = useState("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values) => {
    setSubmitState("sending");

    try {
      await contactApi.sendMessage(values);
      reset();
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-8 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="space-y-4 border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Contact</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">We would love to hear from you.</h1>
          <p className="text-sm leading-7 text-slate-300">
            Use the form to ask a question, share feedback, or tell us what you want Trip Tailor to support next.
          </p>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p>Response target: 24 hours</p>
            <p>Email: info@triptailor.in</p>
            <p>Location: India</p>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 text-white shadow-lg shadow-black/10">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input placeholder="Your name" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p>}
            </div>
            <div>
              <Input placeholder="Your email" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p>}
            </div>
            <div>
              <textarea
                className="min-h-40 w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400/50"
                placeholder="Your message"
                {...register("message")}
              />
              {errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              {submitState === "sending" ? "Sending..." : "Send Message"}
            </Button>
            {submitState === "sent" && <p className="text-sm text-emerald-300">Message sent. We will get back to you soon.</p>}
            {submitState === "error" && <p className="text-sm text-rose-300">Something went wrong. Please try again.</p>}
          </form>
        </Card>
      </div>
    </div>
  );
}

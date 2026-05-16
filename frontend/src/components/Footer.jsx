import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail, MapPin, Plane, Youtube } from "lucide-react";

const socialLinks = [
  { label: "GitHub", icon: Github },
  { label: "Instagram", icon: Instagram },
  { label: "YouTube", icon: Youtube },
  { label: "LinkedIn", icon: Linkedin },
];

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Destinations", to: "/destinations" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Travel Planner",
    links: [
      { label: "Planner", to: "/plan" },
      { label: "Expenses", to: "/expenses" },
      { label: "Contributors", to: "/contributors" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-white dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <section>
          <h2 className="text-2xl font-semibold">Trip Tailor</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Personalized travel planning made easy - explore destinations and create memories.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="/"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </section>

        {footerLinks.map((group) => (
          <section key={group.title}>
            <h3 className="text-base font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link className="text-sm text-slate-300 transition hover:text-white" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h3 className="text-base font-semibold">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a className="transition hover:text-white" href="mailto:info@triptailor.in">
                info@triptailor.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>India</span>
            </li>
            <li className="flex items-center gap-2">
              <Plane size={16} />
              <span>Plan smarter routes</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-slate-400">
        &copy; 2026 Trip Tailor, All Rights Reserved
      </div>
    </footer>
  );
}

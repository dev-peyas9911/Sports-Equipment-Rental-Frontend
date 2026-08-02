import type { SVGProps } from "react";
import Link from "next/link";
import { Dumbbell, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const shopLinks = [
  { label: "Camping & Hiking", href: "#" },
  { label: "Cycling", href: "#" },
  { label: "Water Sports", href: "#" },
  { label: "Winter Sports", href: "#" },
  { label: "Team Sports", href: "#" },
];

const supportLinks = [
  { label: "How Rentals Work", href: "#" },
  { label: "Delivery & Pickup", href: "#" },
  { label: "Damage & Insurance", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "FAQ", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Locations", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Dumbbell className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                GearGo Rentals
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Rent premium sports and outdoor equipment by the day, week, or
              season. Gear up for your next adventure without the commitment of
              buying.
            </p>

            <form
              className="mt-6 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Enter your email"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="tel:+18005550199"
                  className="transition-colors hover:text-foreground"
                >
                  (800) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@geargo.com"
                  className="transition-colors hover:text-foreground"
                >
                  hello@geargo.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="h-4 w-4 shrink-0 translate-y-0.5"
                  aria-hidden="true"
                />
                <span>123 Trailhead Ave, Boulder, CO</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GearGo Rentals. All rights
            reserved.
          </p>

          <nav aria-label="Social media" className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

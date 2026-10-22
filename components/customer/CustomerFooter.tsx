import Link from "next/link";
import Icon from "@/components/shared/Icon";

const columns: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: "Logistics",
    links: [
      ["Services", "/customer/services"],
      ["Tracking", "/customer/track"],
      ["New Shipment", "/customer/signup"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/customer/about"],
      ["Contact", "/customer/contact"],
      ["Careers", "/customer/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/customer/contact"],
      ["Terms", "/customer/contact"],
      ["Insurance", "/customer/services"],
    ],
  },
];

const socials: Array<{ icon: string; label: string; href: string }> = [
  { icon: "mail", label: "Email us", href: "mailto:hello@imanigifts.com" },
  { icon: "call", label: "Call us", href: "tel:+15550123456" },
  { icon: "location_on", label: "Visit us", href: "/customer/contact" },
];

export default function CustomerFooter() {
  return (
    <footer className="bg-primary text-on-primary px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div className="font-headline text-xl font-bold">Imanigifts</div>
        <p className="text-accent/70 max-w-xs text-sm leading-relaxed">
          A new era of logistics, defined by precision, heritage, and
          sustainable innovation.
        </p>
        <div className="flex gap-4">
          {socials.map(({ icon, label, href }) => {
            const className =
              "text-accent/60 hover:text-white transition-colors";
            return href.startsWith("/") ? (
              <Link key={icon} href={href} aria-label={label} className={className}>
                <Icon name={icon} />
              </Link>
            ) : (
              <a
                key={icon}
                href={href}
                aria-label={label}
                className={className}
              >
                <Icon name={icon} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <div className="font-bold uppercase tracking-widest text-xs">
              {column.title}
            </div>
            <ul className="space-y-2">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-accent/60 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="md:col-span-2 pt-8 border-t border-primary-dark/60 text-accent/50 text-sm">
        © 2026 Imanigifts Logistics. All rights reserved.
      </div>
    </footer>
  );
}

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--border)] bg-[var(--footer-bg)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/lana-logo-transparent.png"
            alt="LANA"
            width={80}
            height={34}
            className="object-contain"
          />
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">
            Elegant pieces, a simple store, and a checkout experience your customers can move through without stress.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
            Contact
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
            <a href="mailto:hello@lanastore.com" className="hover:text-[var(--foreground)]">
              hello@lanastore.com
            </a>
            <a href="tel:+2348000000000" className="hover:text-[var(--foreground)]">
              +234 800 000 0000
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
            Socials
          </h4>
          <div className="mt-4 flex items-center gap-3 text-[var(--muted)]">
            {[
              { label: "Instagram", icon: "IG" },
              { label: "WhatsApp", icon: "WA" },
              { label: "TikTok", icon: "TT" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] px-3 text-xs font-semibold hover:bg-[var(--card-soft)] hover:text-[var(--foreground)]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

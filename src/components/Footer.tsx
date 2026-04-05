export default function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-10">
        <div>
          <h3 className="text-lg font-semibold">LANA</h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/60">
            Premium pieces. Simple shopping. Clean checkout.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Contact
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <a href="mailto:hello@lanastore.com" className="hover:text-white">
              hello@lanastore.com
            </a>
            <a href="tel:+2348000000000" className="hover:text-white">
              +234 800 000 0000
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Socials
          </h4>
          <div className="mt-4 flex items-center gap-3 text-white/80">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#d9a441]/50 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#d9a441]/50 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20 11.8c0 4.7-3.8 8.5-8.5 8.5a8.4 8.4 0 0 1-4.1-1.1L4 20l.9-3.2a8.4 8.4 0 0 1-1.8-5c0-4.7 3.8-8.5 8.5-8.5S20 7.1 20 11.8Z" />
                <path d="M9.4 8.9c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.6 1.5c.1.2.1.4 0 .6l-.5.8c-.1.1-.1.2 0 .4.4.8 1.1 1.5 1.9 2 .2.1.3.1.4 0l.8-.5c.2-.1.4-.1.6 0l1.4.7c.3.1.3.3.3.5v.5c0 .2 0 .4-.4.6-.4.2-1.1.4-1.8.2-1.4-.3-2.7-1-3.8-2.1-1.1-1.1-1.8-2.4-2.1-3.8-.2-.7 0-1.4.2-1.8Z" />
              </svg>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#d9a441]/50 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M14.5 4v7.7a3.7 3.7 0 1 1-3.7-3.7" />
                <path d="M14.5 4c.5 1.5 1.8 2.8 3.5 3.1" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
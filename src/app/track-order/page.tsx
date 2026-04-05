"use client";

import { FormEvent, useState } from "react";

const mockStatuses = [
  "Order received",
  "Confirmed",
  "Sent out",
  "Arrived at destination hub",
  "Delivered",
];

export default function TrackOrderPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [searched, setSearched] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
            Track Order
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Check your order status
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
            Enter your tracking code to see the latest delivery update.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter tracking code"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-[#d9a441]/60"
            />
            <button
              type="submit"
              className="flex min-h-12 items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Track
            </button>
          </form>

          {searched && trackingCode.trim() ? (
            <div className="mt-7 border-t border-white/10 pt-6">
              <div>
                <h2 className="text-xl font-semibold">{trackingCode}</h2>
                <p className="mt-1 text-white/60">Current order progress</p>
              </div>

              <div className="mt-6 space-y-5">
                {mockStatuses.map((status, index) => (
                  <div key={status} className="flex items-start gap-4">
                    <span
                      className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                        index <= 2
                          ? "border-[#d9a441] bg-[#d9a441]"
                          : "border-white/20 bg-white/10"
                      }`}
                    />
                    <div>
                      <h3 className="text-base font-medium">{status}</h3>
                      <p className="mt-1 text-sm text-white/60">
                        {index <= 2 ? "Completed update" : "Pending update"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
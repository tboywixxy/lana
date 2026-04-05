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
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Track Order
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Check your order status
          </h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
            Enter your tracking code to see the latest delivery update.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)] sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter tracking code"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="min-h-12 flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
            />
            <button
              type="submit"
              className="flex min-h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-[var(--background)] hover:opacity-92"
            >
              Track
            </button>
          </form>

          {searched && trackingCode.trim() ? (
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">{trackingCode}</h2>
                <p className="mt-1 text-[var(--muted)]">Current order progress</p>
              </div>

              <div className="mt-6 space-y-5">
                {mockStatuses.map((status, index) => {
                  const done = index <= 2;

                  return (
                    <div key={status} className="flex items-start gap-4">
                      <span
                        className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                          done
                            ? "border-[var(--foreground)] bg-[var(--foreground)]"
                            : "border-[var(--border)] bg-[var(--background)]"
                        }`}
                      />
                      <div>
                        <h3 className="text-base font-medium text-[var(--foreground)]">{status}</h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {done ? "Completed update" : "Pending update"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

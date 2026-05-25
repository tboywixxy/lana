"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearch } from "@/components/SearchContext";
import type { Product } from "@/lib/products";

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function SearchBar({
  products,
  onResults,
}: {
  products: Product[];
  onResults?: (results: Product[]) => void;
}) {
  const { query, setQuery, setFilteredProducts } = useSearch();
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return products;
    }

    const lowerQuery = query.toLowerCase();

    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowerQuery);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(lowerQuery);
      const categoryMatch = product.category.toLowerCase().includes(lowerQuery);

      return nameMatch || descriptionMatch || categoryMatch;
    });
  }, [query, products]);

  useEffect(() => {
    setFilteredProducts(filteredProducts);
    onResults?.(filteredProducts);
  }, [filteredProducts, setFilteredProducts, onResults]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value.trim());
    },
    [setQuery]
  );

  const handleClear = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-[30rem] animate-in fade-in duration-500">
        <input
          type="text"
          placeholder="Search Here ..."
          value={queryInput}
          onChange={(e) => {
            const nextValue = e.target.value;
            setQueryInput(nextValue);

            if (!nextValue.trim()) {
              handleClear();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(queryInput);
            }
          }}
          className="w-full rounded-full border border-[var(--border)] bg-[var(--card-soft)] px-4 py-2.5 pl-11 text-[13px] text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--foreground)] focus:outline-none"
        />
        <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />

        {!queryInput.trim() ? (
          <button
            type="button"
            onClick={() => handleSearch(queryInput)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-dashed border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-[11px] text-[var(--foreground)] hover:opacity-90"
            aria-label="Run search"
          >
            Search
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleClear();
              setQueryInput("");
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-transparent px-2.5 py-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Clear search"
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}

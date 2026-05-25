"use client";

import { createContext, useContext, useState } from "react";
import type { Product } from "@/lib/products";

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filteredProducts,
        setFilteredProducts,
        products,
        setProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

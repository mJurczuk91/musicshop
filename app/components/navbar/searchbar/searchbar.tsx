"use client";

import { useEffect, useState } from "react";
import SearchResult from "./searchResult";
import { Product } from "@/app/(lib)/definitions";
import SearchResultLoading from "./searchResultLoading";

export default function Searchbar() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    if (query.length === 0) return;
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [query]);

  return (
    <div className="w-full max-w-sm">
      <input
        autoComplete="off"
        className="p-2 w-full text-darkcyan-900 border-tangerine-500 bg-white border-2 rounded-md focus:outline-none"
        type="text"
        placeholder="Search our catalogue"
        name="searchField"
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 100);
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.currentTarget.value;

          setQuery(value);
        }}
      />
      <div
        className={`absolute w-full max-w-sm flex flex-col ${
          focus && query ? "visible" : "invisible"
        }`}
      >
        {loading ? (
          <div className="w-full flex items-center">
            <SearchResultLoading />
          </div>
        ) : data.length === 0 ? (
          <SearchResult />
        ) : (
          data.map((product) => (
            <SearchResult key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
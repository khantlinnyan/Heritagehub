"use client";
import React, { useState, useMemo } from "react";
import { Search, XCircle } from "lucide-react";

interface SearchItem {
  id: string | number;
  image?: string;
  title: string;
  description?: string;
  [key: string]: any;
}

interface SearchComponentProps<T extends SearchItem> {
  data: T[];
  onSelect?: (item: T) => void;
  placeholder?: string;
  searchKeys?: string[];
  renderItem?: (item: T) => React.ReactNode;
  className?: string;
}

const SearchComponent = <T extends SearchItem>({
  data,
  onSelect,
  placeholder = "Search...",
  searchKeys = ["title", "description"],
  renderItem,
  className = "",
}: SearchComponentProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => String(item[key]).toLowerCase().includes(term))
    );
  }, [data, searchTerm, searchKeys]);

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleItemClick = (item: T) => {
    onSelect?.(item);
    setSearchTerm("");
    setIsFocused(false);
  };

  const defaultRenderItem = (item: T) => (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
      {item.image && (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        <h4 className="font-medium text-gray-900">{item.title}</h4>
        {item.description && (
          <p className="text-sm text-gray-500">{item.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full text-lg pl-10 pr-8 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded-full focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <XCircle />
          </button>
        )}
      </div>

      {isFocused && filteredItems.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {renderItem ? renderItem(item) : defaultRenderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

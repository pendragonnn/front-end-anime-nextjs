"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />

      <Input
        type="text"
        placeholder="Cari anime..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          pl-10 pr-4 py-2 
          bg-white/5 border-white/20 text-white 
          placeholder:text-gray-400 
          rounded-xl backdrop-blur-sm
          focus-visible:ring-blue-500
        "
      />
    </div>
  );
}

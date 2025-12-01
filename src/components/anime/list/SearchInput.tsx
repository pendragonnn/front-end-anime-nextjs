"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Cari anime..."
      className="border w-full p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

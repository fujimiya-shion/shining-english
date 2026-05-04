"use client";

import { useMemo, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { City } from "@/data/models/city.model";

type CityAutocompleteSelectProps = {
  id: string;
  value: string;
  cityId: number | null;
  options: City[];
  onSearchChange: (value: string) => void;
  onSelect: (city: City) => void;
  placeholder?: string;
  disabled?: boolean;
};

function normalize(text: string): string {
  return text
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CityAutocompleteSelect({
  id,
  value,
  cityId,
  options,
  onSearchChange,
  onSelect,
  placeholder = "Nhập để tìm thành phố",
  disabled,
}: CityAutocompleteSelectProps) {
  const [open, setOpen] = useState(false);
  const filteredOptions = useMemo(() => {
    const keyword = normalize(value.trim());
    if (keyword.length === 0) {
      return options.slice(0, 12);
    }

    return options
      .filter((city) => normalize(city.name ?? "").includes(keyword))
      .slice(0, 12);
  }, [options, value]);

  return (
    <div className="relative space-y-2">
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
        onChange={(event) => {
          const nextValue = event.target.value;
          onSearchChange(nextValue);
          setOpen(true);

          const matched = options.find((city) => city.name === nextValue);
          if (matched) {
            onSelect(matched);
          }
        }}
      />
      {open && filteredOptions.length > 0 ? (
        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-white shadow-lg">
          {filteredOptions.map((city) => (
            <button
              key={city.id ?? city.name}
              type="button"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-[color:var(--sky-70)]"
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(city);
                setOpen(false);
              }}
            >
              {city.name}
            </button>
          ))}
        </div>
      ) : null}
      {!cityId ? <p className="text-xs text-muted-foreground">Chưa chọn thành phố.</p> : null}
    </div>
  );
}

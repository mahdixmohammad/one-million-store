"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { updateRegion } from "@lib/data/cart";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

export default function RegionDropdown({
  countryCode,
  regions,
}: {
  countryCode: string;
  regions: {
    id: string;
    name: string;
    countries?: { iso_2: string; name: string }[];
  }[];
  currentRegion: string;
}) {
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  const options = useMemo(() => {
    return regions
      ?.map((r) =>
        r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.name,
        }))
      )
      .flat()
      .filter(Boolean) as { country: string; region: string; label: string }[];
  }, [regions]);

  // Initialize current to the correct value immediately
  const initialCurrent = useMemo(() => {
    if (countryCode && options) {
      return options.find((o) => o.country === countryCode);
    }
    return undefined;
  }, [options, countryCode]);

  const [current, setCurrent] = useState(initialCurrent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (countryCode && options) {
      const option = options.find((o) => o.country === countryCode);
      setCurrent(option);
    }
  }, [options, countryCode]);

  const handleChange = (option: {
    country: string;
    region: string;
    label: string;
  }) => {
    updateRegion(option.country, currentPath);
  };

  if (!current) return null;

  return (
    <div className="relative w-12">
      <Listbox
        as="span"
        value={current}
        onChange={handleChange}
      >
        {({ open: listboxOpen }) => {
          // Keep state in sync for arrow animation
          useEffect(() => { setOpen(listboxOpen); }, [listboxOpen]);
          return (
            <>
              <ListboxButton className="w-[52px] h-[28px] hidden xsmall:flex items-center border-2 border-black rounded bg-white focus:outline-none focus:ring-0">
                {current && (
                  <ReactCountryFlag
                    svg
                    style={{ width: "33px", height: "33px" }}
                    countryCode={current.country?.toUpperCase() || ""}
                  />
                )}
                <svg
                  className={`ml-[-2px] transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                  width="20"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 8L10 12L14 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ListboxButton>
              <div className="flex relative w-12">
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions className="absolute z-50 bg-white border rounded w-12 mt-1 shadow-lg">
                    {options?.map((o, index) => (
                      <ListboxOption
                        key={o.country}
                        value={o}
                        className="flex items-center justify-center py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <ReactCountryFlag
                          svg
                          style={{ width: "33px", height: "33px" }}
                          countryCode={o.country?.toUpperCase() || ""}
                        />
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            </>
          );
        }}
      </Listbox>
    </div>
  );
}

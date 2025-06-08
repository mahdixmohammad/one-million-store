"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
  translations: {
    sortProducts?: {
      sortBy?: string
      latestArrivals?: string
      priceLowHigh?: string
      priceHighLow?: string
    }
  }
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
  translations,
}: SortProductsProps) => {
  const sortOptions = [
    {
      value: "created_at",
      label: translations?.sortProducts?.latestArrivals || "Latest Arrivals",
    },
    {
      value: "price_asc",
      label: translations?.sortProducts?.priceLowHigh || "Price: Low -> High",
    },
    {
      value: "price_desc",
      label: translations?.sortProducts?.priceHighLow || "Price: High -> Low",
    },
  ]
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={translations?.sortProducts?.sortBy || "Sort by"}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts

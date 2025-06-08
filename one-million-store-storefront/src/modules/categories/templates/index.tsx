import { notFound } from "next/navigation"
import { Suspense } from "react"
import path from "path"
import fs from "fs/promises"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

function getLocalizedCategoryName(name: string, countryCode: string) {
  const locale = countryCode === "iq" ? "ar" : "en"
  const localized = name.split("#").reduce((acc, part) => {
    const [key, value] = part.split(":").map((s) => s.trim())
    if (key && value) acc[key] = value
    return acc
  }, {} as Record<string, string>)
  return localized[locale] || localized["en"] || name
}

async function loadTranslations(locale: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json"
  )
  const fileContents = await fs.readFile(filePath, "utf-8")
  return JSON.parse(fileContents)
}

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  if (!category || !countryCode) notFound()
  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }
  getParents(category)
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        data-testid="sort-by-container"
        translations={translations}
      />
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {getLocalizedCategoryName(parent.name, countryCode)}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">
            {getLocalizedCategoryName(category.name, countryCode)}
          </h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {getLocalizedCategoryName(c.name, countryCode)}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
            translations={translations}
          />
        </Suspense>
      </div>
    </div>
  )
}

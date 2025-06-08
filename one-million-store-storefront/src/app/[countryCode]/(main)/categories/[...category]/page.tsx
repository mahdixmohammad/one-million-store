import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

// Helper for localized category names
function getLocalizedCategoryName(name: string, locale: string) {
  const localized = name.split("#").reduce((acc, part) => {
    const [key, value] = part.split(":").map((s) => s.trim())
    if (key && value) acc[key] = value
    return acc
  }, {} as Record<string, string>)
  return localized[locale] || localized["en"] || name
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)
    const countryCode = params.countryCode
    const locale = countryCode === "iq" ? "ar" : "en"
    const localizedCategoryName = getLocalizedCategoryName(productCategory.name, locale)
    const title = localizedCategoryName + " | 1Million"
    const description = productCategory.description ?? `${title} category.`
    return {
      title: `${title} | 1Million`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const productCategory = await getCategoryByHandle(params.category)
  if (!productCategory) {
    notFound()
  }
  const countryCode = params.countryCode
  const locale = countryCode === "iq" ? "ar" : "en"
  const localizedCategory = {
    ...productCategory,
    name: getLocalizedCategoryName(productCategory.name, locale),
  }
  return (
    <CategoryTemplate
      category={localizedCategory}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}

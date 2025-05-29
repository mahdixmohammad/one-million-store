import { Metadata } from "next"
import path from "path"
import fs from "fs/promises"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import SubscribeForm from "@modules/home/components/subscribe-form"

export const metadata: Metadata = {
  title: "One Million Store",
  description:
    "Discover the world’s best coffee, delivered to your door. Freshly roasted, ethically sourced, and always delicious.",
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

export async function generateStaticParams() {
  // Define the supported country codes
  const supportedCountryCodes = ["us", "iq"]

  // Generate static params for each country code
  return supportedCountryCodes.map((countryCode) => ({ countryCode }))
}

export default async function Home(props: { params?: { countryCode?: string } }) {
  const { params } = props

  // Fallback handling for missing params or countryCode
  if (!params || !params.countryCode) {
    console.error("Missing or invalid params: ", params)
    return null
  }

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    console.error("Missing collections or region for countryCode: ", countryCode)
    return null
  }

  const translations = await loadTranslations(
    countryCode === "iq" ? "ar" : "en"
  )

  return (
    <>
      <Hero translations={translations} />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts translations={translations} collections={collections} region={region} />
      </ul>
      <div className="mt-20 mb-36">
        <SubscribeForm translations={translations} />
      </div>
    </>
  )
}

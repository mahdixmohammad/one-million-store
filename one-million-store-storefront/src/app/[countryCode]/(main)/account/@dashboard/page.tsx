import { Metadata } from "next"
import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import path from "path"
import fs from "fs/promises"

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

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate({ params }: { params: { countryCode: string } }) {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  const countryCode = params?.countryCode || "us"
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} translations={translations} />
}

import { retrieveOrder } from "@lib/data/orders"
import { retrieveRegion } from "@lib/data/regions"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import path from "path"
import fs from "fs/promises"

type Props = {
  params: Promise<{ id: string }>
}
export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  const region = await retrieveRegion(order.region_id || "default-region-id")

  // Load translations for order confirmation page
  // Try to get countryCode from params or fallback to region/country
  let countryCode = "en"
  if (region && region.countries && region.countries[0]?.iso_2 === "iq") {
    countryCode = "ar"
  } else if (props.params && typeof props.params === "object" && "countryCode" in props.params) {
    countryCode = (props.params as any).countryCode
  }
  const locale = countryCode === "iq" ? "ar" : "en"
  const filePath = path.join(process.cwd(), "public", "locales", locale, "common.json")
  const fileContents = await fs.readFile(filePath, "utf-8")
  const translations = JSON.parse(fileContents)
  // Ensure all translation sections are present
  const orderTranslations = {
    ...translations,
    cartTotals: translations.cartTotals,
    cartSummary: translations.cartSummary,
    cartTable: translations.cartTable,
    discountCode: translations.discountCode,
  }

  return <OrderCompletedTemplate order={order} region={region} translations={orderTranslations} />
}

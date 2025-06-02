import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { retrieveRegion } from "@lib/data/regions"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import path from "path"
import fs from "fs/promises"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout({ params }: { params: { countryCode: string } }) {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  const region = await retrieveRegion(cart.region_id || "default-region-id")

  // Load translations
  const locale = params.countryCode === "iq" ? "ar" : "en"
  const filePath = path.join(process.cwd(), "public", "locales", locale, "common.json")
  const fileContents = await fs.readFile(filePath, "utf-8")
  const translations = JSON.parse(fileContents)

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} translations={translations} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} region={region} countryCode={params.countryCode} />
    </div>
  )
}

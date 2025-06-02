import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
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

const CheckoutSummary = async ({
  cart,
  region,
  countryCode,
}: {
  cart: any
  region: any
  countryCode: string
}) => {
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)
  // Ensure all translation sections are present for checkout summary
  const checkoutTranslations = {
    ...translations,
    cartSummary: translations.cartSummary,
    cartTable: translations.cartTable,
    discountCode: translations.discountCode,
    cartTotals: translations.cartTotals,
  }
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          {checkoutTranslations.cartSummary.summary}
        </Heading>
        <Divider className="my-6" />
        <CartTotals totals={cart} translations={checkoutTranslations} />
        <ItemsPreviewTemplate cart={cart} region={region} />
        <div className="my-6">
          <DiscountCode cart={cart} translations={checkoutTranslations} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary

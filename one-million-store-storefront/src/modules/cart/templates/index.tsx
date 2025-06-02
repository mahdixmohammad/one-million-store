import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"
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

const CartTemplate = async ({
  cart,
  customer,
  region,
  countryCode
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  region: HttpTypes.StoreRegion
  countryCode: string
}) => {
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)
  // Ensure all translation sections are present for cart page
  const cartTranslations = {
    ...translations,
    cartSummary: translations.cartSummary,
    cartTable: translations.cartTable,
    emptyCart: translations.emptyCart,
    signInPrompt: translations.signInPrompt,
    discountCode: translations.discountCode,
    cartTotals: translations.cartTotals,
  }
  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
            <div className="flex flex-col bg-white py-6 gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt translations={cartTranslations} />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} region={region} translations={cartTranslations} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-white py-6">
                      <Summary cart={cart as any} translations={cartTranslations} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage translations={cartTranslations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate

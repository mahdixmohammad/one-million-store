"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
  translations: {
    cartSummary: {
      summary: string
      goToCheckout: string
    }
    discountCode: {
      addButton: string
      applyButton: string
      appliedHeading: string
      removeSr: string
    }
    cartTotals: {
      subtotal: string
      discount: string
      shipping: string
      taxes: string
      giftCard: string
      total: string
    }
    [key: string]: any
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart, translations }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        {translations.cartSummary.summary}
      </Heading>
      <DiscountCode cart={cart} translations={translations} />
      <Divider />
      <CartTotals totals={cart} translations={translations} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">{translations.cartSummary.goToCheckout}</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary

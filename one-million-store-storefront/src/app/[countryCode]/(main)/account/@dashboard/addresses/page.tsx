import { Metadata } from "next"
import { notFound } from "next/navigation"
import path from "path"
import fs from "fs/promises"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses({ params }: { params: { countryCode: string } }) {
  const countryCode = params?.countryCode || "us"
  const locale = countryCode === "iq" ? "ar" : "en"
  const filePath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json"
  )
  const fileContents = await fs.readFile(filePath, "utf-8")
  const translations = JSON.parse(fileContents)

  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          {translations?.accountNav?.addresses || "Shipping Addresses"}
        </h1>
        <p className="text-base-regular">
          {translations?.account?.addressesDescription ||
            "View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them available during checkout."}
        </p>
      </div>
      <AddressBook
        customer={customer}
        region={region}
        translations={translations}
      />
    </div>
  )
}

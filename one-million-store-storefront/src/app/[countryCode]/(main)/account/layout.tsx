import React from "react"
import path from "path"
import fs from "fs/promises"
import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: { countryCode: string }
}) {
  const customer = await retrieveCustomer().catch(() => null)
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

  return (
    <AccountLayout
      customer={customer}
      countryCode={countryCode}
      translations={translations}
    >
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}

import React from "react"
import path from "path"
import fs from "fs/promises"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
  countryCode?: string
  translations?: any // Allow parent to provide translations
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

const AccountLayout = async ({
  customer,
  children,
  countryCode = "us",
  translations: parentTranslations,
}: AccountLayoutProps) => {
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = parentTranslations || (await loadTranslations(locale))
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} translations={translations} />}</div>
          <div className="flex-1">
            {/* Pass translations to children if they accept it */}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // If the child is a fragment, inject translations into its children
                if (child.type === React.Fragment && child.props.children) {
                  return React.Children.map(child.props.children, (grandchild) => {
                    if (React.isValidElement(grandchild)) {
                      return React.cloneElement(grandchild as any, { translations })
                    }
                    return grandchild
                  })
                }
                return React.cloneElement(child as any, { translations })
              }
              return child
            })}
          </div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-xl-semi mb-4">
              {translations.account?.gotQuestions || "Got questions?"}
            </h3>
            <span className="txt-medium">
              {translations.account?.faqPrompt ||
                "You can find frequently asked questions and answers on our customer service page."}
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {translations.account?.customerService || "Customer Service"}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout

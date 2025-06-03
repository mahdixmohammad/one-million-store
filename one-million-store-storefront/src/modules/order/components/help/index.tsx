import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = ({ translations }: { translations?: any }) => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">
        {translations?.orderComplete?.needHelp || "Need help?"}
      </Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">
              {translations?.orderComplete?.contact || "Contact"}
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {translations?.orderComplete?.returns || "Returns & Exchanges"}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help

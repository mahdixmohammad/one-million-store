import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
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

export default async function Footer({ countryCode = "us" }: { countryCode?: string }) {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)

  // Helper for localized category names
  function getLocalizedCategoryName(name: string) {
    const localized = name.split("#").reduce((acc, part) => {
      const [key, value] = part.split(":").map((s) => s.trim())
      if (key && value) acc[key] = value
      return acc
    }, {} as Record<string, string>)
    return localized[locale] || localized["en"] || name
  }

  return (
    <footer dir={locale === "ar" ? "rtl" : "ltr"} className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 2xsmall:flex-row items-start justify-between py-16">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-2xl text-black font-bold"
            >
              1Million
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-sm font-bold">
                  {translations?.footer?.shop || "SHOP"}
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }
                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null
                    return (
                      <li
                        className="flex flex-col gap-2 text-sm"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "text-sm text-ui-fg-subtle"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {getLocalizedCategoryName(c.name)}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {getLocalizedCategoryName(child.name)}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-bold">{translations?.footer?.support || "SUPPORT"}</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle text-sm">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    {translations?.footer?.contact || "Contact Us"}
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    {translations?.footer?.privacy || "Privacy Policy"}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/nextjs-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    {translations?.footer?.delivery || "Delivery Policy"}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/nextjs-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    {translations?.footer?.returns || "Return Policy"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-6 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {translations?.footer?.rights || "Future Gulf Company. All rights reserved."}
          </Text>
        </div>
      </div>
    </footer>
  )
}

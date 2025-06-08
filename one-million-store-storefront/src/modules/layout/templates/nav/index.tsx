import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import RegionDropdown from "@modules/layout/components/region-dropdown"

export default async function Nav({ translations, countryCode }: { translations: any; countryCode: string }) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <div dir="ltr" className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu translations={translations} regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-2xl text-black font-bold"
              data-testid="nav-store-link"
            >
              1Million
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <RegionDropdown countryCode={countryCode} regions={regions}/>
            <div className="hidden 2xsmall:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <Image src="/images/user-icon.png" alt="Logo" width={26} height={26}></Image>
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton translations={translations} />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}

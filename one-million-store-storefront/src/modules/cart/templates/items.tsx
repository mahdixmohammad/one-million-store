import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
  region: HttpTypes.StoreRegion
  translations: {
    cartTable: {
      cart: string
      item: string
      quantity: string
      price: string
      total: string
    }
    // Add fallback for other translation sections
    [key: string]: any
  }
}

const ItemsTemplate = ({ cart, region, translations }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">{translations.cartTable.cart}</Heading>
      </div>
      <Table  dir="ltr">
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="!pl-0">{translations.cartTable.item}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{translations.cartTable.quantity}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {translations.cartTable.price}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {translations.cartTable.total}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                      region={region}
                      translations={translations}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate

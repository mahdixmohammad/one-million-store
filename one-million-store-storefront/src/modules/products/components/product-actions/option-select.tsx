import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  regionLang?: string // Add regionLang for deterministic SSR
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  regionLang = "en", // Default to 'en' if not provided
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  // Localize the option title using #en:...#ar:... split logic
  const localized = title.split("#").reduce((acc, part) => {
    const [key, value] = part.split(":").map((s) => s.trim())
    if (key && value) acc[key] = value
    return acc
  }, {} as Record<string, string>)
  const label = localized[regionLang] || localized["en"] || `Select ${title}`

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">{label}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              className={clx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
              key={v}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect

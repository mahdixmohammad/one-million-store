import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = ({ translations }: { translations: { signInPrompt: { heading: string; message: string; button: string } } }) => {
  const { signInPrompt } = translations
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {signInPrompt.heading}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {signInPrompt.message}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {signInPrompt.button}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt

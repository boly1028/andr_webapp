import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: 'lg',
    bg: `dark.50`,
    p:'4'
  },
})

const modalTheme = defineMultiStyleConfig({
  baseStyle,
})

export default modalTheme
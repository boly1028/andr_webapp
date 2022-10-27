import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyleTrack = defineStyle((props) => {
    const { colorScheme: c } = props

    return {
        bg: `gray.500`,
        _checked: {
            bg: `${c}.500`,
        },
        _dark: {
            bg: `gray.500`,
            _checked: {
                bg: `${c}.500`,
            }
        },
    }
})

const baseStyle = definePartsStyle((props) => {
    return {
        // define the part you're going to style
        container: {
            // ...
        },
        thumb: {
            bg: "base.black",
            // let's also provide dark mode alternatives
            _dark: {
                bg: 'base.white',
            },
        },
        track: baseStyleTrack(props)
    }
})


const styles = defineMultiStyleConfig({ baseStyle })
export default styles
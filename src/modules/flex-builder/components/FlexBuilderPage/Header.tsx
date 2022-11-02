import { Box } from '@chakra-ui/react'
import React, {FC} from 'react'

interface HeaderProps{

}
const Header: FC<HeaderProps> = (props) => {
    const {} = props

    return (
        <Box border='1px' borderColor='dark.300' p='4' rounded='lg'>

        </Box>
    )
}
export default Header
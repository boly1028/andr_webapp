// import { CopyButton } from '@/modules/common';
// import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
import ClassifierIcon from '@/theme/icons/classifiers';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Heading, Button, Flex, Icon, IconButton, Menu } from '@chakra-ui/react';
import {
  MenuList,
  MenuItem,
  MenuButton
} from "@/theme/ui-elements";
import { MoreHorizontal } from 'lucide-react';
import { FC } from 'react';
import InlineStat from '../InlineStat';
import NextLink from "next/link";
import styles from './view.module.css'

const ViewTableData = [
  { name: 'ADO', type: 'ADO' },
  { name: 'ADO', type: 'ADO' },
  { name: 'ADO', type: 'ADO' },
  { name: 'ADO', type: 'ADO' },
]
const ViewTable: FC = () => {
  return (
    <Box>
      <Heading fontSize={'20px'} fontWeight='600' pb='8px'>Linked app</Heading>
      <Text fontSize={'14px'} fontWeight='100' color='rgba(255, 255, 255, 0.6)'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus</Text>

      <Flex
        border="1px solid"
        borderColor="dark.300"
        borderRadius="lg"
        mb={4}
        _last={{ mb: 0 }}
        direction="column"
        mt='24px'
      >
        {ViewTableData.map((item, index) => {
          return (
            <Flex
              key={index}
              align="start"
              gap="2"
              className={styles.container}
              p='12px'
            >
              <Box w={8} h={8} borderRadius="lg" mr={6} alignSelf="center">
                <ClassifierIcon adoType={'app'} boxSize={5} />
              </Box>

              <Box flex={1.5}>
                <InlineStat label="Name" value={'abc'} />
              </Box>
              <Box flex={1}>
                <InlineStat label="Type" value={`app`} />
              </Box>
              <Box flex={1}>
                <InlineStat label="Created Date" value={`Mar 12 2023`} />
              </Box>
              <Box flex={1}>
                <InlineStat label="Modified Date" value={`15 mins ago`} />
              </Box>
              <Flex alignItems="center" gap="1" alignSelf="center" w='28' justifyContent='end'>
                <Button
                  onClick={() => ''}
                  colorScheme="primary"
                  rightIcon={<ChevronRightIcon />}
                  fontSize='12px'
                  w='90px'
                  size='xs'
                  className={styles.onHover}
                >
                  View
                </Button>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={IconButton}
                    icon={<Icon as={MoreHorizontal} boxSize={5} />}
                    variant="link"
                    px="0"
                    minW="0"
                    className={styles.onHover}
                  />
                  <MenuList>
                    <NextLink
                      href={''}
                      passHref
                    >
                      <MenuItem>
                        Action-1
                      </MenuItem>
                    </NextLink>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}

export default ViewTable
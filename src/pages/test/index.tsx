import { NextPage } from "next";
import { Layout, PageHeader } from "@/modules/common";
import { BASE_ADOS, MODIFIERS, MODULES, PRIMITIVES, QUERIES, QUERY_RESPONSES } from '@/lib/schema/utils/list'
import ClassifierIcon from '@/theme/icons/classifiers'
import { ChevronDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonProps, Input, InputGroup, InputLeftElement, List, ListItem, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import Link from "next/link";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import _ from "lodash";


const Page: NextPage = ({ }) => {

    return (
        <Layout>
            <PageHeader title="Test Routes" desc={`Test routes meant to provide easy navigation for internal team to test various features`} />
            <VStack alignItems='stretch' mt={10}>
                <Box>
                    <SchemaComponent />
                </Box>

            </VStack>
        </Layout>
    );
};

interface SchemaComponentProps {

}
const SchemaComponent: FC<SchemaComponentProps> = (props) => {
    const { } = props
    const [searchedText, setSearchedText] = useState<string>('');
    const searchHandler = _.debounce((value) => { setSearchedText(value) }, 500)
    return (
        <VStack alignItems='stretch' gap='2' textColor='dark.500'>
            <InputGroup size='lg'>
                <InputLeftElement
                    pointerEvents='none'
                >
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input placeholder='Search' onChange={(e) => { searchHandler(e.target.value.trim()) }} />
            </InputGroup>
            <Text>Schemas</Text>
            <VStack alignItems='stretch'>
                <SchemaComponentItem name="ADOs" list={BASE_ADOS} leftIcon={<ClassifierIcon adoType='app' boxSize='5' />} searchedText={searchedText} />
                <SchemaComponentItem name="Modules" list={MODULES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='5' />} searchedText={searchedText} />
                <SchemaComponentItem name="Modifiers" list={MODIFIERS} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='modifier' boxSize='5' />} searchedText={searchedText} />
                <SchemaComponentItem name="Primitives" list={PRIMITIVES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='primitives' boxSize='5' />} searchedText={searchedText} />
                <SchemaComponentItem name="Queries" list={QUERIES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='query' boxSize='5' />} searchedText={searchedText} />
                <SchemaComponentItem name="Queries Responses" list={QUERY_RESPONSES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='query' boxSize='5' />} searchedText={searchedText} />
            </VStack>
        </VStack>
    )
}


interface SchemaComponentItemProps {
    name: string;
    list: typeof BASE_ADOS
    leftIcon: ButtonProps['leftIcon']
    searchedText: string
}
const SchemaComponentItem: FC<SchemaComponentItemProps> = (props) => {
    const { name, leftIcon, searchedText } = props
    let { list } = props
    if (!!searchedText) {
        list = list.filter((item) => item.title.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase()) && item)
    }
    const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
    const disclosureProps = getDisclosureProps();
    const buttonProps = getButtonProps();


    return (
        <Box p={isOpen ? 2 : 0} border={isOpen ? '1px' : '0px'} rounded='2xl' borderColor='dark.300'>
            <Button
                {...buttonProps}
                variant='ghost'
                leftIcon={leftIcon}
                textAlign='left'
                size='lg'
                w='full'
            >
                {name}
                <Box ml='auto'>
                    {isOpen ? (
                        <CloseIcon boxSize="3" />
                    ) : (
                        <ChevronDownIcon boxSize="5" />
                    )}
                </Box>
            </Button>
            <List {...disclosureProps} p='6' gap={4}>
                {list?.map((ado) => {
                    return (
                        <Link key={ado.source} href={SITE_LINKS.testSchema(ado.source)} passHref>
                            <a target="_blank" rel="noopener noreferrer ">
                                <ListItem cursor='pointer' px='4' py='2' rounded='2xl' _hover={{ bg: 'dark.50' }} as='a' display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Text>
                                        {ado.title}
                                    </Text>
                                    <Text fontSize='sm'>
                                        {ado.source}
                                    </Text>
                                </ListItem>
                            </a>
                        </Link>
                    );
                })}
            </List>
        </Box>
    )
}

export default Page;

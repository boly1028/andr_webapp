import { Layout } from '@/modules/common'
import { Box, Code, Flex, Image, Text, TextProps, VStack } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import React, { FC, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { useHeadsObserver } from './hooks/useHeadObserver'
import { ILinkItemKey } from '@/modules/common/components/sidebar/utils'

const components = {
    img: Image,
    h1: ({ children }: TextProps) => <Text as='h1' fontWeight='extrabold' fontSize='2xl'>{children}</Text>,
    h2: ({ children }: TextProps) => <Text as='h2' fontWeight='black' fontSize='xl'>{children}</Text>,
    h3: ({ children }: TextProps) => <Text as='h3' fontWeight='medium' fontSize='lg'>{children}</Text>,
    p: ({ children }: TextProps) => <Text as='p'>{children}</Text>,
    pre: Code,
    code: Code,
}

interface BlogLayoutProps {
    meta: {
        title: string;
        author: string;
        description?: string;
        tags: string[];
    }
}
const BlogLayout: FC<PropsWithChildren<BlogLayoutProps>> = (props) => {
    const { children, meta } = props
    const [headings, setHeadings] = useState<IHeadingListItem[]>([])
    const contentRef = useRef<HTMLDivElement>(null)

    const headingElems = useMemo(() => {
        return headings.map(heading => heading.elem)
    }, [headings])

    const { activeId } = useHeadsObserver(headingElems)

    useEffect(() => {
        if (contentRef.current) {
            const elems: IHeadingListItem[] = Array.from(contentRef.current.querySelectorAll('h1, h2, h3'))
                .map((elem, idx) => {
                    elem.id = encodeURIComponent(`${elem.innerHTML}-${idx}`)
                    return {
                        text: elem.innerHTML,
                        tag: elem.tagName as IHeadingListItem['tag'],
                        elem: elem,
                        id: elem.id
                    }
                })
            setHeadings(elems)
        }
    }, [contentRef.current])


    return (
        <MDXProvider components={components}>
            <Layout activeLink={ILinkItemKey.LEARN}>
                <Box listStylePosition='inside'>
                    <Text as='h1' fontWeight='extrabold' fontSize='4xl'>
                        {meta.title}
                    </Text>
                    <Flex direction='row' gap='10' alignItems='start' position='relative' mt='10'>
                        <VStack flexShrink={0} w='60' overflow='auto' alignItems='stretch' gap='2' position='sticky' top='4' py='4' bg='dark.100' rounded='xl'>
                            {headings.map((heading) => {
                                const active = activeId === heading.id
                                return (
                                    <Text
                                        key={heading.id}
                                        onClick={() => {
                                            heading.elem.scrollIntoView({ 'behavior': 'smooth' })
                                        }}
                                        cursor='pointer'
                                        px='4'
                                        fontWeight={active ? 'bold' : 'normal'}
                                        borderLeftWidth='4px'
                                        borderColor={active ? 'dark.500' : 'transparent'}
                                    >
                                        {heading.text}
                                    </Text>
                                )
                            })}

                        </VStack>
                        <VStack mb='10' alignItems='stretch' gap='2' ref={contentRef} pl='2' flex='1'>
                            {children}
                        </VStack>
                    </Flex>
                </Box>
            </Layout>
        </MDXProvider>
    )
}

interface IHeadingListItem {
    text: string;
    tag: 'H1' | 'H2' | 'H3',
    elem: Element,
    id: string;
}

export default BlogLayout
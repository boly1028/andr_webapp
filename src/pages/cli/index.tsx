import { CliPage } from '@/modules/cli'
import { Layout } from '@/modules/common'
import { ILinkItemKey } from '@/modules/common/components/Sidebar'
import type { NextPage } from 'next'


const Page: NextPage = () => {

    return (
        <Layout activeLink={ILinkItemKey.CLI}>
            <CliPage />
        </Layout>
    )
}

export default Page
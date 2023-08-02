import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { UserHomePage } from "@/modules/user";
import { NextPage } from "next";
import React, { ReactNode } from "react"

interface Props {
}

const UserHome: NextPage<Props> = (props) => {
    const { } = props;
    return (
        <Layout activeLink={ILinkItemKey.USER}>
            <UserHomePage />
        </Layout>
    )
}

export default UserHome
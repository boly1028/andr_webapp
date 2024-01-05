import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
import { EmbeddableViewPage } from "@/modules/embeddables/components/view";

const EmbeddableView = () => {
    return (
        <Layout activeLink={ILinkItemKey.EMBEDDABLES}>
            <EmbeddableViewPage />
        </Layout>
    )
}

export default EmbeddableView
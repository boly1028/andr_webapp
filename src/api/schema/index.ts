import axios from "axios"


/**
 * Fetch schema from api endpoint based on path provided
 */
interface GetSchemaFromPathArgs {
    path: string;
}
export const getSchemaFromPath = async (data: GetSchemaFromPathArgs) => {
    return axios.get(`/api/flex-builder/search`, {
        params: {
            path: data.path
        }
    }).then(res => res.data as Object)
}
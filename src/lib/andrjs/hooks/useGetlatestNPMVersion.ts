import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetLatestNPMVersion(
) {
    return useQuery(
        ["@andromedajs", "version"],
        () => {
            return axios
                .get(`https://registry.npmjs.org/@andromedaprotocol/andromeda.js`, {
                    headers: {
                        'Accept': 'application/vnd.npm.install-v1+json'
                    }
                })
                .then(res => res.data)
                .then(data => data['dist-tags'].latest as string)
                ;
        }
    );
}
import { useCallback } from "react";
import { useGetEmbeddableApp } from "./useGetEmbeddableApp";

export const useCreateEmbeddableApp = () => {
    const { loading, app, embeddable } = useGetEmbeddableApp();
    const proxy = useCallback(async () => {

    }, [])
    const instantiate = useCallback(async () => {

    }, [])
    const create = useCallback(async () => {
        if (loading) throw new Error('Still loading ADOS. Try again in some time');
        if (embeddable) throw new Error('You already have embeddable app');
        if (app) {
            await proxy()
        } else {
            await instantiate()
        }

    }, [loading, app, embeddable])

}
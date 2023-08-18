import { DEFAULT_CHAIN } from "@/constants/constants";
import { queryChainConfig, queryKeplrConfig } from "@/lib/graphql/functions/chain";
import AndromedaClient from "@andromedaprotocol/andromeda.js";
import { GasPrice } from "@cosmjs/stargate";
import { AccountData, Keplr } from "@keplr-wallet/types";
import { create } from "zustand";

export enum KeplrConnectionStatus {
    Ok,
    NotInstalled,
    Connecting
}

export interface IAndromedaStore {
    client: AndromedaClient;
    chainId: string;
    isConnected: boolean;
    keplr: Keplr | undefined;
    keplrStatus: KeplrConnectionStatus
    accounts: Readonly<AccountData[]>;
    autoconnect: boolean;
    isLoading: boolean;
}

export const useAndromedaStore = create<IAndromedaStore>((set, get) => ({
    client: new AndromedaClient(),
    chainId: DEFAULT_CHAIN,
    isConnected: false,
    keplr: undefined,
    accounts: [],
    keplrStatus: KeplrConnectionStatus.NotInstalled,
    autoconnect: false,
    isLoading: false
}))

export const KEPLR_AUTOCONNECT_KEY = "keplr_autoconnect";

const FIXED_KERNEL_ADDRESSES = [
    'andr1wr5vjl9tyqk0ncz5vxlak846d5c6p9uads90slljxeyzu6xj0a0q0dl6hk'
]

export const connectAndromedaClient = async (chainId?: string) => {
    try {
        window.addEventListener("keplr_keystorechange", keplrKeystoreChange);

        const state = useAndromedaStore.getState();
        if (state.isLoading) return;
        useAndromedaStore.setState({ isLoading: true })

        chainId = chainId || state.chainId

        const keplr = state.keplr;

        if (!keplr) throw new Error("Keplr not instantiated yet");
        try {
            await keplr.enable(chainId)
        } catch (err) {
            const keplrConfig = await queryKeplrConfig(chainId);
            await keplr.experimentalSuggestChain(keplrConfig);
        }

        const config = await queryChainConfig(chainId);
        const signer = await keplr.getOfflineSignerAuto(config.chainId);
        const accounts = await signer.getAccounts();

        const kernelAddr = FIXED_KERNEL_ADDRESSES.find(addr => addr.startsWith(config.addressPrefix)) || config.kernelAddress;
        await state.client.connect(config.chainUrl,
            config.registryAddress,
            kernelAddr,
            config.addressPrefix,
            signer,
            { gasPrice: GasPrice.fromString(config.defaultFee) });
        localStorage.setItem(KEPLR_AUTOCONNECT_KEY, keplr?.mode ?? "extension");

        useAndromedaStore.setState({
            accounts,
            chainId,
            isConnected: true,
            keplr: keplr,
            keplrStatus: KeplrConnectionStatus.Ok,
            autoconnect: true,
            isLoading: false
        })
    } catch (err) {
        useAndromedaStore.setState({ isLoading: false })
        throw err
    }
}

export const disconnectAndromedaClient = () => {
    window.removeEventListener("keplr_keystorechange", keplrKeystoreChange);
    localStorage.removeItem(KEPLR_AUTOCONNECT_KEY);
    useAndromedaStore.setState({
        isConnected: false,
        accounts: [],
        autoconnect: false
    })
}

const keplrKeystoreChange = async () => {
    const state = useAndromedaStore.getState();
    if (state.autoconnect) {
        await connectAndromedaClient()
    }
}

/**
 * https://docs.keplr.app/api/
 * Taken from above
 */
export function initiateKeplr() {
    if (window.keplr) {
        useAndromedaStore.setState({ keplrStatus: KeplrConnectionStatus.Ok, keplr: window.keplr })
        return;
    }
    if (document.readyState === "complete") {
        useAndromedaStore.setState({ keplrStatus: KeplrConnectionStatus.NotInstalled, keplr: undefined })
        return;
    }
    useAndromedaStore.setState({ keplrStatus: KeplrConnectionStatus.Connecting })
    const documentStateChange = (event: Event) => {
        if (
            event.target &&
            (event.target as Document).readyState === "complete"
        ) {
            console.log("Here")
            if (window.keplr) {
                useAndromedaStore.setState({ keplrStatus: KeplrConnectionStatus.Ok, keplr: window.keplr })
            } else {
                useAndromedaStore.setState({ keplrStatus: KeplrConnectionStatus.NotInstalled, keplr: undefined })
            }
            document.removeEventListener("readystatechange", documentStateChange);
        }
    };
    document.addEventListener("readystatechange", documentStateChange);
}
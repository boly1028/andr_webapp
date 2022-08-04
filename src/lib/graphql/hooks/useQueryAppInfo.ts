import {
  QUERY_APP,
  QueryApp,
  QueryAppResponse,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

export interface AppComponent {
  address: string;
  name: string;
  adoType: string;
}

export interface AppInfo {
  name: string;
  contractAddress: string;
  owner: string;
  components: AppComponent[];
}

export interface QueryAppInfoProps
  extends Pick<QueryResult, "loading" | "error"> {
  data?: AppInfo;
}

/**
 * Queries details about an app by contract address, including its components, name, contract address and owner
 * @param contractAddress
 * @returns
 */
export default function useQueryAppInfo(
  contractAddress: string,
): QueryAppInfoProps {
  const { data, loading, error } = useQuery<QueryAppResponse, QueryApp>(
    gql`
      ${QUERY_APP}
    `,
    { variables: { contractAddress } },
  );

  const appInfo = useMemo(() => {
    if (data) {
      const { app } = data;
      //Map two query response arrays to one single array for simplicity
      const components = app.addresses.map(({ address, name }) => {
        const compType = app.components.find(
          ({ name: _name }) => name === _name,
        );
        return {
          address,
          name,
          adoType: compType ? compType.ado_type : "",
        };
      });

      const _appInfo: AppInfo = {
        contractAddress,
        components,
        name: app.config.name,
        owner: app.config.owner,
      };

      return _appInfo
    }
  }, [data, contractAddress]);

  return {
    data: appInfo,
    loading,
    error,
  };
}

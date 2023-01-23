import { IAdoType } from "@/lib/schema/types";
import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";


/**
 * Get Andr Result for given ADO. TODO: Create a gql query for ADO irrespective of ADO type from which we can query
 * andr result based on address directly
 * @param adoType
 * @param address
 * @returns
 */
export default function useQueryAndrQuery(
  adoType: IAdoType,
  address: string
) {

  const QUERY = useMemo(() => {
    return createAndrQuery(adoType)
  }, [adoType])

  const { loading, data, error } = useQuery(
    gql`
      ${QUERY}
    `,
    {
      variables: { address },
    });

    console.log(error, QUERY)

  return {
    loading,
    error,
    data: data?.ADO?.[adoType]?.andr as IAndrResult | undefined,
  };
}

interface IAndrResult {
  version: string;
  blockHeightUponCreation: string;
  owner: string;
  type: IAdoType;
  creator: string;
  address: string;
  originalPublisher: string;
}

const createAndrQuery = (adoType: string) => {
  adoType = adoType.replaceAll('-', '_');
  return `
    query QUERY_ANDR($address: String!) {
      ADO{
        ${adoType}(address: $address) {
          andr{
            version,
            blockHeightUponCreation,
            owner,
            type,
            address,
            creator,
            originalPublisher
          }
        }
      }
    }
  `
}

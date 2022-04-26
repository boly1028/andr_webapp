import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useContracts } from "@/modules/common";
import { createBuilderMsgs } from "@/modules/flex-builder";

type UseBuilderOpts = {
  data: any;
};

export const useBuilder = ({ data }: UseBuilderOpts) => {
  const address = useAddress();
  const { builder } = useContracts();

  const msgs = useMemo(() => {
    if (data == null || address == null) {
      return null;
    }

    return createBuilderMsgs({ contract: builder, data }, address);
  }, [address, builder, data]);

  return {
    msgs,
  };
};

export default useBuilder;

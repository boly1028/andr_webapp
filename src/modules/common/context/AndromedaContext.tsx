import { createContext, ReactNode, useCallback, useContext } from "react";

import { TransactionModal, usePostTx, PostTx } from "@/modules/common";

type AndromedaContextData = {
  postTx: PostTx;
};

const AndromedaContext = createContext<AndromedaContextData>(
  {} as AndromedaContextData,
);

const useAndromedaContext = () => useContext(AndromedaContext);

const AndromedaContextProvider = ({ children }: { children: ReactNode }) => {
  //TODO: REPLACE WITH ANDROMEDA CLIENT
  // const postTx = usePostTx();
  // const { reset: resetTxState } = postTx;

  // const onTransactionModalClose = useCallback(() => {
  //   resetTxState();
  // }, [resetTxState]);

  // const providerState: AndromedaContextData = {
  //   postTx,
  // };

  // return (
  //   <AndromedaContext.Provider value={providerState}>
  //     {/*Global Tx State*/}
  //     <TransactionModal postTx={postTx} onClose={onTransactionModalClose} />
  //     {children}
  //   </AndromedaContext.Provider>
  // );
  return <>{children}</>;
};

export { useAndromedaContext, AndromedaContextProvider };

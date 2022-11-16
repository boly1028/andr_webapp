import { cloneDeep } from "@apollo/client/utilities";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import { DisclaimerModalProps } from "../../types";
import { setTermAccepted } from "./utils";

const DisclaimerModal: FC<DisclaimerModalProps> = ({ onAccept }) => {
  const [terms, setTerms] = useState(
    TERMS.map((t) => ({ text: t, selected: false })),
  );

  const { close } = useGlobalModalContext();

  const handleAccept = () => {
    setTermAccepted();
    onAccept();
  };

  const allSelected = !terms.some((t) => !t.selected);
  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg">
        DISCLAIMER
      </Text>
      <Text fontSize="xs" textStyle="light" color="dark.500" mt="2">
        Please check the boxes below to confirm your agreement to the Andromeda
        Protocol&nbsp;
        <Link textDecoration="underline">Terms and Conditions</Link>
      </Text>
      <Divider mt="4" />
      <VStack
        alignItems="start"
        overflow="auto"
        maxH="96"
        py="4"
        pl="2"
        pr="4"
        textAlign="justify"
      >
        {terms.map((t, idx) => (
          <HStack key={idx} alignItems="start" gap="2">
            <Checkbox
              isChecked={t.selected}
              onChange={(e) => {
                const checked = e.target.checked;
                setTerms((prev) => {
                  const clone = cloneDeep(prev);
                  clone[idx].selected = checked;
                  return clone;
                });
              }}
              mt="1"
            />
            <Text fontSize="xs" fontWeight="light">
              {t.text}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Divider mb="4" />
      <HStack alignItems="start" gap="2">
        <Checkbox
          isChecked={allSelected}
          onChange={(e) => {
            const checked = e.target.checked;
            setTerms((prev) => {
              const clone = cloneDeep(prev);
              return clone.map((t) => ({ ...t, selected: checked }));
            });
          }}
          mt="1"
        />
        <Text fontSize="xs" fontWeight="light">
          I understand and agree with the risks and disclaimers of using
          Andromeda Protocol
        </Text>
      </HStack>

      <HStack justifyContent="end" mt="2">
        <Button onClick={close} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleAccept}
          disabled={!allSelected}
          colorScheme="primary"
          variant="solid"
        >
          Accept
        </Button>
      </HStack>
    </Box>
  );
};

const TERMS = [
  `I have read and understood, and do hereby agree to be legally bound as a “User” under theTerms, including all future amendments thereto. Such agreement is irrevocable and will apply toall of my uses of the Site without me providing confirmation in each specific instance.`,
  `I acknowledge and agree that the Site solely provides information about data on blockchainsin the Cosmos ecosystem. I accept that the Site operators have no custody over my funds,ability or duty to transact on my behalf, or power to reverse my transactions. The Site operatorsdo not endorse or provide any warranty with respect to any tokens.`,
  `Andromeda Protocol is a decentralized blockchain where individuals or communities can usethe platform to build smart contracts, create their own templates to use or sell in themarketplace, create tokens & ADO’s, distribute digital assets, etc. These are all done byinstantiating, invoking, and querying smart contracts.`,
  `Andromeda Protocol is made up of free, public, and open-source software that is built usingthe CosmosSDK / CosmWasm tech stack. Anyone can use our platform to build smartcontracts, create their own templates to use or sell in the marketplace, create tokens & ADO’s,distribute digital assets, etc. As a result, it is not possible to ensure all aspects of the platformare safe & secure to use. As with any experimental technology you are using it at your own risk.`,
  `AS DESCRIBED IN THE DISCLAIMER, ANDROMEDA PROTOCOL IS PROVIDED “AS IS”,AT YOUR OWN RISK, AND WITHOUT ANY WARRANTIES OF ANY KIND. No developer orentity involved in creating Andromeda Protocol will be liable for any claims or damageswhatsoever associated with your use, inability to use, or your interaction with other users of theAndromeda Protocol, including any direct, indirect, incidental, special, exemplary, punitive orconsequential damages, or loss of profits, tokens, or anything else.`,
];

export default DisclaimerModal;

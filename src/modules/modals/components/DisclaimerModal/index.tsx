import { cloneDeep } from "@apollo/client/utilities";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
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
    onAccept();
  };

  const allSelected = !terms.some((t) => !t.selected);
  return (
    <Box>
      <Text textStyle="main-xs-regular" color='content.medium'>
        Please check the boxes below to confirm your agreement to the Andromeda
        Protocol&nbsp;
        <Link target='_blank' href="https://github.com/andromedaprotocol/andromeda-core/blob/development/LICENSE/LICENSE.md" textDecoration="underline">Terms and Conditions</Link>
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
        sx={{
          "&": {
            scrollbarColor: "#35353A transparent",
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#35353A'
          }
        }}
      >
        {terms.map((t, idx) => (
          <FormControl as={HStack} key={idx} alignItems="start" gap="3">
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
              mt='1'
            />
            <Text as={FormLabel} textStyle='main-xs-regular'>
              {t.text}
            </Text>
          </FormControl>
        ))}
      </VStack>
      <Divider mb="4" />
      <FormControl as={HStack} alignItems="start" gap="3">
        <Checkbox
          isChecked={allSelected}
          onChange={(e) => {
            const checked = e.target.checked;
            setTerms((prev) => {
              const clone = cloneDeep(prev);
              return clone.map((t) => ({ ...t, selected: checked }));
            });
          }}
          mt='1'
        />
        <Text as={FormLabel} textStyle='main-xs-regular'>
          I understand and agree with the risks and disclaimers of using Andromeda Protocol
        </Text>
      </FormControl>

      <HStack justifyContent="end" mt="2">
        <Button onClick={close} variant="theme-outline">
          Cancel
        </Button>
        <Button
          onClick={handleAccept}
          isDisabled={!allSelected}
          variant="theme-primary"
        >
          Accept
        </Button>
      </HStack>
    </Box>
  );
};

const TERMS = [
  `I have read and understood, and do hereby agree to be legally bound as a “User” under the Terms, including all future amendments thereto. Such agreement is irrevocable and will apply to all of my uses of the Site without me providing confirmation in each specific instance.`,
  `I acknowledge and agree that the Site solely provides information about data on blockchains in the Cosmos ecosystem. I accept that the Site operators have no custody over my funds, ability or duty to transact on my behalf, or power to reverse my transactions. The Site operators do not endorse or provide any warranty with respect to any tokens.`,
  `Andromeda Protocol is a decentralized blockchain where individuals or communities can use the platform to build smart contracts, create their own templates to use or sell in the marketplace, create tokens & ADO’s, distribute digital assets, etc. These are all done by instantiating, invoking, and querying smart contracts.`,
  `Andromeda Protocol is made up of free, public, and open-source software that is built using the CosmosSDK / CosmWasm tech stack. Anyone can use our platform to build smart contracts, create their own templates to use or sell in the marketplace, create tokens & ADO’s, distribute digital assets, etc. As a result, it is not possible to ensure all aspects of the platform are safe & secure to use.  As with any experimental technology you are using it at your own risk.`,
  `AS DESCRIBED IN THE DISCLAIMER, ANDROMEDA PROTOCOL IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT ANY WARRANTIES OF ANY KIND. No developer or entity involved in creating Andromeda Protocol will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the Andromeda Protocol, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, tokens, or anything else.`,
];

export default DisclaimerModal;

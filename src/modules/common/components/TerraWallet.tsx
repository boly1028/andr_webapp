import React, { FC } from "react";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import {
  Input,
  Flex,
  Box,
  Text,
  HStack,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Image,
  VStack,
} from "@chakra-ui/react";

import { WalletModal } from "@/modules/modals";
import {
  truncate,
  ProfilIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  TerraIcon,
  PlusIcon,
} from "@/modules/common";

const TOKENS = [
  {
    logo: "https://whitelist.anchorprotocol.com/logo/ANC.png",
    name: "ANC",
  },
  {
    logo: "https://app.astroport.fi/tokens/astro.png",
    name: "ASTRO",
  },
];

interface HoldingItemProps {
  logo: string;
  name: string;
}

const HoldingItem = ({ logo, name }: HoldingItemProps) => {
  return (
    <Flex justify="space-between" align="center" w="full">
      <HStack>
        <Image src={logo} boxSize={8} alt="Logo" />
        <Text fontWeight={500}>{name}</Text>
      </HStack>
      <Text color="gray.500">0.00</Text>
    </Flex>
  );
};

const TerraWalletConnected = () => {
  const { disconnect } = useWallet();
  const wallet = useConnectedWallet();
  const address = truncate(wallet?.terraAddress);

  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              h="auto"
              borderRadius="xl"
              p={2}
              borderColor={isOpen ? "primary.600" : "gray.300"}
              _focus={{
                outline: "none",
              }}
            >
              <HStack mr={16}>
                <ProfilIcon boxSize={8} />
                <Text>{address}</Text>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3}>
                <TerraIcon
                  boxSize={9}
                  p={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                />
                <Text fontWeight={600} color="gray.700">
                  Terra Network
                </Text>
              </HStack>
              <Input
                value={wallet?.terraAddress}
                mb={2}
                p={2}
                color="gray.700"
                fontSize="sm"
              />
              <HStack mb={2}>
                <Button
                  leftIcon={<CopyIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
                >
                  Copy address
                </Button>
                <Button
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
                >
                  Explorer
                </Button>
              </HStack>
              <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={2}
                mb={2}
              >
                <VStack spacing={2} align="flex-start">
                  {TOKENS.map(({ logo, name }) => {
                    return <HoldingItem key={name} logo={logo} name={name} />;
                  })}
                </VStack>
              </Box>
              <Button
                leftIcon={<LogOutIcon boxSize={4} />}
                variant="outline"
                onClick={disconnect}
                isFullWidth
                fontWeight={500}
                color="gray.700"
              >
                Disconnect
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();

  if (status === WalletStatus.WALLET_CONNECTED) {
    return <TerraWalletConnected />;
  }

  return (
    <>
      <Button
        leftIcon={<PlusIcon boxSize={4} />}
        colorScheme="purple"
        onClick={onOpen}
        size="lg"
      >
        Connect Wallet
      </Button>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;

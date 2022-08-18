import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

import { useDisconnect, useWallet } from "@/lib/wallet";
import {
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  PlusIcon,
  ProfileIcon,
  truncate,
  CopyButton,
} from "@/modules/common";
import useWalletModal from "@/modules/modals/hooks/useWalletModal";
import { MINTSCAN_TESTNET_BASEURL } from "@/constants/constants";

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

const WalletConnected = () => {
  const wallet = useWallet();
  const disconnect = useDisconnect();
  const address = truncate(wallet?.address);

  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="lg"
              borderColor={isOpen ? "primary.600" : "gray.300"}
            >
              <HStack mr={8}>
                <ProfileIcon boxSize={8} />
                <Text>{address}</Text>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3}>
                {/* <Icon
                  boxSize={9}
                  p={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                /> */}
                <Text fontWeight={600} color="gray.700">
                  {chainId}
                </Text>
              </HStack>
              <Input
                value={wallet ? wallet.address : ""}
                mb={2}
                p={2}
                color="gray.700"
                fontSize="sm"
                readOnly
              />
              <HStack mb={2}>
                <CopyButton
                  leftIcon={<CopyIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
                  text={wallet?.address}
                >
                  Copy address
                </CopyButton>
                <Button
                  as="a"
                  href={`${MINTSCAN_TESTNET_BASEURL}/account/${wallet?.address}`}
                  target="_blank"
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  isFullWidth
                  fontWeight={500}
                  color="gray.700"
                >
                  Explorer
                </Button>
              </HStack>
              {/* <Box
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
              </Box> */}
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

const chainId = "uni-3";

const Wallet: FC = () => {
  const account = useWallet();
  const onOpen = useWalletModal();

  if (account) {
    return <WalletConnected />;
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
    </>
  );
};

export default Wallet;

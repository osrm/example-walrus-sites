// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId, fromHEX } from "@mysten/sui.js/utils";
import {
    Box,
    Container,
    Flex,
    Text,
    Heading,
    Link,
    Em,
    Separator,
    Button,
    Strong,
} from "@radix-ui/themes";
import { useState } from "react";
import { ArrowRightIcon, CopyIcon } from "@radix-ui/react-icons";
import { MintFlatlander } from "./MintFlatlander";
import baseX from "base-x";

const BASE36 = "0123456789abcdefghijklmnopqrstuvwxyz";
const SITE_OBJECT_ID = "0xd20b90149409ba5d005d4a2cd981db9494bc3cdb2f04c47ca1af98dd8f71610a";
const FLATLAND_LINK = "https://en.wikipedia.org/wiki/Flatland";
const b36 = baseX(BASE36);

function explorerLink(id: string): string {
    return "https://suiscan.xyz/testnet/object/" + id;
}

function flatlanderLink(id: string): string {
    return "https://" + b36.encode(fromHEX(id.substring(2))) + ".walrus.site";
}

function App() {
    const currentAccount = useCurrentAccount();
    const [flatlanderId, setFlatlander] = useState(() => {
        const hash = window.location.hash.slice(1);
        return isValidSuiObjectId(hash) ? hash : null;
    });

    return (
        <>
            <Flex
                position="sticky"
                px="4"
                py="2"
                justify="between"
                style={{ borderBottom: "1px solid var(--gray-a2)" }}
            >
                <Box>
                    <ConnectButton />
                </Box>
            </Flex>
            <Container size="2">
                <Container size="1" mt="5" pt="2" px="4" style={{ minHeight: 500 }}>
                    <Flex direction="column" justify="center" gap="1">
                        <Text size="6">Welcome to</Text>
                        <Heading size="9">
                            <Em>Flatland</Em>
                        </Heading>
                        <Text size="5">a demo NFT project to showcase Walrus Sites</Text>
                    </Flex>
                    <Flex mt="9">
                        <Text>
                            <Em>Flatland</Em> is an <Link href={FLATLAND_LINK}>imaginary</Link>{" "}
                            world with only three dimensions—width, length, and time—without any
                            height. Its inhabitants, the <Em>Flatlanders</Em>, have evolved to live
                            in this flat world, and thus resemble 2D geometric shapes. What
                            distinguishes them from each other is only their{" "}
                            <Em>number of sides</Em>, and their <Em>color</Em>.
                        </Text>
                    </Flex>
                    <Separator my="6" size="4" />
                    <Flex direction={{ initial: "column", xs: "row" }} justify="between">
                        <Flex direction="column">
                            <Flex>
                                <Text>
                                    Join <Em>Flatland:</Em>
                                </Text>
                            </Flex>
                            <Flex>
                                {currentAccount ? (
                                    <MintFlatlander
                                        onCreated={(id) => {
                                            window.location.hash = id;
                                            setFlatlander(id);
                                        }}
                                    />
                                ) : (
                                    <Text>
                                        <Strong>
                                            Please connect your Testnet wallet (button on the top
                                            left)
                                        </Strong>
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                        {flatlanderId ? (
                            <Flex
                                direction="column"
                                align={{ initial: "start", xs: "end" }}
                                gap="2"
                            >
                                <Text>
                                    Minted a new <Em>Flatlander!</Em> (
                                    {flatlanderId.substring(0, 8)}
                                    {"... "})
                                </Text>

                                <Flex direction="row" gap="2" pb="0">
                                    <Link href={flatlanderLink(flatlanderId)}>
                                        <Button variant="solid">
                                            View the Flatlander site! <ArrowRightIcon />
                                        </Button>
                                    </Link>
                                    <Box pt="2">
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    flatlanderLink(flatlanderId),
                                                );
                                            }}
                                        >
                                            <CopyIcon />
                                        </Button>
                                    </Box>
                                </Flex>

                                <Flex direction="column">
                                    <Flex direction="row" gap="3">
                                        <Link href={explorerLink(flatlanderId)}>
                                            <Button variant="outline">
                                                Explorer <ArrowRightIcon />
                                            </Button>
                                        </Link>
                                        <Box pt="2">
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        explorerLink(flatlanderId),
                                                    );
                                                }}
                                            >
                                                <CopyIcon />
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Flex>
                        ) : (
                            <></>
                        )}
                    </Flex>
                    <Separator my="6" size="4" />
                    <Flex mb="5" direction="row">
                        <Box>
                            <Heading size="5" mb="4">
                                What's cool about this?
                            </Heading>
                        </Box>
                        <Box>
                            <Text>
                                <ul>
                                    <li>
                                        First and foremost, this site hosted on <Em>Sui</Em>, and
                                        all the resources it needs are loaded from <Em>Walrus</Em>.
                                        You can see the Sui object corresponding to this site{" "}
                                        <Link href={explorerLink(SITE_OBJECT_ID)}>
                                            in the explorer.
                                        </Link>
                                    </li>
                                    <li>
                                        These resources are all fetched and loaded by custom
                                        software in your browser, without the need to use gateways
                                        (as similar IPFS- or Arweave-based solutions do).
                                    </li>
                                    <li>
                                        Finally, there is a <Em>unique site</Em> for each NFT, tied
                                        to its object ID. The site is styled based on the NFT's
                                        inner fields (in this case, the color and shape). This
                                        feature could be great to create new experiences, where the
                                        user can view and interact with the NFT not only through the
                                        wallet, but also through a dedicated site.
                                    </li>
                                </ul>
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Container>
        </>
    );
}

export default App;

import * as web3 from "@solana/web3.js";
import { Idl, Program } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";

import config from "../../config";
import DidRegistryInterface from "../../program/interfaces/DidRegistryInterface.json";
import { useCallback } from "react";

export function useDid() {
  const { wallet, publicKey } = useWallet();

  const createDid = useCallback(async () => {
    try {
      if (publicKey) {
        const did = `did:sol:${publicKey}`;
        const didDocument = {
          "@context": "https://www.w3.org/ns/did/v1",
          id: did,
          verificationMethod: [
            {
              id: `${did}#phantom`,
              type: "Ed25519VerificationKey2020",
              controller: `${did}`,
              publicKeyBase58: publicKey.toBase58(),
            },
          ],
          authentication: [`${did}#phantom`],
          assertionMethod: [`${did}#phantom`],
          service: [
            {
              id: `${did}#service-1`,
              type: "MessagingService",
              serviceEndpoint: "https://example.com/messages/123456",
            },
          ],
        };
        console.log({
          didDocument,
        });
      }
    } catch (error) {
      console.error("Failed to create DID:", error);
    }
  }, [publicKey]);

  async function registerDid(did: string, didDocument: string) {
    const programId = new web3.PublicKey(config.PROGRAM_ID);
    const programDataAccount = new web3.PublicKey(config.DATA_ACCOUNT_PUBKEY);
    const transaction = new web3.Transaction();

    const program = new Program(
      JSON.parse(JSON.stringify(DidRegistryInterface)),
      programId,
    ) as Program<Idl>;

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: programDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    // program.methods.registerDid(did, didDocument, {
    //   accounts: {
    //     didEntry,
    //     owner: provider.wallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   },
    // });
  }

  // async function getDidDocument(did) {
  //   const [didEntry, _] = await PublicKey.findProgramAddress(
  //     [Buffer.from(did)],
  //     program.programId,
  //   );
  //
  //   const didData = await program.account.didEntry.fetch(didEntry);
  //   return didData.didDocument;
  // }

  return {
    registerDid,
    createDid,
  };
}

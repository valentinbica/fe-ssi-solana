import { Idl, Program } from '@coral-xyz/anchor';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { notification } from 'antd';

import { useCallback } from 'react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import DidRegistryInterface from '../../program/interfaces/did_registry.json';
import { useProvider } from '@/components/Provider/useProvider';

export function useDid() {
  const { publicKey, signTransaction, sendTransaction, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { getProvider } = useProvider();

  const registerDid = useCallback(
    async (did: string, didDocument: string) => {
      const provider = getProvider();

      if (!provider || !publicKey || !anchorWallet) {
        return;
      }

      const program = new Program(
        DidRegistryInterface as Idl,
        provider
      ) as Program<Idl>;

      if (wallet?.adapter?.publicKey?.toBuffer()) {
        const [didEntryPda, bump] = PublicKey.findProgramAddressSync(
          [Buffer.from('did_entry'), wallet?.adapter.publicKey?.toBuffer()],
          program.programId
        );

        await program.methods
          .registerDid(did, didDocument, bump)
          .accounts({
            didEntry: didEntryPda,
            owner: provider.publicKey || '',
            system_program: SystemProgram.programId,
          })
          .rpc();
        notification.success({
          message: 'Did registered successfully',
          placement: 'bottomRight',
        });
      }
    },
    [anchorWallet, getProvider, publicKey, wallet?.adapter.publicKey]
  );

  const createDid = useCallback(async () => {
    try {
      if (publicKey) {
        const did = `did:sol:${publicKey.toBase58()}`;
        const didDocument = {
          '@context': 'https://www.w3.org/ns/did/v1',
          id: did,
          verificationMethod: [
            {
              id: `${did}#phantom`,
              type: 'Ed25519VerificationKey2020',
              controller: `${did}`,
              publicKeyBase58: publicKey.toBase58(),
            },
          ],
          authentication: [`${did}#phantom`],
          assertionMethod: [`${did}#phantom`],
          service: [
            {
              id: `${did}#service-1`,
              type: 'MessagingService',
              serviceEndpoint: `https://fe-ssi-solana.vercel.app/api/did-registry/${did}`,
            },
          ],
        };
        await registerDid(did, JSON.stringify(didDocument));
      }
    } catch (error) {
      notification.error({
        message: 'Failed to create DID',
        description: error?.toString(),
        duration: 10,
      });
    }
  }, [publicKey, registerDid]);

  const getDidDocument = useCallback(async () => {
    const provider = getProvider();

    if (!provider) {
      return;
    }

    const program = new Program(
      DidRegistryInterface as Idl,
      provider
    ) as Program<Idl>;

    if (wallet?.adapter?.publicKey?.toBuffer()) {
      const [didEntryPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('did_entry'), wallet?.adapter.publicKey?.toBuffer()],
        program.programId
      );
      console.log({
        didEntryPda: didEntryPda.toString(),
      });
      // @ts-ignore
      return program.account.didEntry.fetch(didEntryPda);
    }
    return null;
  }, [getProvider, wallet?.adapter.publicKey]);

  return {
    registerDid,
    createDid,
    getDidDocument,
  };
}

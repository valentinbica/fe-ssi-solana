import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { Idl, Program } from '@coral-xyz/anchor';
import { useProvider } from '@/components/Provider/useProvider';
import VcRegistryInterface from '@/program/interfaces/vc_registry.json';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { notification } from 'antd';
import bs58 from 'bs58';

export function useVc() {
  const { publicKey, signTransaction, signMessage, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { getProvider } = useProvider();

  const getVc = useCallback(
    async (issuerDid: string, did: string, type: 'diploma' | 'eDoc') => {
      const types = {
        diploma: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
        eDoc: {
          type: 'EmploymentDoc',
          name: 'Employment Document',
        },
      };
      const vc = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://www.w3.org/2018/credentials/examples/v1',
        ],
        id: `https://fe-ssi-solana.vercel.app/api/credential/${type}/${did}`,
        type: ['VerifiableCredential', type],
        issuer: {
          id: issuerDid,
        },
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: did,
          degree: {
            type: types[type].type,
            name: types[type].name,
          },
        },
      };

      const vcDataString = JSON.stringify(vc);
      const message = new TextEncoder().encode(vcDataString);

      if (!signMessage) {
        notification.warning({
          message: 'Sign method is not available',
          placement: 'bottomRight',
        });
        return;
      }
      const signedMessage = await signMessage(message);

      const proof = {
        type: 'Ed25519Signature2018', // This is typically the signature type used in Solana
        created: new Date().toISOString(),
        proofPurpose: 'assertionMethod',
        verificationMethod: `${issuerDid}#phantom`,
        jws: bs58.encode(signedMessage),
      };
      return {
        ...vc,
        proof,
      };
    },
    [signMessage]
  );

  const registerVc = useCallback(
    async (did: string, vc: string) => {
      const provider = getProvider();

      if (!provider || !publicKey || !anchorWallet) {
        return;
      }

      const program = new Program(
        VcRegistryInterface as Idl,
        provider
      ) as Program<Idl>;

      if (wallet?.adapter?.publicKey?.toBuffer()) {
        const [vcEntryPda, bump] = PublicKey.findProgramAddressSync(
          [Buffer.from('vc_entry'), wallet?.adapter.publicKey?.toBuffer()],
          program.programId
        );

        await program.methods
          .storeVerifiableCredential(did, vc, bump)
          .accounts({
            vcEntry: vcEntryPda,
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

  return {
    registerVc,
    getVc,
  };
}

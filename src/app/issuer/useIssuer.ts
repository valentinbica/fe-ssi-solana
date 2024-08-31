import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import IssuerRegistryInterface from '@/program/interfaces/issuer_registry.json';
import { notification } from 'antd';

export function useIssuer() {
  const { publicKey, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();

  const getProvider = useCallback(() => {
    if (!anchorWallet) {
      return null;
    }
    const connection = new Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed'
    );
    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: 'processed',
    });
  }, [anchorWallet]);

  const registerIssuer = useCallback(
    async (did: string, didDocument: string) => {
      const provider = getProvider();

      if (!provider || !publicKey || !anchorWallet) {
        return;
      }

      const program = new Program(
        IssuerRegistryInterface as Idl,
        provider
      ) as Program<Idl>;

      if (wallet?.adapter?.publicKey?.toBuffer()) {
        const [didEntryPda, bump] = PublicKey.findProgramAddressSync(
          [Buffer.from('did_entry'), wallet?.adapter.publicKey?.toBuffer()],
          program.programId
        );
        await program.rpc
          .registerIssuer(did, issuerData, {
            accounts: {
              issuer: issuer.publicKey,
              owner: provider.wallet.publicKey,
              systemProgram: SystemProgram.programId,
            },
            signers: [issuer],
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

  const getIssuer = useCallback(async () => {
    const provider = getProvider();

    if (!provider) {
      return;
    }

    const program = new Program(
      IssuerRegistryInterface as Idl,
      provider
    ) as Program<Idl>;

    if (wallet?.adapter?.publicKey?.toBuffer()) {
      const [didEntryPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('did_entry'), wallet?.adapter.publicKey?.toBuffer()],
        program.programId
      );
      return program.account.didEntry.fetch(didEntryPda);
    }
    return null;
  }, [getProvider, wallet?.adapter.publicKey]);

  return {
    getIssuer,
    registerIssuer,
  };
}

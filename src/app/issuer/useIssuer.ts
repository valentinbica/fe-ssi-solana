import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { Idl, Program } from '@coral-xyz/anchor';
import { notification } from 'antd';
import IssuerRegistryInterface from '@/program/interfaces/issuer_registry.json';
import { useProvider } from '@/components/Provider/useProvider';

export function useIssuer() {
  const { publicKey, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { getProvider } = useProvider();

  const registerIssuer = useCallback(async () => {
    const provider = getProvider();

    if (!provider || !publicKey || !anchorWallet) {
      notification.warning({
        message: 'Wallet not connected',
        placement: 'bottomRight',
      });
      return;
    }

    const tirProgram = new Program(
      IssuerRegistryInterface as Idl,
      provider
    ) as Program<Idl>;

    if (wallet?.adapter?.publicKey?.toBuffer()) {
      const [tirEntryPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('issuer'), wallet?.adapter.publicKey?.toBuffer()],
        tirProgram.programId
      );
      const did = `did:sol:${publicKey.toBase58()}`;

      await tirProgram.methods
        .registerIssuer(did, '')
        .accounts({
          issuer: tirEntryPda,
          owner: provider.publicKey,
          system_program: SystemProgram.programId,
        })
        .rpc();
      notification.success({
        message: 'Issuer registered successfully',
        placement: 'bottomRight',
      });
    }
  }, [anchorWallet, getProvider, publicKey, wallet?.adapter.publicKey]);

  const doesIssuerExist = useCallback(async () => {
    const provider = getProvider();

    if (!provider) {
      return false;
    }

    const tirProgram = new Program(
      IssuerRegistryInterface as Idl,
      provider
    ) as Program<Idl>;

    if (wallet?.adapter?.publicKey?.toBuffer()) {
      const [tirPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('issuer'), wallet?.adapter.publicKey?.toBuffer()],
        tirProgram.programId
      );
      const connection = new Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed'
      );
      const accountInfo = await connection.getAccountInfo(tirPda);

      return accountInfo !== null;
    }
    return false;
  }, [getProvider, wallet?.adapter.publicKey]);

  return {
    doesIssuerExist,
    registerIssuer,
  };
}

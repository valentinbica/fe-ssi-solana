import { useCallback } from 'react';
import { Connection } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { AnchorProvider } from '@coral-xyz/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

export function useProvider() {
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

  return {
    getProvider,
  };
}

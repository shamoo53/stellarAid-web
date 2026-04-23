'use client';

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@/components/ui';
import { Wallet, Smartphone, TrendingUp } from 'lucide-react';

export interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnect: (wallet: string) => void;
}

const WALLET_OPTIONS = [
  {
    id: 'freighter',
    name: 'Freighter',
    description: 'Secure and user-friendly Stellar wallet for desktop and mobile',
    icon: <Wallet className="w-6 h-6" />,
  },
  {
    id: 'albedo',
    name: 'Albedo',
    description: 'Browser extension wallet for seamless Stellar integration',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 'lobstr',
    name: 'Lobstr',
    description: 'Popular mobile wallet with built-in DEX and fiat on-ramp',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

export function WalletConnectModal({ isOpen, onClose, onWalletConnect }: WalletConnectModalProps) {
  function handleWalletSelect(wallet: string) {
    onWalletConnect(wallet);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="centered"
      size="md"
      aria-labelledby="wallet-connect-modal-title"
    >
      <ModalHeader onClose={onClose} showCloseButton>
        <h2 id="wallet-connect-modal-title" className="text-lg font-semibold text-gray-900">
          Connect Your Stellar Wallet
        </h2>
      </ModalHeader>

      <ModalBody className="space-y-6">
        <p className="text-sm text-gray-500">
          Choose your preferred wallet to connect and donate securely
        </p>

        <div className="space-y-4">
          {WALLET_OPTIONS.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletSelect(wallet.id)}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex-shrink-0 p-2 bg-gray-50 rounded-full">
                {wallet.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{wallet.name}</h3>
                <p className="text-sm text-gray-500">{wallet.description}</p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default WalletConnectModal;
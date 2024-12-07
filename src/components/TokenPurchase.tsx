import React, { useState } from 'react';
import { Coins } from 'lucide-react';

interface TokenPurchaseProps {
  onPurchase: (amount: number) => void;
}

export const TokenPurchase: React.FC<TokenPurchaseProps> = ({ onPurchase }) => {
  const [amount, setAmount] = useState(100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Coins className="w-6 h-6" />
        Purchase Tokens
      </h2>
      <div className="flex gap-4">
        <input
          type="number"
          min="100"
          step="100"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => onPurchase(amount)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Buy Tokens
        </button>
      </div>
    </div>
  );
};
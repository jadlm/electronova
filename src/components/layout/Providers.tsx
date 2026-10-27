'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartSidebar } from '@/components/layout/CartSidebar';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        {children}
        <CartSidebar />
        <WhatsAppButton />
      </CartProvider>
    </FavoritesProvider>
  );
}

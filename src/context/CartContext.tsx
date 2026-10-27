'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { CartItem, Product, ProductVariant } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.variantId === action.payload.variantId
            )
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.variantId === action.payload.variantId
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  state: {
    items: (CartItem & { variantName?: string })[];
    isOpen: boolean;
    itemCount: number;
    total: number;
  };
  items: (CartItem & { variantName?: string })[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (
    itemOrProduct: CartItem | Product,
    quantity?: number,
    variant?: ProductVariant
  ) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('maison-nova-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'LOAD_CART', payload: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maison-nova-cart', JSON.stringify(cartState.items));
    } catch {
      // Ignore storage errors
    }
  }, [cartState.items]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (cartState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartState.isOpen]);

  const totalItems = useMemo(
    () => cartState.items.reduce((sum, item) => sum + item.quantity, 0),
    [cartState.items]
  );

  const subtotal = useMemo(
    () => cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartState.items]
  );

  const addItem = useCallback(
    (
      itemOrProduct: CartItem | Product,
      quantity = 1,
      variant?: ProductVariant
    ) => {
      // Check if it's already a CartItem
      if ('productId' in itemOrProduct) {
        dispatch({ type: 'ADD_ITEM', payload: itemOrProduct });
        return;
      }

      // Convert Product to CartItem
      const product = itemOrProduct as Product;
      const price = product.price + (variant?.priceAdjustment || 0);
      const cartItem: CartItem & { variantName?: string } = {
        productId: product.id,
        variantId: variant?.id,
        variantName: variant?.name,
        name: product.name,
        brand: product.brand,
        price,
        quantity,
        image: product.images[0]?.src || '/images/placeholder.svg',
        slug: product.slug,
      };

      dispatch({ type: 'ADD_ITEM', payload: cartItem });
    },
    []
  );

  const removeItem = useCallback((productId: string, variantId?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const state = useMemo(
    () => ({
      items: cartState.items as (CartItem & { variantName?: string })[],
      isOpen: cartState.isOpen,
      itemCount: totalItems,
      total: subtotal,
    }),
    [cartState.items, cartState.isOpen, totalItems, subtotal]
  );

  return (
    <CartContext.Provider
      value={{
        state,
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

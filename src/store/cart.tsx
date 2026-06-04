"use client";

import React, { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";
import type { Product, ProductVariant, CartItem } from "@/types";

const STORAGE_KEY = "ara-cart-v1";

export function getCartItemKey(productId: string, variantId?: string): string {
  return `${productId}__${variantId ?? "default"}`;
}

export function getItemKey(item: CartItem): string {
  return getCartItemKey(item.product.id, item.variant?.id);
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; variant?: ProductVariant } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function sameLine(item: CartItem, productId: string, variantId?: string) {
  return item.product.id === productId && (item.variant?.id ?? undefined) === (variantId ?? undefined);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, variant } = action.payload;
      const existingIndex = state.items.findIndex((item) =>
        sameLine(item, product.id, variant?.id)
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, variant }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM": {
      const { productId, variantId } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => !sameLine(item, productId, variantId)),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => !sameLine(item, productId, variantId)),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          sameLine(item, productId, variantId) ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });
  const hydratedRef = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // ignore corrupt storage
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  // Persist on every items change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore quota errors
    }
  }, [state.items]);

  const addItem = (product: Product, quantity = 1, variant?: ProductVariant) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, variant } });
  };

  const removeItem = (productId: string, variantId?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setItems = (items: CartItem[]) => {
    dispatch({ type: "HYDRATE", payload: items });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const variantPrice = item.variant?.additionalPrice || 0;
      return total + (item.product.price + variantPrice) * item.quantity;
    }, 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal;
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setItems,
        toggleCart,
        openCart,
        closeCart,
        getTotal,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

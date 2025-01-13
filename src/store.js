import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { produce } from "immer";

// Product data => id, name, price, image, description,
//                 category, count, total price, inCart  

export const useStore = create((set) => ({
    cart: [],
    cartOpen: false,
    searchOpen: false,
    addToCart: (product) =>
        set(
            produce((state) => {
                const index = state.cart.findIndex((p) => p.id === product.id);
                index === -1 ? state.cart.push({ ...product, count: 1 }) : state.cart[index].count++;
            })
        ),
    removeFromCart: (product) =>
        set(
            produce((state) => {
                state.cart = state.cart.filter((p) => p.id !== product.id);
            })
        ),
    clearCart: () =>
        set(
            produce((state) => {
                state.cart = [];
            })
        ),
    toggleCart: (open) =>
        set(
            produce((state) => {
                state.cartOpen = open;
            })
        ),
    setSearchOpen: (open) =>
        set(
            produce((state) => {
                state.searchOpen = open;
            })
        ),
    searchQuery: "",
    setSearchQuery: (query) =>
        set(
            produce((state) => {
                state.searchQuery = query;
            })
        ),
}));

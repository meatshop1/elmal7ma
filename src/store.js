import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import i18 from "i18next";
import { produce } from "immer";
import cookies from "js-cookie";
import { use } from "react";
// Product data => id, name, price, image, description,
//                 category, count, total price, inCart  

export const useStore = create((set) => ({
    cart: [],
    openedCounters: {}, // { id: count }
    cartOpen: false,
    searchOpen: false,
    lng: cookies.get("i18next") || "en",
    Total: 0,
    itemsCount: 0,
    setLng: (lng) =>
        set(
            produce((state) => {
                state.lng = lng;
            })
        ),
    addToCart: (product) =>
        set(
            produce((state) => {
                const index = state.cart.findIndex((p) => p.id === product.id);
                index === -1 ? state.cart.push({ ...product, count: 1 }) : state.cart[index].count++;
                state.Total += product.price;
                state.itemsCount++;
                console.log(state.itemsCount)
            })
        ),
    removeFromCart: (product) =>
        set(
            produce((state) => {
                const index = state.cart.findIndex((p) => p.id === product.id);
                const price = state.cart[index]?.price * state.cart[index]?.count;
                state.Total -= price;
                state.itemsCount -= state.cart[index].count;
                state.cart = state.cart.filter((p) => p.id !== product.id);
            })
        ),
    increment: (product) =>
        set(
            produce((state) => {
                const index = state.cart.findIndex((p) => p.id === product.id);
                state.cart[index].count++;
                state.Total += product.price;
                state.itemsCount++;
            })
        ),
    decrement: (product) =>
        set(
            produce((state) => {
                const index = state.cart.findIndex((p) => p.id === product.id);
                state.Total -= product.price;
                state.itemsCount--;
                if (state.cart[index].count === 1) {
                    console.log("removing", product.id);
                    state.cart = state.cart.filter((p) => p.id !== product.id);
                    return
                }
                state.cart[index].count--;
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
    setTotal: (total) =>
        set(
            produce((state) => {
                state.Total = total;
            })
        ),
    setItemsCount: (count) =>
        set(
            produce((state) => {
                state.itemsCount = count;
            })
        ),
    setOpenedCounters: (id, count) =>
        set(
            produce((state) => {
                state.openedCounters[id] = count;
            })
        ),
    deleteOpenedCounter: (id) =>
        set(
            produce((state) => {
                let temp = state.openedCounters;
                delete temp[id];
                state.openedCounters = temp;
            })
        ),
        

}));

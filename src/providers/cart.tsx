'use client';

import { ProductWithTotalPrice } from '@/helpers/product'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends ProductWithTotalPrice {
	quantity: number
}

interface ICartContext {
	products: CartProduct[]
	cartTotalPrice: number
	cartBasePrice: number
	cartTotalDiscount: number
	total: number
	subTotal: number
	totalDiscount: number
	addProductToCart: (product: CartProduct) => void
	decreaseProductQuantity: (productId: string) => void
	increaseProductQuantity: (productId: string) => void
	removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
	products: [],
	cartBasePrice: 0,
	cartTotalPrice: 0,
	cartTotalDiscount: 0,
	total: 0,
	subTotal: 0,
	totalDiscount: 0,
	addProductToCart: () => { },
	decreaseProductQuantity: () => { },
	increaseProductQuantity: () => { },
	removeProductFromCart: () => { },
})

export default function CartProvider({ children }: { children: ReactNode }) {
	const localStorageData =
		typeof localStorage !== 'undefined'
			? localStorage.getItem('@fsw-store/cart-products')
			: null;

	const [products, setProducts] = useState<CartProduct[]>(
		localStorageData ? JSON.parse(localStorageData) : []
	);

	useEffect(() => {
		localStorage.setItem('@fsw-store/cart-products', JSON.stringify(products))
	}, [products]);

	const subTotal = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + Number(product.basePrice) * product.quantity
		}, 0)
	}, [products]);

	const total = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + product.totalPrice * product.quantity
		}, 0)
	}, [products]);

	const totalDiscount = subTotal - total;

	function addProductToCart(product: CartProduct) {
		const productIsAlreadyOnCard = products.some((cartProduct) => cartProduct.id === product.id);

		if (productIsAlreadyOnCard) {
			setProducts((prev) =>
				prev.map((cartProduct) => {
					if (cartProduct.id === product.id) {
						return {
							...cartProduct,
							quantity: cartProduct.quantity + product.quantity,
						}
					};

					return cartProduct;
				}));
			return;
		};

		setProducts((prev) => [...prev, product]);
	};

	function decreaseProductQuantity(productId: string) {
		setProducts((prev) => prev.map((cartProduct) => {
			if (cartProduct.id === productId) {
				return {
					...cartProduct,
					quantity: cartProduct.quantity - 1,
				}
			}
			return cartProduct
		}).filter((cartProduct) => cartProduct.quantity > 0));
	};

	function increaseProductQuantity(productId: string) {
		setProducts((prev) =>
			prev.map((cartProduct) => {
				if (cartProduct.id === productId) {
					return {
						...cartProduct,
						quantity: cartProduct.quantity + 1,
					}
				};

				return cartProduct;
			}));
	};

	function removeProductFromCart(productId: string) {
		setProducts((prev) => prev.filter((cartProduct) => cartProduct.id !== productId));
	};

	return (
		<CartContext.Provider
			value={{
				products,
				total,
				subTotal,
				totalDiscount,
				addProductToCart,
				decreaseProductQuantity,
				increaseProductQuantity,
				removeProductFromCart,
				cartBasePrice: 0,
				cartTotalPrice: 0,
				cartTotalDiscount: 0,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
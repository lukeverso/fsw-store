import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
	const { products, total, subTotal, totalDiscount } = useContext(CartContext);

	return (
		<div className="flex flex-col gap-8">
			<Badge className='w-fit gap-1 text-base uppercase px-3 py-[0.375rem] border-2 border-primary' variant='outline' >
				<ShoppingCartIcon size={16} />
				Carrinho
			</Badge>
			<div className="flex flex-col gap-5">
				{products.length > 0 ? (
					products.map((product) => (
						<CartItem product={computeProductTotalPrice(product as any) as any} key={product.id} />
					))
				) : (
					<p className="text-center font-semibold">
						Você ainda não tem nenhum produto no carrinho.
					</p>
				)}
			</div>
			<div className="flex flex-col gap-3">
				<Separator />
				<div className="flex items-center justify-between text-xs">
					<p>Subtotal</p>
					<p>R$ {subTotal.toFixed(2)}</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between text-xs">
					<p>Entrega</p>
					<p>GRÁTIS</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between text-xs">
					<p>Subtotal</p>
					<p>R$ {subTotal.toFixed(2)}</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between text-xs">
					<p>Descontos</p>
					<p>- R$ {totalDiscount.toFixed(2)}</p>
				</div>
				<Separator />
				<div className="flex items-center justify-between text-xs">
					<p>Total</p>
					<p>R$ {total.toFixed(2)}</p>
				</div>
				<Separator />
			</div>
		</div>
	);
}

export default Cart;
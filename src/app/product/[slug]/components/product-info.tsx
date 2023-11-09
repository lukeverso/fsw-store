'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
	product: Pick<ProductWithTotalPrice, 'basePrice' | 'description' | 'discountPercentage' | 'name' | 'totalPrice'>;
};

const ProductInfo = ({ product: { basePrice, description, discountPercentage, name, totalPrice } }: ProductInfoProps) => {
	const [quantity, setQuantity] = useState(1);

	const handleDecreaseQuantityClick = () => {
		setQuantity(prev => (prev === 1 ? prev : prev - 1));
	};

	const handleIncreaseQuantityClick = () => {
		setQuantity(prev => prev + 1);
	};

	return (
		<div className="px-5 flex flex-col">
			<h2 className="text-lg">{name}</h2>
			<div className="flex items-center gap-2">
				<h1 className="text-lg font-bold">R$ {totalPrice.toFixed(2)}</h1>
				{discountPercentage > 0 && (
					<Badge className="px-2 py-[2px]">
						<ArrowDownIcon size={14} />
						{discountPercentage}%
					</Badge>
				)}
			</div>
			{discountPercentage > 0 && (
				<p className="text-sm line-through opacity-75">
					R$ {Number(basePrice).toFixed(2)}
				</p>
			)}
			<div className="mt-4 flex items-center gap-2">
				<Button size='icon' variant='outline' onClick={handleDecreaseQuantityClick}>
					<ArrowLeftIcon size={16} />
				</Button>
				<span>{quantity}</span>
				<Button size='icon' variant='outline' onClick={handleIncreaseQuantityClick}>
					<ArrowRightIcon size={16} />
				</Button>
			</div>
			<div className="flex flex-col gap-3 mt-8">
				<h3 className="font-bold">Descrição</h3>
				<p className="text-sm opacity-60 text-justify">{description}</p>
			</div>
			<Button className="mt-8 uppercase font-bold">
				Adicionar ao carrinho
			</Button>
			<div className="bg-[#2A2A2A] rounded-xl flex items-center px-5 py-2 justify-between mt-5">
				<div className="flex items-center gap-1">
					<TruckIcon />
					<div className="flex flex-col">
						<p className="text-xs">Entrega via <span className="font-bold">FSPacket</span></p>
						<p className="text-xs text-[#B162FF]">Envio para todo o Brasil</p>
					</div>
				</div>
				<p className="font-bold text-xs">Frete grátis</p>
			</div>
		</div>
	);
}

export default ProductInfo;
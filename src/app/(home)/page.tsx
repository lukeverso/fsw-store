import Image from 'next/image';
import Categories from './components/categories';
import { db } from '@/lib/prisma';
import ProductList from './components/product-list';

export default async function Home() {
	const deals = await db.product.findMany({
		where: {
			discountPercentage: {
				gt: 0
			}
		}
	});

	return (
		<div>
			<Image
				src='/banner-home-01.png'
				alt='Até 55% de desconto só esse mês!'
				height={150}
				width={350}
				className='h-auto w-full px-5'
				sizes='100vw'
			/>
			<div className='mt-8 px-5'>
				<Categories />
			</div>
			<div className='mt-8'>
				<p className='pl-5 font-semibold uppercase mb-5'>Ofertas</p>
				<ProductList products={deals} />
			</div>
			<Image
				src='/banner-home-02.png'
				alt='Até 55% de desconto em mouses!'
				height={150}
				width={350}
				className='h-auto w-full px-5 mt-8'
				sizes='100vw'
			/>
		</div>
	);
};
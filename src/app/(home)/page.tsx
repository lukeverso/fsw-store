import Image from 'next/image';
import Categories from './components/categories';
import { db } from '@/lib/prisma';
import ProductList from './components/product-list';
import SectionTitle from './components/section-title';
import PromoBanner from './components/promo-banner';

export default async function Home() {
	const deals = await db.product.findMany({
		where: {
			discountPercentage: {
				gt: 0
			}
		}
	});

	const keyboards = await db.product.findMany({
		where: {
			category: {
				slug: 'keyboards'
			}
		}
	});

	const mouses = await db.product.findMany({
		where: {
			category: {
				slug: 'mouses'
			}
		}
	});

	return (
		<div>
			<PromoBanner
				src='/banner-home-01.png'
				alt='Até 55% de desconto só esse mês!'
			/>
			<div className='mt-8 px-5'>
				<Categories />
			</div>
			<div className='mt-8'>
				<SectionTitle>Ofertas</SectionTitle>
				<ProductList products={deals} />
			</div>
			<PromoBanner
				src='/banner-home-02.png'
				alt='Até 55% de desconto em mouses!'
			/>
			<div className='mt-8'>
				<SectionTitle>Teclados</SectionTitle>
				<ProductList products={keyboards} />
			</div>
			<PromoBanner
				src='/banner-home-03.png'
				alt='Até 20% de desconto em fones!'
			/>
			<div className='mt-8'>
				<SectionTitle>Mouses</SectionTitle>
				<ProductList products={mouses} />
			</div>
		</div>
	);
};
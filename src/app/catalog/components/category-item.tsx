import { Category } from '@prisma/client';
import Image from 'next/image';

interface CategoryItemProps {
	category: Category;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
	return (
		<div className='flex flex-col'>
			<div className='w-full h-[150px] flex items-center justify-center bg-gradient-to-tr from-purple-600 to-purple-900 rounded-tl-lg rounded-tr-lg'>
				<Image
					src={category.imageUrl}
					alt={category.name}
					height={0}
					width={0}
					sizes='100vw'
					className='h-auto max-h-[70%] w-auto max-w-[80%]'
					style={{ objectFit: 'contain' }}
				/>
			</div>
			<div className='bg-accent py-2 rounded-bl-lg rounded-br-lg'>
				<p className='text-sm font-semibold'>
					{category.name}
				</p>
			</div>
		</div>
	);
}

export default CategoryItem;
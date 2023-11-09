import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/contants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { db } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
	const categories = await db.category.findFirst({
		where: {
			slug: params.slug
		},
		include: {
			products: true
		}
	});

	if (!categories) return null;

	return (
		<div className="p-5 flex flex-col gap-8">
			<Badge className='w-fit gap-1 text-base uppercase px-3 py-[0.375rem] border-2 border-primary' variant='outline' >
				{CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
				{categories.name}
			</Badge>
			<div className="grid grid-cols-2 gap-8">
				{
					categories.products.map((category) => (
						<ProductItem
							product={computeProductTotalPrice(category)}
							key={category.id}
						/>
					))
				}
			</div>
		</div>
	);
}

export default CategoryProducts;
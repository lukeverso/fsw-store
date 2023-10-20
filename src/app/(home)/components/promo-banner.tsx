import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
	return (
		<Image
			{...props}
			alt={alt}
			height={150}
			width={350}
			className='h-auto w-full px-5 mt-8'
			sizes='100vw'
		/>
	);
}

export default PromoBanner;
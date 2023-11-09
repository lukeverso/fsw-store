import { ComponentProps } from 'react';

const SectionTitle = ({ children, ...props }: ComponentProps<'p'>) => {
	return (
		<p className='pl-5 font-semibold uppercase mb-5'>
			{children}
		</p>
	);
}

export default SectionTitle;
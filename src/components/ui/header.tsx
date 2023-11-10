'use client';

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PercentIcon, ShoppingCartIcon } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from './sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Separator } from './separator';
import Link from 'next/link';

const Header = () => {
	const { data, status } = useSession();

	const handleLogInClick = async () => {
		await signIn();
	};

	const handleLogOutClick = async () => {
		await signOut();
	};

	return (
		<Card className='flex justify-between p-[1.875rem] items-center'>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline'>
						<MenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<SheetHeader className='text-left text-lg font-semibold'>
						Menu
					</SheetHeader>
					{
						status === 'authenticated' && data?.user && (
							<div className="flex flex-col">
								<div className="my-4 flex items-center gap-2">
									<Avatar>
										<AvatarFallback>
											{data.user.name?.[0].toUpperCase()}
										</AvatarFallback>
										{data.user.image && <AvatarImage src={data.user.image} />}
									</Avatar>
									<div className="flex flex-col">
										<p className='font-medium'>
											{data.user.name}
										</p>
										<p className="text-sm opacity-75">
											Boas compras!
										</p>
									</div>
								</div>
								<Separator />
							</div>
						)
					}
					<div className='mt-4 flex flex-col gap-3'>
						{
							status === 'unauthenticated' && (
								<Button onClick={handleLogInClick} variant='secondary' className='w-full justify-start gap-3'>
									<LogInIcon size={16} />
									Fazer login
								</Button>
							)
						}
						{
							status === 'authenticated' && (
								<Button onClick={handleLogOutClick} variant='secondary' className='w-full justify-start gap-3'>
									<LogOutIcon size={16} />
									Fazer logout
								</Button>
							)
						}
						<Button variant='secondary' className='w-full justify-start gap-3'>
							<HomeIcon size={16} />
							Início
						</Button>
						<Button variant='secondary' className='w-full justify-start gap-3'>
							<PercentIcon size={16} />
							Ofertas
						</Button>
						<SheetClose asChild>
							<Link href='/catalog'>
								<Button variant='secondary' className='w-full justify-start gap-3'>
									<ListOrderedIcon size={16} />
									Catálogo
								</Button>
							</Link>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
			<Link href='/'>
				<h1 className='font-semibold text-lg'>
					<span className='text-primary'>FSW</span> Store
				</h1>
			</Link>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline'>
						<ShoppingCartIcon />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<h1>cart</h1>
				</SheetContent>
			</Sheet>
		</Card>
	);
}

export default Header;
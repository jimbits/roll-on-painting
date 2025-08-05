import {cn} from '@/lib/utils'
import {ReactNode} from 'react'

type VariantType = keyof typeof variants
interface NavBarProps {
	className?: string
	children?: ReactNode
	tagline: string
	title: string
	variant?: VariantType
}

const baseStyles = '  py-3 border-b shadow-sm  '

const variants = {
	red: 'bg-red-500',
	green: 'bg-lime-500',
	blue: 'bg-blue-500',
	orange: 'bg-orange-500',
	default: 'bg-stone-500 ',
} as const

function NavBar({children, tagline, title, className = '', variant = 'default'}: NavBarProps) {
	return (
		<header className={cn(baseStyles, variants[variant], className)}>
			<h1 className="text-3xl font-semibold  ">{title}</h1>
			<p className="text-sm opacity-90">{tagline}</p>
			{children}
		</header>
	)
}

export default NavBar

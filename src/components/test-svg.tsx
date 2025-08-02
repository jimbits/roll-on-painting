import Logo from '@/icons/logo.svg'
export default function TestSVG() {
	return (
		<div className="p-4">
			<h2>SVG Component Test</h2>

			{/* Test basic import */}
			<Logo className="w-8 h-8" />

			{/* Test with Tailwind classes */}
			<Logo className="w-8 h-8 fill-blue-500" />

			{/* Test with hover effects */}
			<Logo className="w-12 h-12 fill-red-600 hover:fill-red-800 transition-colors" />
		</div>
	)
}

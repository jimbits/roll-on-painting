import Logo from '@/components/test-svg'

export default function Home() {
	return (
		<>
			<nav>
				<Logo />
				<figure>
					<figcaption>Roll On Quality</figcaption>
				</figure>
			</nav>
			<header className="text-center text-lg">
				<h1
					className="text-3xl font-bold  pt-4
        "
				>
					{' '}
					Residential Interior Painting Calculator
				</h1>
				<p> Edmonton Proffessional House Painters Roll On Quality</p>
			</header>
		</>
	)
}

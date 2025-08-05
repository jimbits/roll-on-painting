import PricingCard from '@/components/cards/pricing-card'
import NavBar from '../components/headers/appbar'
export default function Page() {
	return (
		<>
			<NavBar title="TailwindCSS" tagline="learning" className=" pt-3 pb-8 text-center" />
			<PricingCard />
		</>
	)
}

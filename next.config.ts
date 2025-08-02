import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				loaders: [
					{
						loader: '@svgr/webpack',
						options: {
							typescript: true,
							ext: 'tsx',
							expandProps: true,
							svgProps: {
								className: '{props.className}',
							},
						},
					},
				],
				as: '*.js', // Important: Tells Turbopack to treat output as JavaScript
			},
		},
	},
}

export default nextConfig

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

import Header from './header'
import Footer from './footer'

import Logo from '../img/logo.jpg'

import '../scss/global.scss'
import '../scss/content.scss'

const Layout = ({ children, meta }) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
						description
						siteUrl
					}
				}
			}
		`}
		render={data => {
			let site = data.site.siteMetadata
			meta.title = site.title
			meta.siteUrl = site.siteUrl
			meta.description = meta.description ? meta.description : site.description

			return (
				<Fragment>
					<Meta {...meta} />
					{<Header />}
					<main id="main">{children}</main>
					{<Footer />}
				</Fragment>
			)
		}}
	/>
)

// eslint-disable-next-line one-var
const Meta = ({ name, title, description, slug, siteUrl, image }) => {
	slug = !slug && '/'
	image = !image && Logo
	title = name ? `${name} | ${title}` : title

	return (
		<Helmet>
			<title>{name}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={siteUrl + slug} />

			<meta name="twitter:card" content="summary_large_image" />
			<link rel="shortcut icon" href={Logo} />
			<link rel="icon" sizes="192x192" href={Logo} />
			<link rel="apple-touch-icon" href={Logo} />
			<meta name="theme-color" content="#003462" />
			<link rel="mask-icon" href={Logo} color="#003462" />
			<base href="/" />

			{/* Facebook */}
			<meta property="og:url" content={siteUrl + slug} />

			<meta property="og:title" content={name} />
			<meta property="og:image" content={image} />
			<meta property="og:description" content={description} />

			{/* Twitter */}
			<meta name="twitter:url" content={siteUrl + slug} />
			<meta name="twitter:title" content={name} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<script
				type="text/javascript"
				src="https://resx.octorate.com/octobook/resources/widget/js/form.js"
				data-sitekey="46ce720bf72c0e97c337590f04f27a0c"
			></script>
		</Helmet>
	)
}

export default Layout
import React, {Component} from 'react'
import Head from 'next/head'
import {addTranslation, getTranslate, setLanguages, getActiveLanguage} from 'react-localize-redux'
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image'

import {nextConnect} from '../store'
import {setIsMobile} from '../redux/actions'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Languages from '../components/Languages'
import Menu from '../components/Menu'
import Socials from '../components/Socials'

import stylesheet from '../styles/index.scss'

import {defaultLang, langs, strings} from '../translations'

class Index extends Component {

	constructor(props) {
		super(props)

		const { dispatch } = this.props

		dispatch(setLanguages(langs, defaultLang))
		dispatch(addTranslation(strings))

		this._setIsMobile = this._setIsMobile.bind(this)

		this.mobileBreakpoint = 1000
	}
	componentDidMount() {
		this._setIsMobile()
		window.addEventListener('resize', this._setIsMobile)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this._setIsMobile)
	}

	_setIsMobile () {
		const { dispatch, isMobile } = this.props

		let currentIsMobile = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < this.mobileBreakpoint

		if (isMobile != currentIsMobile) {
			dispatch(setIsMobile(currentIsMobile))
		}
	}

	render() {
		const {translate} = this.props

		let heads = {
			title: translate('head.title'),
			url: 'skelet.tt',
			img: `static/images/fb-share.jpg`,
		}

		return (
			<div>
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<meta property="og:title" content={`Next.js skelet`} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={heads.url} />
					<meta property="og:image" content={heads.img} />
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<title>{heads.title}</title>
					<meta name="description" content={translate('head.desc')}/>
					<meta name="keywords" content={translate('head.keywords')}/>
					<link rel='icon' href='/static/favicon.ico' />
				</Head>

				<Header/>

				<Menu items={[
					{name: 'Menu 1', link: '#first'},
				]} />

				<h1>Skelet project</h1>

				<h2>Language switcher:</h2>
				<Languages/>

				<h2>Responsive image:</h2>
				<ResponsiveImage alt="Test image">
					<ResponsiveImageSize
						default
						minWidth={0}
						path={`https://placehold.it/300x200`}
					/>
					<ResponsiveImageSize
						minWidth={500}
						path={`https://placehold.it/600x400`}
					/>
					<ResponsiveImageSize
						minWidth={1100}
						path={`https://placehold.it/1200x800`}
					/>
				</ResponsiveImage>

				<h2>Social icons:</h2>
				<Socials
					facebook={translate('socials.facebook')}
					twitter={translate('socials.twitter')}
					instagram={translate('socials.instagram')}
					snapchat={translate('socials.snapchat')}
					youtube={translate('socials.youtube')}
				/>

				<Footer/>
			</div>
		)
	}
}


export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
	currentLanguage: (state.locale && state.locale.languages.length) ? getActiveLanguage(state.locale) : '',
}))(Index)
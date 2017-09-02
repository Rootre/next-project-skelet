import React, {Component} from 'react'
import Head from 'next/head'
import {addTranslation, getTranslate, setLanguages, getActiveLanguage} from 'react-localize-redux'

import {nextConnect} from '../store'
import {setIsMobile} from '../redux/actions'

import Footer from '../components/Footer'
import Header from '../components/Header'
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
			title: translate('title'),
			url: 'skelet.tt',
			img: `static/images/fb-share.jpg`,
		}

		return (
			<div>
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<meta property="og:title" content={`Raf Simons sneakers`} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={heads.url} />
					<meta property="og:image" content={heads.img} />
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<title>{heads.title}</title>
					<meta name="description" content={translate('desc')}/>
					<meta name="keywords" content={translate('keywords')}/>
					<link rel='icon' href='/static/favicon.ico' />
				</Head>

				<Header/>

				<Menu items={[
					{name: 'Menu 1', link: '#first'},
				]} />

				<h1>Skelet project</h1>

				<Socials
					facebook={translate('linkFb')}
					twitter={translate('linkTw')}
					instagram={translate('linkIt')}
					snapchat={translate('linkSc')}
					youtube={translate('linkYt')}
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
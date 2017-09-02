import React, { Component } from 'react'
import { setActiveLanguage } from 'react-localize-redux'
import classNames from 'classnames'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

import {nextConnect} from '../store'

import { langs } from '../translations'

class Languages extends Component {
	render() {
		const { currentLanguage, dispatch, translate } = this.props

		return (
			<div className="Languages">
				<p>{translate('lang')}</p>
				<ul className="slash-list">
					{langs.map((lang, i) => {
						return <li className={classNames({ active: currentLanguage.code === lang })} key={i} onClick={() => dispatch(setActiveLanguage(lang))}>{lang}</li>
					})}
				</ul>
			</div>
		)
	}
}

export default nextConnect(state => ({
	currentLanguage: (state.locale && state.locale.languages.length) ? getActiveLanguage(state.locale) : '',
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
}))(Languages)
import React, { Component } from 'react'
import { setActiveLanguage } from 'react-localize-redux'

import {nextConnect} from '../store'

import { langs } from '../translations'

class Languages extends Component {
	render() {
		const { dispatch, title } = this.props

		return (
			<div className="Languages">
				<p>{title}</p>
				<ul className="slash-list">
					{langs.map((lang, i) => {
						return <li key={i} onClick={() => dispatch(setActiveLanguage(lang))}>{lang}</li>
					})}
				</ul>
			</div>
		)
	}
}

export default nextConnect()(Languages)
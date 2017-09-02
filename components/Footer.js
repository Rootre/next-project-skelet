import React, { Component } from 'react'

import {nextConnect} from '../store'

class Footer extends Component {

	render() {
		return (
			<div className={`Footer`}>
				<div>
					<p>Patička</p>
				</div>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
}))(Footer)
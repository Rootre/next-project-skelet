import React, { Component } from 'react'
import {Motion, spring, StaggeredMotion} from 'react-motion'
import classNames from 'classnames'

import {nextConnect} from '../store'

class Menu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false,
		}
	}

	handleClick(e) {
		e.preventDefault()

		this.setState({ open: false })
	}
	render() {
		let { isMobile, items } = this.props
		let { open } = this.state

		let isOpened = isMobile ? open : true
		let hamburgerClass = classNames('hamburger', {
			'active': this.state.open
		})

		return (
			<div className={`Menu`}>
				{isMobile && (
					<div className={hamburgerClass} onClick={() => this.setState({ open: !this.state.open })}>
						<span className="lines"></span>
					</div>
				)}
				<Motion style={{
					left: spring( isOpened ? 0 : 100, { stiffness: 200 } )
				}}>
					{style => (
						<div className="items" style={{ left: `${style.left}%` }}>
							<StaggeredMotion
								defaultStyles={items.map(() => ({ left: isOpened ? 0 : 100, opacity: 0 }))}
								styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
									return i === 0
										? { left: spring(isOpened ? 0 : 100, { stiffness: 100, damping: 10 }), opacity: spring(isOpened ? 1 : 0) }
										: prevInterpolatedStyles[i - 1]
								})}
							>
								{interpolatingStyles => (
									<ul>
										{interpolatingStyles.map((style, i) => {
											let index = isMobile ? i : items.length - 1 - i

											return (
												<li key={index} style={style}>
													<a href={`#${items[index].link}`} onClick={e => this.handleClick(e, index)}>{items[index].name}</a>
												</li>
											)
										})}
									</ul>
								)}
							</StaggeredMotion>
						</div>
					)}
				</Motion>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
}))(Menu)
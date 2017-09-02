import React from 'react'

import Facebook from '../static/svg/social-facebook.svg'
import Twitter from '../static/svg/social-twitter.svg'
import Snapchat from '../static/svg/social-snapchat.svg'
import Instagram from '../static/svg/social-instagram.svg'
import Youtube from '../static/svg/social-youtube.svg'


const Socials = ({ facebook, twitter, instagram, snapchat, youtube }) =>  {
	let socials = []

	if (facebook) {
		socials.push({ name: 'Facebook', url: facebook, svg: <Facebook/> })
	}
	if (twitter) {
		socials.push({ name: 'Twitter', url: twitter, svg: <Twitter/> })
	}
	if (instagram) {
		socials.push({ name: 'Instagram', url: instagram, svg: <Instagram/> })
	}
	if (snapchat) {
		socials.push({ name: 'Snapchat', url: snapchat, svg: <Snapchat/> })
	}
	if (youtube) {
		socials.push({ name: 'YouTube', url: youtube, svg: <Youtube/> })
	}

	return (
		<div className={`Socials`}>
			<ul>
				{socials.map((service, i) => (
					<li key={i}>
						<a href={service.url} title={service.name}>{service.svg}</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Socials
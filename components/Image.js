import React from 'react'
import classNames from 'classnames'
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image'

const Image = ({ alt, className, responsive, src }) =>  {
	return responsive ? (
		<ResponsiveImage className={classNames('Image', className)} alt={alt || ''}>
			<ResponsiveImageSize
				default
				minWidth={0}
				path={responsive.mobile || src}
			/>
			<ResponsiveImageSize
				minWidth={500}
				path={responsive.tablet || src}
			/>
			<ResponsiveImageSize
				minWidth={1100}
				path={responsive.desktop || src}
			/>
		</ResponsiveImage>
	) : <img src={src} alt={alt || ''} className={classNames('Image', className)} />
}

export default Image
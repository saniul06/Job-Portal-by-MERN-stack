import React from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import Profilesidebar from '../../Element/Profilesidebar'
import PasswordUpdate from '../../Element/PasswordUpdate'

const ChangePasswordEmployee = () => {
	return (
		<>
			<MetaData title='Change-password' />
			<Header />

			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white browse-job p-t50 p-b20">
						<div className="container">
							<div className="row">
								<Profilesidebar changePassword='active' />
								<PasswordUpdate />
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />

		</>
	)
}
export default ChangePasswordEmployee;
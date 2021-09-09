import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import Profilesidebar from '../../Element/Profilesidebar'
import ProfileUpdate from '../../Element/ProfileUpdate'

const EmployeeProfile = () => {

	const { loading } = useSelector(state => state.updateProfile)

	return (
		<>
			<MetaData title='Profile-info' />
			<div className="page-wraper" style={{ pointerEvents: loading ? 'none' : '' }}>

				< Header />
				<div className="page-content bg-white">
					<div className="content-block">
						<div className="section-full bg-white browse-job p-t50 p-b20">
							<div className="container">
								<div className="row">
									<Profilesidebar employeeProfile='active' />
									<ProfileUpdate />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div >

		</>
	)
}
export default EmployeeProfile;
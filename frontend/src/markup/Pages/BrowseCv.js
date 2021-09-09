import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MetaData from '../Layout/MetaData'
import CvCard from '../Element/CvCard'
import { Modal } from 'react-bootstrap';
import Cvfindbox from '../Element/CvFindBox';
import Pagination from 'react-js-pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllActivatedCv } from '../../actions/adminActions'
import InstagramEmbed from 'react-instagram-embed';
import { FAVORITE_OR_UNFAVORITE_CV_RESET } from '../../actions/actionTypes'

const BrowseCv = () => {

	const dispatch = useDispatch();
	const alert = useAlert()

	const {
		loading, allCv, itemsPerPage, totalCv, count, error
	} = useSelector(state => state.allCv)

	const { message: favMessage, error: favError } = useSelector(state => state.favoriteCv)

	const [currentPage, setCurrentPage] = useState(1)
	const [showVideoModal, setShowVideoModal] = useState(false)
	const [instagramVideoLink, setInstagramVideoLink] = useState()

	useEffect(() => {
		dispatch(getAllActivatedCv())
	}, [])

	useEffect(() => {
		if (favMessage) {
			alert.success(favMessage)
			dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_RESET })
		}
		if (favError) {
			alert.error(favError)
			dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_RESET })
		}
	}, [favMessage, favError])

	const setCurrentPageNo = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleVideoModalShow = link => {
		setInstagramVideoLink(link)
		setShowVideoModal(true)
	}

	const handleVideoModalClose = () => {
		setShowVideoModal(false)
		setInstagramVideoLink()
	}

	return (
		<div className="page-wraper">
			<MetaData title="Browse-Cv" />
			<Header />
			<div className="page-content bg-white">

				<div className="dez-bnr-inr bg-cv1">
					<div className="container">
						<div className="dez-bnr-inr-entry">
							<h1 className="text-white">Browse CV</h1>

							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to="/">Home</Link></li>
									<li>Browse Cv</li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				<div className="content-block">

					<Cvfindbox currentPage={currentPage} />

					<div className="section-full bg-white browse-job p-b50">
						<div className="container">
							<div className="job-bx-title clearfix">
								<h5 className="font-weight-700 pull-left text-uppercase text-dark">{count && count} CV(s) Found</h5>
							</div>
							<ul className="post-job-bx browse-job-grid row" style={{ masHeight: '800px', minHeight: '400px' }}>
								{loading ? <div className="center-progress"><CircularProgress style={{ color: '#000' }} /></div> : allCv && allCv.map((cv, index) => (
									<CvCard
										key={index}
										cv={cv}
										handleVideoModalShow={handleVideoModalShow}
									/>
								))}

							</ul>
							{count > itemsPerPage && (
								<div className="pagination-bx float-right">
									{/* <ul className="pagination"> */}
									<Pagination
										activePage={currentPage}
										itemsCountPerPage={itemsPerPage}
										totalItemsCount={count}
										nextPageText="Next"
										prevPageText="Prev"
										firstPageText="First"
										lastPageText="Last"
										onChange={setCurrentPageNo}
										itemClass="page-item"
										linkClass="page-link"
									/>
									{/* </ul> */}
								</div>
							)}
						</div>
					</div>

				</div>
			</div>

			<Footer />

			<Modal show={showVideoModal} onHide={handleVideoModalClose} className="modal fade modal-bx-info" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">

				<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleVideoModalClose}>
					<span aria-hidden="true">&times;</span>
				</button>

				<iframe src={`${instagramVideoLink}embed`} width="800" height="600" frameBorder="0" scrolling="no" allowtransparency="false" caption='false'></iframe>

				<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleVideoModalClose}>Close</button>

			</Modal>
		</div>
	)
}
export default BrowseCv;
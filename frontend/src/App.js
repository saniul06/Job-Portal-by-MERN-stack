import React, { useEffect } from 'react';
import Markup from './markup/Markup';
import { loadUser } from './actions/authActions'
import './css/plugins.css';
import './css/style.css';
import './css/templete.css';
import './css/skin/skin-1.css';
import './plugins/slick/slick.min.css';
import './plugins/slick/slick-theme.min.css';
import { useDispatch } from 'react-redux'



function App() {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(loadUser())
	// }, [])

	return (
		<div className="App">
			<Markup />
		</div>
	);
}

export default App;

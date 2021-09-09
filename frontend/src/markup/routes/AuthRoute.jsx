import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation()
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (isAuthenticated === true) {
                        if (location.search) {
                            return <Redirect to={location.search.split('=')[1]} />
                        }
                        if (user.role === 'employee') {
                            return <Redirect to='/employee/profile' />
                        }
                        if (user.role === 'admin') {
                            return <Redirect to='/admin/profile' />
                        }
                        if (user.role === 'employer') {
                            console.log('i am in auth routeeeeeeeeeeeeeeeeeeee')
                            return <Redirect to='/employer/profile' />
                        }
                    }

                    return <Component {...props} />;
                }}
            />
        </>
    );
};

export default AuthRoute

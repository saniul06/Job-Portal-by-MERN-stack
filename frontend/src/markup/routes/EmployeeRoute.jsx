import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeRoute = ({ component: Component, isAdmin, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Redirect to="/login" />;
                        }
                        if (user.role !== 'employee' && user.role !== 'admin') {
                            return <Redirect to='/' />
                        }
                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
};

export default EmployeeRoute;

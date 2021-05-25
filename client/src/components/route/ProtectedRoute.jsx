import { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useAlert } from 'react-alert'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const alert = useAlert()
    return (
        <Fragment>
            {!loading && (
                <Route
                    {...rest}
                    render={({ location }) =>
                        !isAuthenticated ? (
                            alert.error("please login first"),
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        ) : isAdmin && user.roal !== 'admin' ? (
                            alert.error("You cannot access this route"),
                            <Redirect
                                to="/"
                            />
                        ) : (
                            <Component />
                        )
                    }
                />
            )}
        </Fragment>
    );
}

export default ProtectedRoute;

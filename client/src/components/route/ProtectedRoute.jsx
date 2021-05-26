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
                    render={(props) =>
                        !isAuthenticated ? (
                            alert.error("please login first"),
                            <Redirect
                                to={{
                                    pathname: '/login',
                                }}
                            />
                        ) : isAdmin && user.roal !== 'admin' ? (
                            alert.error("You cannot access this route"),
                            <Redirect
                                to="/"
                            />
                        ) : (
                            <Component {...props} />
                        )
                    }
                />
            )}
        </Fragment>
    );
}

export default ProtectedRoute;

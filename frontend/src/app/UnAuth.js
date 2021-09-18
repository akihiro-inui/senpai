import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

const UnAuthRoute = (props) => {
    const jwt_token = localStorage.getItem('jwt_tiken')
    const isAuthenticated = jwt_token != null // Check if user has jwt token (Logged in already)
    if (isAuthenticated) {
        console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
        return <Redirect to="/" />
    } else {
        return <Route {...props} />
    }
}


export default UnAuthRoute
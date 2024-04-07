import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import register from './components/register';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';

if (localStorage.jwtToken) {

  //Set Auth Token to Header Auth
  setAuthToken(localStorage.jwtToken);

  //Decode Token & get User INfo
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set User and isAuthenticated to True
  store.dispatch(setCurrentUser(decoded));

  //check for expired Token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //Logut user after token expire
    store.dispatch(logoutUser());

    //redirect to Login
    window.location.href = "/";
  }
}

function App() {
  return (
    <>
      <Router>

        <Switch>
          <Route path="/">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={register} />
              <PrivateRoute exact path="/home" component={Home} />



            </Switch>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

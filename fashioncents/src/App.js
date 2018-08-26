import React, { Component } from "react";
import { Switch, Route, NavLink, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import CreatePost from "./components/CreatePost";
import ShowPost from "./components/ShowPost";

class App extends Component {
  state = {
    username: "",
    password: "",
    auth: false
  };

  setAuth = (username, password) => {
    this.setState({
      auth: true,
      username: username,
      password: password
    });
  };

  logout = () => {
    if (localStorage.getItem("username") != null) {
      localStorage.removeItem("username");
    }
    this.setState({
      auth: false,
      username: null,
      password: null
    });
    this.props.history.push("/");
  };

  componentDidMount() {
    if (localStorage.getItem("username") != null) {
      this.setState({
        auth: true,
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      });
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="collapese navbar-collapse" id="navigation">
            {this.state.auth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    FashionCents
                  </NavLink>
                </li>
                <div id="login">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link" onClick={this.logout}>
                      Logout
                    </span>
                  </li>
                </div>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    FashionCents
                  </NavLink>
                </li>
                <div id="login">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                </div>
              </ul>
            )}
          </div>
        </nav>
        <Switch>
          {/* <Route path="/login" component={Login} setAuth={this.setAuth}/> */}
          <Route
            path="/login"
            render={props => <Login {...props} setAuth={this.setAuth} />}
          />
          {/* <Route path="/signup" component={Signup} /> */}
          <Route
            path="/signup"
            render={props => <Signup {...props} setAuth={this.setAuth} />}
          />
          {/*} <Route
            path="/profile"
            render={props => (
              <Profile
                {...props}
                setAuth={this.state.auth}
                username={this.state.username}
              />
            )}
          />*/}
          <Route path="/createpost" component={CreatePost} />
          <Route path="/profile" component={Profile} />
          <Route path="/showpost" component={ShowPost} />
          <Route exact path="/" component={Homepage} />
          <Route path="/*" render={() => <div>Error 404</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;

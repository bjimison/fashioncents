import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import CreatePost from "./components/CreatePost";
import ShowPost from "./components/ShowPost";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    username: "",
    password: "",
    auth: false
  };

  // history = createHistory(this.props);

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
      username: "",
      password: ""
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
    // let username = localStorage.getItem("username");

    return (
      <div className="App">
        <Navbar
          auth={this.state.auth}
          username={this.state.username}
          setAuth={this.setAuth}
          logout={this.logout}
        />
        <Switch>
          <Route path="/createpost" component={CreatePost} />
          <Route path="/profile" render={props => <Profile {...props} />} />
          <Route path="/showpost/:post_id" component={ShowPost} />
          <Route path="/editpost/:post_id" component={EditPost} />
          <Route exact path="/" logout={this.logout} component={Homepage} />
          <Route path="/*" render={() => <div>Error 404</div>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

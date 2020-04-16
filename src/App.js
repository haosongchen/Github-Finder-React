import React, { Fragment, useState } from "react";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/users/Users";
import User from "./Components/users/User";
import Search from "./Components/users/Search";
import About from "./Components/pages/About";
import axios from "axios";
import GithubState from "./context/githubState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  // state = {
  //   users: [],
  //   user: {},
  //   loading: false
  // };
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get("https://api.github.com/users");
  //   this.setState({ users: res.data, loading: false });
  // }
  // const searchUsers = async text => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     setUsers(res.data.items);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     // this.setState({ users: [], loading: false });
  //     setUsers([]);
  //     setLoading(false);
  //   }
  // };

  // getUser = async username => {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/search/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ user: res.data, loading: false });
  // };

  // const clearUsers = () => {
  //   setUsers([]);
  //   setLoading(false);
  // };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search />
                    <Users />
                  </Fragment>
                )}
              />

              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;

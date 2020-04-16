import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "./types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.REACT_APP_GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  // an alernate way to use useState hook
  // the reducer function is write in another js file : githubReducer
  // reducer is a function
  // array decontruction, useReducer returns current state and a dispatch function
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search user
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    console.log(res.data.items);
    //the dispatch will actually change the state
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // get user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // this.setState({ user: res.data, loading: false });
    dispatch({ type: GET_USER, payload: res.data });
  };

  // get repos

  // clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };
  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    //props.children does is that it is used to display whatever you include between the opening and closing tags when invoking a component.
    // then the whole App.Js is wrapped in this GithubState JSX tag.
    // which means the whole App.js is being wrapped by the githubcontext provider.
    // every consumer in the app.js component will subscribe to this provider.
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

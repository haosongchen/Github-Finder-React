import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import GithubContext from "../../context/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user } = githubContext;
  // second argument here is getting checked everytime screen is re-rendered. If it's different, use effect will
  // be called. Otherwise, no.
  useEffect(() => {
    getUser(match.params.login);
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_gists,
    public_repos,
    hireable,
    blog,
    company
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-centre">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {login} </strong>
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website <a href={`https://${blog}`}>{blog}</a>{" "}
                  </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_repos}</div>
      </div>
    </Fragment>
  );
};

export default User;

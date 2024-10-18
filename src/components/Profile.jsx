import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { FaUserFriends } from "react-icons/fa";
import RepoCard from "./RepoCard";

function Profile() {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState({}); // Initialize as an empty object
  const [repositories, setRepositories] = useState([]); // Track repositories

  const [page, setPage] = useState(1); // Page state for pagination
  const [hasMoreRepos, setHasMoreRepos] = useState(true); // Track if there are more repositories to load
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      // Fetch user profile
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUser(res.data);

      // Fetch user's repositories (first page)
      const repo = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`
      );
      if (repo.data.length === 0) {
        setHasMoreRepos(false); // No more repositories to load
      }
      setRepositories(repo.data); // Set the repositories
    } catch (error) {
      console.log("user not found !!");
      setUser([]); // Clear user data in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreRepos = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const repo = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${nextPage}&per_page=10`
      );
      if (repo.data.length === 0) {
        setHasMoreRepos(false); // No more repos to load
      } else {
        setRepositories((prevRepos) => [...prevRepos, ...repo.data]); // Append new repositories
        setPage(nextPage); // Update the page number
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details on initial render
  }, [username]); // Re-run when the username changes

  console.log(repositories);
  repositories.reverse();
  console.log(repositories);
  if (user.length == 0) {
    return <p>User not found !</p>;
  } else {
    return (
      <div className="container md:mx-auto md:p-4 md:grid md:grid-cols-2 md:gap-4 md:h-dvh ">
        {/* Profile Info */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center md:overflow-y-auto md:border">
          <Avatar
            alt={user.name}
            src={user.avatar_url}
            sx={{ width: 150, height: 150 }}
            className="mx-auto mb-4"
          />
          <p className="text-2xl font-semibold mb-2">{user.name}</p>
          <p className="text-gray-700 italic mb-4">{user.bio}</p>
          <p className="text-gray-600">Location: {user.location || "N/A"}</p>

          <div className="flex justify-center items-center text-gray-700 my-4">
            <FaUserFriends className="mr-2" />
            <p className="font-semibold">
              Followers: {user.followers} | Following: {user.following}
            </p>
          </div>

          <div className="space-y-2 text-gray-600">
            <p>Company: {user.company || "N/A"}</p>
            <p>
              Blog:{" "}
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.blog || "N/A"}
              </a>
            </p>
            <p>Email: {user.email || "N/A"}</p>
            <p>Hireable: {user.hireable ? "Yes" : "No"}</p>
            <p>Twitter: @{user.twitter_username || "N/A"}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-700">Repositories: {user.public_repos}</p>
            <p className="text-gray-700">Gists: {user.public_gists}</p>
            <p className="text-gray-500 text-sm">
              Created At: {new Date(user.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">
              Last Updated: {new Date(user.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Repository Info */}
        <div className="bg-white shadow-md rounded-lg p-6 md:overflow-y-auto md:border">
          <h2 className="text-xl font-bold mb-4">Repositories</h2>
          <ul className="space-y-4">
            {repositories.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>
          {/* Load More Button */}
          {hasMoreRepos && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={fetchMoreRepos}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More Repositories"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;

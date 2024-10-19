import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function UserList() {
  const { name } = useParams(); // Get the username from URL parameters
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more users to load
  const [loading, setLoading] = useState(false); // Track loading state

  // console.log("This is from UserList: ", username);

  const fetchUser = async (name, page) => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${name}&page=${page}&per_page=20`
      );
      // console.log(res);
      if (res.data.items.length === 0) {
        setHasMore(false); // No more users to load
      } else {
        setUsers((prevUsers) => [...prevUsers, ...res.data.items]); // Append new users to existing ones
      }
    } catch (error) {
      setUsers([]); // Set users to an empty array in case of error
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (name) {
      setPage(1); // Reset page to 1 when the search term changes
      setUsers([]); // Clear the existing users
      setHasMore(true); // Reset hasMore to true for new searches
      fetchUser(name, 1); // Fetch the first page of users
    }
  }, [name]);

  const handleNextPage = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage); // Increment the page
      fetchUser(name, nextPage); // Fetch the next page of users
    }
  };
  // console.log(users);

  return (
    <div>
      <p className="font-bold p-4">Result: {name}</p>
      <div className="flex flex-wrap justify-evenly">
        {users.map((user, index) => (
          <UserCard key={index} user={user} /> // Pass user data to UserCard
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}

      {/* Load More Button */}
      <div className="flex justify-center">
        {hasMore && !loading && (
          <button
            className="bg-blue-500 text-white p-2 mt-4"
            onClick={handleNextPage}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default UserList;

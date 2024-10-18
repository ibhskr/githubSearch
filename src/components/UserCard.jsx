import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
function UserCard({ user }) {
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className=" w-56 p-10 m-2 shadow-lg border flex justify-center items-center ">
      <div className="  flex flex-col items-center">
        {/* <img className="w-4 h-4" src={user.avatar_url} alt="" /> */}
        <Avatar
          alt="Remy Sharp"
          src={user.avatar_url}
          sx={{ width: 56, height: 56 }}
        />
        <p>{user.login}</p>
        <button
          className="bg-blue-400 p-1 rounded-lg mt-4 w-32"
          onClick={() => {
            navigate(`/user/${user.login}`);
          }}
        >
          Profile
        </button>
      </div>
    </div>
  );
}

export default UserCard;

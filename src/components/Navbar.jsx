import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    navigate(`/search/${data.Name}`); // Navigating to a dynamic route based on Name
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded hover:text-black"
        onClick={() => navigate("/")}
      >
        <FaHome className="" />
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-4"
      >
        <div className="flex flex-col">
          {/* <label htmlFor="username" className="mb-1 text-sm">
            Enter Name:
          </label> */}
          <input
            type="text"
            placeholder="Type someone's name"
            // id="username"
            className=" p-2 rounded text-black outline-none"
            {...register("Name", {
              required: "This field is required",
              minLength: { value: 3, message: "Minimum 3 characters required" },
            })}
          />
          {/* Error message */}
          {errors.Name && (
            <span className="text-red-500 text-xs mt-1">
              {errors.Name.message}
            </span>
          )}
        </div>

        {/* <input
          type="submit"
          value="Search"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        /> */}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold p-2.5  rounded">
          <IoSearchSharp size={"20px"} className="text-black " />
        </button>
      </form>
    </div>
  );
}

export default Navbar;

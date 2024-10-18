import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    navigate(`/search/${data.Name}`); // Assuming you're navigating to a path with the Name value
  }

  const bgImageLink =
    "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageLink})` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" backdrop-blur-md  shadow-md rounded-lg p-8 max-w-md w-full bg-opacity-80"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-6">
          Search By Name
        </h2>

        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Enter Someone's Name:"
            {...register("Name", {
              required: "This field is required",
              minLength: { value: 3, message: "Minimum 3 characters required" },
            })}
            className="w-full p-2 outline-none rounded"
          />
          {errors.Name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.Name.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;

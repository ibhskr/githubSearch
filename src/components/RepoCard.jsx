import React from "react";

function RepoCard({ repo }) {
  // Format the dates to display only the date
  const createdAt = new Date(repo.created_at).toLocaleDateString();
  const updatedAt = new Date(repo.updated_at).toLocaleDateString();

  return (
    <div className="max-w-md mx-auto">
      <li className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        {/* Repo Name */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-xl font-semibold"
        >
          {repo.name}
        </a>

        {/* Description */}
        <p className="text-gray-600 mt-2 mb-4">
          {repo.description || "No description available."}
        </p>

        {/* Creation and Last Updated Dates */}
        <div className="text-sm text-gray-500">
          <p className="mb-1">
            <span className="font-semibold text-gray-700">Created At:</span>{" "}
            {createdAt}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Last Updated At:
            </span>{" "}
            {updatedAt}
          </p>
        </div>

        {/* Language */}
        {repo.language && (
          <p className="text-sm font-semibold text-gray-700 mt-4">
            Language: <span className="text-yellow-600">{repo.language}</span>
          </p>
        )}
      </li>
    </div>
  );
}

export default RepoCard;

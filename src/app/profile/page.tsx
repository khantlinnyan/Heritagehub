import React from "react";

const App = () => {
  const userData = {
    avatar: "https://placehold.co/150x150/AEC6CF/FFFFFF?text=ME", // Placeholder image
    name: "Mike",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xs overflow-hidden flex flex-col items-center p-8 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Profile Picture */}
        <div className="mb-6">
          <img
            src={userData.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/AEC6CF/FFFFFF?text=User"; // Fallback image
            }}
          />
        </div>

        {/* User Name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-0">
          {userData.name}
        </h1>
      </div>
    </div>
  );
};

export default App;

import React from "react";

function UserApplicationDetails({ application }) {
  console.log("data", application);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:div-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center text-3xl font-bold uppercase">
                User Details
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <div>
                    <img className="object-contain h-48 w-96"  src={application.image} alt="loading" />
                  </div>
                  <div>
                    <span className="text-2l font-semibold">Name : </span>
                    <span className="text-l text-gray-400 font-semibold">
                      {application.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-2l font-semibold ">Email : </span>
                    <span className="text-l text-gray-400 font-semibold">
                      {application.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-2l font-semibold">
                      Phone Number :{" "}
                    </span>
                    <span className="text-l text-gray-400 font-semibold">
                      {application.phoneNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-2l font-semibold">
                      Country :{" "}
                    </span>
                    <span className="text-l text-gray-400 font-semibold">
                      {application.country}
                    </span>
                  </div>
                </div>
                <div className="relative"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserApplicationDetails;

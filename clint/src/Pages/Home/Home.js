import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import Form from "../../Components/Form";
import Sidebar from "../../Components/Sidebar";
import UserApplicationDetails from "../../Components//UserApplicationDetails";
import { showLoading, hideLoading } from "../../Redux/alertSlice";

function Home() {
  const dispatch = useDispatch();
  const [application, setApplication] = useState({});
  const [username, setUserName] = useState("");
  const [status, setStatus] = useState(false);
  const getData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .post(
          "/api/user/get-user-info-by-id",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch(hideLoading());
          console.log("welcome=", response.data.data);
          setApplication(response.data.data);
          setUserName(response.data.data.name);
          if (Object.keys(application).length > 0) {
            console.log("in");
            setStatus(true);
          }
          console.log("sjdfjs", application);
        });
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Sidebar username={username}>
        <UserApplicationDetails application={application} />
      </Sidebar>
    </div>
  );
}

export default Home;

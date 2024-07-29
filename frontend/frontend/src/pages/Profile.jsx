import { Outlet } from "react-router-dom"
import SideBar from "../components/profile/SideBar"
import { useEffect, useState } from "react"
//import { useSelector } from "react-redux"
import axios from 'axios';
import Loader from "../components/loader/Loader";
import MobileNav from "../components/profile/MobileNav";


const Profile = () => {
   //const isLoggedIn= useSelector()

  const [Profile, setProfile] = useState();

  const headers = {

    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await
        axios.get("http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
      setProfile(response.data);

    };
    fetch();
  }, []);


  return (
    <div className="bg-zinc-900 md:px-12 px-2 
    flex md:flex-row flex-col w-full py-8 gap-4 text-white ">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />{" "}
        </div>

      )}

      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <SideBar data={Profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}

    </div>
  )
}

export default Profile

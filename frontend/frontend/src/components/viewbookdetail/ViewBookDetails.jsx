import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  //console.log(isLoggedIn,role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://book-store-8uzx.onrender.com/api/v1/get-book-by-id/${id}`);
        console.log("API Response:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const HandleFav = async () => {
    const response = await axios.put(
      "https://book-store-8uzx.onrender.com/api/v1/add-book-to-favourite",
      {},
      {
        headers
      });
    alert(response.data.message);
  };

  const HandleCart = async () => {
    const response = await axios.put(
      "https://book-store-8uzx.onrender.com/api/v1/add-to-cart",
      {},
      { headers }
    )
    alert(response.data.message);

  };

  const deleteBook = async () => {
    const response = await axios.delete(
      "https://book-store-8uzx.onrender.com/api/v1/delete-book", { headers }
    );
    alert(response.data.message);
    navigate("/all-books")
  };

  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
          <div className='w-full lg:w-3/6'>
            {" "}
            <div className="bg-zinc-800 justify-around flex flex-col lg:flex-row p-12 rounded">
              {" "}
              <img
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
                src={Data.url}
                alt="" />
              {isLoggedIn === true && role === "user" &&
                (<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 ">
                  <button onClick={HandleFav}
                    className="bg-white rounded lg:rounded-full text-4xl p-3 text-red-500 flex items-center justify-center">
                    <FaHeart /> <span className="ms-4 block lg:hidden">Favourite</span>
                  </button>
                  <button onClick={HandleCart}
                    className="text-white rounded lg:rounded-full text-4xl p-3 mt-8 md:mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center">
                    <FaShoppingCart /> <span className="ms-4 block lg:hidden">Add To Cart</span>
                  </button>
                </div>
                )}

              {isLoggedIn === true && role === "admin" &&
                (<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 ">
                  <Link
                  to={`/updatebook/${id}`}
                    className="bg-white rounded-full lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center">
                    <FaEdit /><span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button
                    onClick={deleteBook}
                    className=" bg-white text-red-500 rounded-full lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white-500 flex items-center justify-center">
                    <MdDelete /> <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
                )}

            </div>

          </div>
          <div className='p-4 w-3/6'>
            <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
            <p className="text-zinc-400 mt-1">By {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: $ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader /></div>}
    </>
  );
};

export default ViewBookDetails

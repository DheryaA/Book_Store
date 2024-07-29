import axios from 'axios';
import { useState, useEffect } from 'react'
import BookCart from "../components/bookcard/BookCard";
import Loader from "../components/loader/Loader";

const AllBooks = () => {

  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
    
        const response = await axios.get("https://book-store-8uzx.onrender.com/api/v1/get-all-books");

        console.log("API Response:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className='bg-zinc-900 h-auto px-12 py-8'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        {
          !Data && (
            <div className='flex items-center justify-center my-8'>
              <Loader />{" "}
            </div>
          )}

        <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {Data &&
            Data.map((items, i) => (
              <div key={i}>
                <BookCart data={items} />{" "}
              </div>
            ))}
        </div>

      </div>
    </>
  )
}

export default AllBooks

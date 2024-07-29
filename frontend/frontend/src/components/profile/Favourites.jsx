
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCart from "../bookcard/BookCard"

const Favourites = () => {

  const [favouriteBooks, setFavouriteBooks] = useState();

  const headers = {

    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks]);



  return (
    <>
      {favouriteBooks && favouriteBooks.length === 0  && (
        <div className='text-3xl h-[100%] font-semibold text-zinc-500 
      items-center flex flex-col justify-center bg-white-400 w-full'>
          no book is added to favourite
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
      {favouriteBooks &&
     favouriteBooks.map((items, i) =>
        <div key={i}>
          <BookCart data={items} favourite={true} />
        </div>
      )}
      </div>
      </>
  )
}

  export default Favourites

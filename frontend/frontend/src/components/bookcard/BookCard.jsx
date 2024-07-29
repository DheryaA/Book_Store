
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BookCard = ({data, favourite}) => {
//  console.log(data);

  const headers = {

    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const HandleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img className='h-[25vh]' src={data.url} alt="/" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold ">By {data.author}</p>
          <p className="mt-2 text-zinc-200 text-xl font-semibold ">${data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button onClick={HandleRemoveBook}
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500
     mt-4">
          Remove From Favourites</button>
      )}

    </>
  )
}
BookCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  favourite: PropTypes.bool,
};


export default BookCard

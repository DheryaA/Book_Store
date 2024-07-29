import { useEffect, useState } from "react"
import axios from 'axios';
import BookCart from "../bookcard/BookCard";
import Loader from "../loader/Loader";

const RecentlyAdded = () => {

    const [Data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
                console.log("API Response:", response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mt-8 px-4 ">
            <h4 className="text-3xl text-yellow-300">Recently Added Books</h4>
            {loading ? (
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            ) : (
                <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {Data && Data.length > 0 ? (
                        Data.map((items, i) => (
                            <div key={i}>
                                <BookCart data={items} />
                            </div>
                        ))
                    ) : (
                        <div>No recently added books found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RecentlyAdded;

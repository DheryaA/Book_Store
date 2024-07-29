
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
            <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-start lg:items-start justify-center'>
                <h1 className=' text-4xl lg:text-6xl font-semibold text-yellow-100 lg:text-left text-center'>
                    Discover Your Next Great Read
                </h1>
                <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
                    Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
                </p>
               <div className='mt-8'>
               <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
                    Discover Book
                </Link>
               </div>
            </div>
            <div className='w-full md:w-2/6 h-auto lg:h-[100%] flex items-center justify-center ml-auto'>
            <img className='rounded' src='../../../public/JPG.png' alt="Hero" />
            </div>
        </div>
    )
}

export default Hero

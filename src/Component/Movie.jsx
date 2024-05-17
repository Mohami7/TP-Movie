import React, { useEffect, useState } from 'react';

export default function Movie() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=${search}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setMovies(json.results);
        setTotalPages(json.total_pages);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className='text-center'>
      <form className="flex justify-center items-center mt-6" onSubmit={handleSubmit}>
        <input 
          type="search" 
          onChange={handleChange} 
          value={search} 
          className="border border-gray-300 rounded-l-md py-2 px-4 " 
          placeholder="Search movies..." 
        />
        <button 
          type="submit" 
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md "
        >
          Search
        </button>
      </form>

      <div className="p-8  mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => (
          <div key={movie.id} className="group relative shadow-lg rounded-md p-4">
            <div className=" overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : `https://image.tmdb.org/t/p/w1280`}
                alt={movie.original_name}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"; }}
                className="lg:h-full lg:w-full  "
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h1 className=" ">
                
                    {movie.original_name}
                 
                </h1>
                <p>{truncateText(movie.overview, 100)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center p-4">
        <button
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-l-lg  "
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
         </svg>
        </button>

        <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 ">Page {page} of {totalPages}</button>
        <button
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4  rounded-r-lg "
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

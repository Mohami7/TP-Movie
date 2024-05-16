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

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className='text-center'>
      <form className="flex justify-center items-center mt-6" onSubmit={handleSubmit}>
        <input 
          type="search" 
          id="form1" 
          onChange={handleChange} 
          value={search} 
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          placeholder="Search movies..." 
        />
        <button 
          type="submit" 
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => (
          <div key={movie.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : "https://image.tmdb.org/t/p/w1280"}
                alt={movie.original_name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={movie.href}>
                    <span  className="absolute inset-0" />
                    {movie.original_name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center">
        <button
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

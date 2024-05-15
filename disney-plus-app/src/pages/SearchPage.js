import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import instance from "../api";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) fetchSearchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    console.log("🚀 ~ fetchSearchMovie ~ searchTerm:", debouncedSearchTerm);
    try {
      const request = await instance.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      // console.log("🚀 ~ fetchSearchMovie ~ request:", request.data.results);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return searchResults.length > 0 ? (
    <section className="px-6 flex flex-wrap justify-center pt-20 gap-10">
      {searchResults.map((movie) => {
        if (movie.backdrop_path !== null && movie.media_type !== "person") {
          const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
            <div
              className="w-96 rounded-md overflow-hidden cursor-pointer"
              key={movie.id}
              onClick={() => navigate(`/${movie.id}`)}
            >
              <img
                src={movieImageUrl}
                alt="movie"
                className="hover:scale-125 transition"
              />
            </div>
          );
        }
      })}
    </section>
  ) : (
    <section className="flex justify-center items-center h-screen">
      <div className="text-white text-opacity-50">
        <p>찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
      </div>
    </section>
  );
};

export default SearchPage;

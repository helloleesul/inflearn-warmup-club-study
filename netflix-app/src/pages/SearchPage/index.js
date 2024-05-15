import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

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
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      // console.log("🚀 ~ fetchSearchMovie ~ request:", request.data.results);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return searchResults.length > 0 ? (
    <section className="search-container">
      {searchResults.map((movie) => {
        if (movie.backdrop_path !== null && movie.media_type !== "person") {
          const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
            <div className="movie" key={movie.id}>
              <div
                onClick={() => navigate(`/${movie.id}`)}
                className="movie__column-poster"
              >
                <img
                  src={movieImageUrl}
                  alt="movie"
                  className="movie__poster"
                />
              </div>
            </div>
          );
        }
      })}
    </section>
  ) : (
    <section className="no-results">
      <div className="no-results__text">
        <p>찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
      </div>
    </section>
  );
};

export default SearchPage;

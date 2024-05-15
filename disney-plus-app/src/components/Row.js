import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import instance from "../api";
import MovieModal from "./MovieModal";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelection, setMovieSelection] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await instance.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <section className="px-6">
      <h2 className="text-white text-2xl font-bold mb-6">{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={10}
        loop={true}
        breakpoints={{
          1378: { slidesPerView: 6, slidesPerGroup: 4 },
          998: { slidesPerView: 5, slidesPerGroup: 3 },
          625: { slidesPerView: 4, slidesPerGroup: 2 },
          0: { slidesPerView: 3, slidesPerGroup: 1 },
        }}
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="transition duration-300 rounded-md cursor-pointer border-gray-700 border-2 hover:border-gray-400 overflow-hidden"
            >
              <img
                className="hover:scale-125 transition duration-300"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path} `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <MovieModal
        {...movieSelection}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </section>
  );
};

export default Row;

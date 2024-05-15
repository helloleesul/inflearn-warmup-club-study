import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../api";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(`/movie/${movieId}`);
      setMovie(request.data);
    };
    fetchData();
  }, [movieId]);

  if (!movie) return <div>loading...</div>;
  return (
    <section>
      <img
        alt="poster"
        className=""
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
    </section>
  );
};

export default DetailPage;

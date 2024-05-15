import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    };
    fetchData();
  }, [movieId]);

  if (!movie) return <div>loading...</div>;
  return (
    <section>
      <img
        alt="poster"
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
    </section>
  );
};

export default DetailPage;

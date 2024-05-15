import React, { useEffect, useState } from "react";
import instance from "../api";
import requests from "../api/requests";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    // 현재 상영중인 영화들 가져오기
    const request = await instance.get(requests.fetchNowPlaying);
    // 여러 영화 중 하나의 영화ID 가져오기
    const tvId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    // 특정 영화 상세정보 가져오기 (비디오 정보 포함)
    const { data: tvDetail } = await instance.get(`/tv/${tvId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(tvDetail);
  };
  // 설명글 글자수 자르기
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (isClicked) {
    return (
      <div className="w-full h-screen">
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&showinfo=0&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <article
      className={`h-[600px] bg-top bg-cover relative`}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
      }}
    >
      <section className="flex justify-center items-start flex-col h-full relative z-[1] text-white">
        <div className="flex flex-col gap-10 px-20">
          <h3 className="text-4xl font-black">
            {movie.title || movie.name || movie.original_name}
          </h3>

          {movie.videos?.results.length > 0 && (
            <button
              className="p-1 inline-block w-20 bg-white text-[#040714] font-extrabold rounded"
              onClick={() => setIsClicked(true)}
            >
              PLAY
            </button>
          )}
          <p className="w-[400px]">{truncate(movie.overview, 100)}</p>
        </div>
      </section>
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#040714] to-transparent"></div>
    </article>
  );
};

export default Banner;

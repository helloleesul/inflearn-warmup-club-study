import React from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../api/requests";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <section className="flex flex-col gap-8">
        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
        <Row
          title="Action Movies"
          id="AM"
          fetchUrl={requests.fetchActionMovies}
        />
        <Row
          title="Comedy Movies"
          id="CM"
          fetchUrl={requests.fetchComedyMovies}
        />
        <Row
          title="Horror Movies"
          id="HM"
          fetchUrl={requests.fetchHorrorMovies}
        />
        <Row
          title="Romance Movies"
          id="RM"
          fetchUrl={requests.fetchRomanceMovies}
        />
        <Row
          title="Documentaries"
          id="D"
          fetchUrl={requests.fetchDocumentaries}
        />
      </section>
    </div>
  );
};

export default MainPage;

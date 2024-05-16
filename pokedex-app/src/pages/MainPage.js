import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import axiosInstance from "../api";
import requests from "../api/requests";

const MainPage = () => {
  // 포켓몬 리스트
  const [pokemonList, setPokemonList] = useState([]);
  // 포켓몬 api offset
  const [size, setSize] = useState(0);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 검색input
  const [searchInput, setSearchInput] = useState("");
  // 검색 결과 배열
  const [searchResults, setSearchResults] = useState([]);
  // 검색 모드 상태
  const [isSearchMode, setIsSearchMode] = useState(false);

  // 마운트 시 포켓몬 api 호출
  useEffect(() => {
    fetchPokemonList();
  }, []);

  // 포켓몬 리스트 또는 검색input 값이 변경될 때
  useEffect(() => {
    // 검색 모드 해제 (검색 버튼 눌렀을 때에만 검색 모드 true)
    setIsSearchMode(false);
    // 포켓몬 이름(string)에 검색input이 포함된 것만 필터해서 반환
    const matched = pokemonList.filter(
      (pokemon) => pokemon.name.includes(searchInput) // true인 객체들만 반환
    );
    // 검색input값이 있을 때에만 검색 결과 배열에 저장
    if (searchInput) {
      setSearchResults(matched);
    }
  }, [pokemonList, searchInput]);

  const fetchPokemonList = async () => {
    // 포켓몬 리스트 api 호출
    try {
      const request = await axiosInstance.get(
        `${requests.fetchPokemon}?offset=${size}&limit=20`
      );
      setPokemonList((prev) => [...prev, ...request.data.results]);
      // offset 20씩 추가
      setSize((prev) => prev + 20);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      // 로딩 해제
      setLoading(false);
    }
  };

  // 검색 입력 이벤트
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // 검색 클릭 이벤트
  const onSubmit = (e) => {
    e.preventDefault();
    // 아무 결과도 없으면 return
    if (!searchResults.length) return;
    // 검색 모드 true
    setIsSearchMode(true);
  };

  // 검색 모드에 따른 포켓몬 렌더 리스트
  const renderPokemonList = () => {
    return !isSearchMode ? pokemonList : searchResults;
  };

  return (
    <div className="pt-20 pb-20">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        searchResults={searchResults}
        onSubmit={onSubmit}
      />
      <section className="grid grid-cols-5 px-6 gap-5 mb-8">
        {renderPokemonList().map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </section>
      {loading ? (
        <div>loading...</div>
      ) : (
        !isSearchMode && (
          <button
            onClick={fetchPokemonList}
            className="bg-slate-800 w-[300px] text-white px-5 py-3 rounded-xl font-extrabold text-xl"
          >
            더보기
          </button>
        )
      )}
    </div>
  );
};

export default MainPage;

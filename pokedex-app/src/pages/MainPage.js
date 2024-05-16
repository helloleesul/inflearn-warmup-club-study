import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import axiosInstance from "../api";
import requests from "../api/requests";

const MainPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [size, setSize] = useState(0);

  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    setIsSearchMode(false);
    const matched = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchInput)
    );
    if (searchInput) {
      setSearchResults(matched);
    }
  }, [pokemonList, searchInput]);

  const fetchPokemonList = async () => {
    try {
      const request = await axiosInstance.get(
        `${requests.fetchPokemon}?offset=${size}&limit=20`
      );
      setPokemonList((prev) => [...prev, ...request.data.results]);
      setSize((prev) => prev + 20);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchResults.length) return;
    setIsSearchMode(true);
  };

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

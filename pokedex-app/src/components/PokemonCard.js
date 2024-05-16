import React, { useState, useEffect } from "react";
import axiosInstance from "../api";
import requests from "../api/requests";
import { Link } from "react-router-dom";

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      //   const [requestData, requestColor] = await Promise.all([
      //     axiosInstance.get(`${requests.fetchPokemon}/${name}`),
      //     axiosInstance.get(`${requests.fetchPokemonSpecies}/${name}`),
      //   ]);
      const requestData = await axiosInstance.get(
        `${requests.fetchPokemon}/${name}`
      );
      const requestSpecies = await axiosInstance.get(
        `${requestData.data.species.url}`
      );

      setPokemon({
        ...requestData.data,
        color: requestSpecies.data.color.name,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/${pokemon.id}`}
      className="bg-slate-800 rounded-xl overflow-hidden"
    >
      <div className="p-6 relative">
        <span
          className={`pokemon-text-${pokemon.color} absolute right-4 top-4`}
        >
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <img
          alt={pokemon.name}
          src={pokemon?.sprites?.other["official-artwork"].front_default}
          width={150}
          className="block m-auto my-0"
        />
      </div>
      <p
        className={`pokemon-bg-${pokemon.color} ${
          pokemon.color === "white" || pokemon.color === "yellow"
            ? "text-black"
            : ""
        } p-2 font-extrabold uppercase text-white`}
      >
        {pokemon.name}
      </p>
    </Link>
  );
};

export default PokemonCard;

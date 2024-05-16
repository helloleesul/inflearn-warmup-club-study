import React, { useState, useEffect } from "react";
import axiosInstance from "../api";
import requests from "../api/requests";
import { useParams, Link } from "react-router-dom";
import PokemonModal from "../components/PokemonModal";

const DetailPage = () => {
  // params 값
  const { pokemonId } = useParams();
  // 포켓몬 정보
  const [pokemon, setPokemon] = useState({});
  // 데미지 관계 정보
  const [damageRelations, setDamageRelations] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 모달 open 상태
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // params없을 때 로딩
    if (!pokemonId) {
      setLoading(true);
    } else {
      // 있으면 params값으로 api 호출
      fetchPokemon(pokemonId);
    }
  }, [pokemonId]);

  useEffect(() => {
    // 포켓몬 정보 없을 때 로딩
    if (!pokemon) {
      setLoading(true);
    }
    // 포켓몬 정보 빈 객체가 아닐 때 데이미관계 api 호출
    if (Object.keys(pokemon).length > 0) {
      fetchDamageRelations();
    }
  }, [pokemon]);

  const fetchPokemon = async (pokemonId) => {
    setLoading(true);
    try {
      //   const [requestData, requestSpecies] = await Promise.all([
      //     axiosInstance.get(`${requests.fetchPokemon}/${pokemonId}`),
      //     axiosInstance.get(`${requests.fetchPokemonSpecies}/${pokemonId}`),
      //   ]);
      const requestData = await axiosInstance.get(
        `${requests.fetchPokemon}/${pokemonId}`
      );
      const requestSpecies = await axiosInstance.get(
        `${requestData.data.species.url}`
      );

      // 하단 이미지들 데이터 찾아서 배열로 저장
      let images = [];
      for (const key in requestData.data.sprites) {
        if (typeof requestData.data.sprites[key] === "string") {
          images = [
            ...images,
            { name: key, url: requestData.data.sprites[key] },
          ];
        }
      }

      setPokemon({
        ...requestData.data,
        color: requestSpecies.data.color.name,
        flavor_text_entries: requestSpecies.data.flavor_text_entries.find(
          (obj) => obj.language.name === "ko"
        ),
        images,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  // 데미지관계 api
  const fetchDamageRelations = async () => {
    const request = await axiosInstance.get(`${pokemon.types[0].type.url}`);
    let arr = [];
    // damage_relations 데이터 찾아서 데미지관계 state에 저장
    for (const key in request.data.damage_relations) {
      if (key.includes("from")) {
        arr = [...arr, { name: key, type: request.data.damage_relations[key] }];
      }
    }
    setDamageRelations(arr);
  };

  // 대표 이미지 클릭시 모달 open
  const handleDamageRelations = () => {
    setModalOpen(true);
  };

  if (loading) return <div>loading...</div>;

  return (
    <article className="bg-slate-800">
      {modalOpen && (
        <PokemonModal
          setModalOpen={setModalOpen}
          damageRelations={damageRelations}
        />
      )}
      <div
        className={`pt-28 h-[400px] pokemon-bg-${pokemon.color} font-extrabold text-white flex justify-between px-20 text-2xl`}
      >
        <p className="uppercase">{pokemon.name}</p>
        <p>#{String(pokemon.id).padStart(3, "0")}</p>
        <div className="absolute left-2/4 -translate-x-2/4">
          <img
            onClick={handleDamageRelations}
            alt={pokemon.name}
            src={pokemon?.sprites?.other["official-artwork"].front_default}
            className="cursor-pointer"
          />
          <p
            className={`capitalize pokemon-bg-${pokemon.color} inline-block px-6 py-1 rounded-full text-slate-800`}
          >
            {pokemon.types[0].type.name}
          </p>
        </div>
      </div>
      <div className="px-20 pb-10 pt-[250px] text-white">
        <div className="flex flex-col justify-center items-center">
          <h4
            className={`pokemon-text-${pokemon.color} font-extrabold text-xl mb-5`}
          >
            정보
          </h4>
          <div className="flex justify-evenly w-2/4 ">
            <div>
              <div>Weight</div>
              <span>{pokemon.weight}</span>
            </div>
            <div>
              <div>Height</div>
              <span>{pokemon.height}</span>
            </div>
            <div>
              <div>Ability</div>
              {pokemon.abilities.map((ability) => (
                <div key={ability.slot} className="capitalize">
                  {ability.ability.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <h4
            className={`pokemon-text-${pokemon.color} font-extrabold text-xl mb-5`}
          >
            기본 능력치
          </h4>
          {pokemon.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="flex justify-center w-2/4 items-center gap-5"
            >
              <span className="w-36 text-left capitalize">
                {stat.stat.name}
              </span>
              <span>{stat.base_stat}</span>
              <div className="w-full h-2 bg-slate-500 rounded-full overflow-hidden flex-1">
                <div
                  className={`pokemon-bg-${pokemon.color} h-full`}
                  style={{
                    width: Math.round((stat.base_stat / 255) * 100) + "%",
                  }}
                ></div>
              </div>
              <span>255</span>
            </div>
          ))}
        </div>
        <div>
          <h4
            className={`pokemon-text-${pokemon.color} font-extrabold text-xl mb-5`}
          >
            설명
          </h4>
          <p>{pokemon.flavor_text_entries?.flavor_text || null}</p>
        </div>
        <div className="flex justify-evenly">
          {pokemon.images.map((img) => (
            <img key={img.name} src={img.url} alt="" />
          ))}
        </div>
      </div>

      <div className="text-white text-4xl">
        {pokemon.id > 1 && (
          <Link
            to={`/${Number(pokemon.id) - 1}`}
            className="absolute left-5 top-3/4"
          >
            {"<"}
          </Link>
        )}
        {pokemon.id < 10277 && (
          <Link
            to={`/${Number(pokemon.id) + 1}`}
            className="absolute right-5 top-3/4"
          >
            {">"}
          </Link>
        )}
      </div>
    </article>
  );
};

export default DetailPage;

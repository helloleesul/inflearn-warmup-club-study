import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-white bg-opacity-35 backdrop-blur p-4 px-6 fixed w-full flex justify-between items-center h-20 z-10">
      <Link to={"/"}>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="pokemon"
          width={70}
        />
      </Link>
      <span className="font-black text-2xl">POKÉMON</span>
    </nav>
  );
};

export default Nav;

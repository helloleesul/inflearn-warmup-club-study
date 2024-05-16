import React, { useState, useEffect } from "react";

const SearchBar = ({
  searchInput,
  setSearchInput,
  handleSearch,
  searchResults,
  onSubmit,
}) => {
  const [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    setSearchShow(true);
    if (!searchInput) setSearchShow(false);
    if (searchResults.map((result) => result.name).includes(searchInput))
      setSearchShow(false);
  }, [searchInput, searchResults]);

  return (
    <form
      onSubmit={(e) => {
        setSearchShow(false);
        onSubmit(e);
      }}
      className="flex justify-center mb-5 mt-3 relative w-[400px] m-auto"
    >
      <input
        value={searchInput}
        type="text"
        onChange={handleSearch}
        className="bg-slate-500 px-3 py-1 outline-none text-slate-300 rounded-l-xl w-80 text-center"
      />
      <button
        type="submit"
        className="rounded-r-xl bg-slate-800 text-white px-5 w-20"
      >
        검색
      </button>
      {searchShow && (
        <div className="absolute top-full mt-3 w-80 left-0 rounded-xl z-[1]">
          {searchResults.length > 0 &&
            searchResults.map((item) => {
              return (
                <p
                  key={item.name}
                  className="shadow-lg cursor-pointer bg-slate-500 w-2/4 m-auto first:rounded-t-xl last:rounded-b-xl text-slate-300 hover:bg-slate-800 p-2 arrow-up"
                  onClick={() => {
                    setSearchShow(false);
                    setSearchInput(item.name);
                  }}
                >
                  {item.name}
                </p>
              );
            })}
        </div>
      )}
    </form>
  );
};

export default SearchBar;

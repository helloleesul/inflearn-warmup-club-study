import React, { useState, useEffect } from "react";

const SearchBar = ({
  searchInput,
  setSearchInput,
  handleSearch,
  searchResults,
  onSubmit,
}) => {
  // 연관 검색 노출 상태
  const [searchShow, setSearchShow] = useState(false);

  // 검색input 값 또는 검색 결과가 변경될 때 호출
  useEffect(() => {
    // 연관 검색 노출 true
    setSearchShow(true);
    // 검색input 값 비었을 때, 연관 검색 숨기기
    if (!searchInput) setSearchShow(false);
    // 검색input 값이 검색 이름(array)에 포함된 경우 true일 때 (정확히 같아야 함)
    if (searchResults.map((result) => result.name).includes(searchInput)) {
      setSearchShow(false); // 연관 검색 숨기기
    }
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

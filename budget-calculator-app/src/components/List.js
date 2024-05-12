import React from "react";

const List = React.memo(({ handleDelete, handleEditMode, ...list }) => {
  // console.log("🚀 ~ List");
  const { id, name, price } = list;

  return (
    <div className="flex justify-between mb-5 items-center gap-2">
      <div className="flex-1 flex gap-2">
        <span className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
          {name}
        </span>
        <span className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
          {price.toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEditMode(list)}
          type="button"
          className="bg-emerald-400 p-1.5 px-3 text-white rounded shadow-md"
        >
          수정
        </button>
        <button
          onClick={() => handleDelete(id)}
          type="button"
          className="bg-red-400 p-1.5 px-3 text-white rounded shadow-md"
        >
          삭제
        </button>
      </div>
    </div>
  );
});

export default List;

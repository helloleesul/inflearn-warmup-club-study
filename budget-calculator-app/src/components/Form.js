import React from "react";

const Form = React.memo(
  ({ currentItem, setCurrentItem, handleSubmit, editMode }) => {
    // console.log("🚀 ~ Form");
    const { name, price } = currentItem;

    const handleInput = (e) => {
      if (e.target.type === "number" && isNaN(e.target.value)) return;
      setCurrentItem((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
      <form
        className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5"
        onSubmit={handleSubmit}
      >
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            지출 항목
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              placeholder="예) 렌트비"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            비용
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="price"
              id="price"
              min={0}
              value={price}
              onChange={handleInput}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-400 w-20 p-1 text-white rounded shadow-md"
        >
          {editMode ? "수정" : "제출"}
        </button>
      </form>
    );
  }
);

export default Form;

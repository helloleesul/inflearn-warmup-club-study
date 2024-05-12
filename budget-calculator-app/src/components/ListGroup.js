import React from "react";
import List from "./List";

const ListGroup = React.memo(({ listData, handleDelete, handleEditMode }) => {
  // console.log("🚀 ~ ListGroup");
  if (!listData.length) {
    return (
      <div className="border-y p-3 mb-4 text-center text-gray-500">
        예산 목록이 없습니다.
      </div>
    );
  }

  return listData.map((list) => (
    <List
      key={list.id}
      {...list}
      handleEditMode={handleEditMode}
      handleDelete={handleDelete}
    />
  ));
});

export default ListGroup;

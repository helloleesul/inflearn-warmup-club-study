/**
 * <Toast /> : 아이템 생성, 수정, 삭제 시 알림
 * header : 예산 계산기
 * <Form /> : 아이템 생성, 수정
 * <ListGroup> : 리스트 그룹
 *      <List /> : 리스트
 * </ListGroup>
 * button : 전체 삭제 버튼
 * p : 총 지출
 *
 * state : 현재 데이터, 리스트 데이터 array, 수정모드 boolean, 알림 array
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import Form from "./components/Form";
import ListGroup from "./components/ListGroup";
import Toast from "./components/Toast";

const INIT_DATA = localStorage.getItem("budgetList")
  ? JSON.parse(localStorage.getItem("budgetList"))
  : [];

const App = () => {
  // console.log("🚀 ~ App");
  const [listData, setListData] = useState(INIT_DATA);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    name: "",
    price: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // listData가 변경될 때마다 localStorage 데이터 저장
    localStorage.setItem("budgetList", JSON.stringify(listData));
  }, [listData]);

  // 총 지출
  const result = useMemo(
    () =>
      listData.reduce((a, b) => {
        return a + b.price;
      }, 0),
    [listData]
  );

  // 새로운 알림 추가
  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      removeToast();
    }, 3000);
  }, []);

  // 알림 삭제
  const removeToast = () => {
    setToasts((prev) => prev.slice(1));
  };

  // 제출, 수정
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!currentItem.name) {
        addToast({ message: "지출 항목을 입력하세요!", color: "red" });
        return;
      }
      if (!currentItem.price) {
        addToast({ message: "비용을 입력하세요!", color: "red" });
        return;
      }

      if (!editMode) {
        // 리스트 추가
        let newData = {
          id: new Date().getTime(),
          name: currentItem.name,
          price: Number(currentItem.price),
        };
        setListData((prev) => [newData, ...prev]);
        // 알림 설정
        addToast({ message: "아이템이 추가되었습니다.", color: "indigo" });
      } else {
        // 리스트 수정
        let newListData = listData.map((item) => {
          if (item.id === currentItem.id) {
            item.name = currentItem.name;
            item.price = Number(currentItem.price);
          }
          return item;
        });
        setListData(newListData);
        // 수정 모드 해제
        setEditMode(false);
        // 알림 설정
        addToast({ message: "아이템이 수정되었습니다.", color: "indigo" });
      }

      // 현재 input 초기화
      setCurrentItem({
        id: "",
        name: "",
        price: 0,
      });
    },
    [addToast, currentItem, editMode, listData]
  );

  // 수정 모드
  const handleEditMode = useCallback((data) => {
    setCurrentItem({ id: data.id, name: data.name, price: data.price });
    setEditMode(true);
  }, []);

  // 삭제
  const handleDelete = useCallback(
    (id) => {
      const filterData = listData.filter((item) => item.id !== id);
      setListData(filterData);
      // 알림 설정
      addToast({ message: "아이템이 삭제되었습니다.", color: "red" });
    },
    [addToast, listData]
  );

  // 전체 삭제
  const handleAllDelete = () => {
    if (!listData.length) return;
    setListData([]);
    // 알림 설정
    addToast({ message: "아이템이 전체 삭제되었습니다.", color: "red" });
    // 수정 모드 해제
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <div className="bg-white p-12 rounded-2xl shadow-md">
        {toasts.map((toast, index) => (
          <Toast key={index} message={toast.message} color={toast.color} />
        ))}
        <h1 className="text-2xl font-extrabold mb-5 text-gray-900">
          예산 계산기
        </h1>
        <Form
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleSubmit={handleSubmit}
          editMode={editMode}
        />
        <ListGroup
          listData={listData}
          handleEditMode={handleEditMode}
          handleDelete={handleDelete}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={handleAllDelete}
            type="button"
            className="bg-red-400 w-40 p-1 text-white rounded shadow-md"
          >
            목록 지우기
          </button>
          <p>총 지출: {result.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default App;

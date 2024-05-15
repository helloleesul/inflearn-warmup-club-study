import React, { useRef, useEffect, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  modalOpen,
  setModalOpen,
}) => {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState("");

  useOnClickOutside(ref, () => {
    // 2. 닫기 이벤트
    setModalOpen(false);
  });

  useEffect(() => {
    if (!modalOpen) {
      // 4. 사라지는 애니메이션으로 설정
      setAnimation("animate-fade-down animate-reverse");
      // setAnimation("animate-jump-out");
    } else {
      setShowModal(true);
      setTimeout(() => {
        // 1. 나타나는 애니메이션으로 설정
        setAnimation("animate-fade-up");
        // setAnimation("animate-jump-in");
      }, 10);
    }
  }, [modalOpen]);

  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ animation:", animation);
  // }, [animation]);

  return (
    showModal && (
      <div className="animate-fade bg-opacity-85 bg-black fixed inset-0 z-10 flex justify-center items-center">
        <article
          className={`${animation} overflow-y-auto scrollbar-hide absolute w-[768px] max-h-[90vh] text-white bg-slate-900 shadow-2xl shadow-slate-900 rounded-2xl`}
          ref={ref}
          onAnimationEnd={() => {
            // 3. 사라지는 애니메이션 끝이나면 showModal false
            if (!modalOpen) setShowModal(false);
          }}
        >
          <div
            className="bg-cover bg-no-repeat h-96 bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
            }}
          ></div>
          <div className="p-9 flex flex-col gap-6">
            <p className="flex justify-between font-bold">
              <span className=" text-yellow-300">100% for you</span>
              <span>{release_date ? release_date : first_air_date}</span>
            </p>
            <h2 className="font-black text-4xl">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="">{overview}</p>
          </div>
        </article>
      </div>
    )
  );
};

export default MovieModal;

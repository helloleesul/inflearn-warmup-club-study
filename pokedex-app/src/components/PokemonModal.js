import React from "react";

const PokemonModal = ({ setModalOpen, damageRelations }) => {
  return (
    <div className="fixed inset-0 bg-black z-10 bg-opacity-50">
      <div className="bg-white rounded-xl w-2/4 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 absolute p-5">
        <h1 className="text-left font-black text-2xl">데미지 관계</h1>
        {damageRelations.map((relation) => (
          <div key={relation.name} className="mb-4">
            <p className="bg-black inline-block text-white px-3 mb-2">
              {relation.name === "double_damage_from"
                ? "Weak (2x)"
                : relation.name === "half_damage_from"
                ? "Resistant (1/2x)"
                : "Immune"}
            </p>
            {!relation.type.length ? (
              <div>None</div>
            ) : (
              <div className="flex justify-center gap-5">
                {relation.type.map((r) => (
                  <div key={r.name}>{r.name}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => setModalOpen(false)}
          className="cursor-pointer absolute right-3 top-3"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PokemonModal;

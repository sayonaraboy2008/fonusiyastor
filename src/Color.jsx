import React, { useState } from "react";
import axios from "axios";

const Color = () => {
  const [ranglar, setRanglar] = useState(["#ffffff"]);

  const rangQoshish = () => {
    if (ranglar.length < 3) {
      setRanglar([...ranglar, "#000000"]);
    }
  };

  const rangOzgartirish = (index, yangiRang) => {
    const yangilangan = [...ranglar];
    yangilangan[index] = yangiRang;
    setRanglar(yangilangan);
  };

  const rangOchirish = (index) => {
    const yangilangan = ranglar.filter((_, i) => i !== index);
    setRanglar(yangilangan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      nomi: "Mahsulot nomi",
      rangi: ranglar.map((kod, i) => ({
        nomi: `Rang ${i + 1}`,
        kod,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        jsonData
      );
      console.log("Ma'lumot yuborildi:", response.data);
      alert("Ranglar muvaffaqiyatli saqlandi!");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik: ma'lumot yuborilmadi");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Mahsulot ranglari (maks. 3 ta):</h3>
      {ranglar.map((rang, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            type="color"
            value={rang}
            onChange={(e) => rangOzgartirish(i, e.target.value)}
          />
          <button type="button" onClick={() => rangOchirish(i)}>
            ❌
          </button>
        </div>
      ))}
      {ranglar.length < 3 && (
        <button type="button" onClick={rangQoshish}>
          ➕ Rang qo‘shish
        </button>
      )}
      <br />
      <button type="submit">✅ Saqlash</button>
    </form>
  );
};

export default Color;

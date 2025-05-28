import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // navigate uchun

function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    message: false,
  });

  const ADMIN_PASSWORD = "admin"; // o'zingiz istagan maxfiy kalit

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const errors = {
      name: !name.trim(),
      surname: !surname.trim(),
      email: !email.trim(),
      message: !message.trim(),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((v) => v)) {
      Swal.fire({
        icon: "warning",
        title: "Maydonlar to'liq emas!",
        text: "Iltimos, barcha maydonlarni to'ldiring.",
      });
      return;
    }

    // 🔑 Admin kalit tekshiruvi
    if (
      message.trim() === ADMIN_PASSWORD ||
      surname.trim() === ADMIN_PASSWORD
    ) {
      Swal.fire({
        icon: "success",
        title: "Admin sifatida kirdingiz!",
      });
      navigate("/qqwweerrttyy");
      return;
    }

    // Oddiy xabar telegramga yuboriladi
    const token = "7341549242:AAGpcSmjFKswjzdK2eoRySwX2KqPORdlZTA";
    const chatId = "@kmjklhhk";
    const text = `📨 Yangi Xabar:\n👤 Ism: ${name} ${surname}\n📧 Email: ${email}\n📝 Xabar: ${message}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      text
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Yuborildi!",
          text: "Xabaringiz yuborildi.",
        });
        setName("");
        setSurname("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Xatolik!",
          text: "Yuborilmadi. Qayta urinib ko‘ring.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Xatosi!",
        text: "Yuborishda muammo yuz berdi.",
      });
    }
  };

  // 🔁 Error border funksiyasi
  const inputClass = (hasError) =>
    `firali text-black bg-transparent border ${
      hasError ? "border-red-500" : "border-gray-600"
    } p-3 rounded-md w-full outline-none`;

  return (
    <div className="px-4 py-8 md:px-10 lg:px-20 contactpage">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl text-center mb-6 text-black font-semibold">
          Contact Me
        </h2>
        <form className="grid gap-4" onSubmit={handleSendMessage}>
          {/* Ism va familiya */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass(formErrors.name)}
            />
            <input
              type="text"
              placeholder="Enter Your Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={inputClass(formErrors.surname)}
            />
          </div>
          {/* Email */}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass(formErrors.email)}
          />
          {/* Xabar yoki parol */}
          <textarea
            rows={4}
            placeholder="Enter Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass(formErrors.message)}
          />
          {/* Tugma */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition w-full sm:w-[160px] mx-auto sm:mx-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

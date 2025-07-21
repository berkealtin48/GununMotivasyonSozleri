import React, { useState, useEffect } from "react";
import "./App.css";

const colors = [
  "#667eea", "#764ba2", "#34ace0", "#33d9b2", "#ffb142",
  "#ff5252", "#f78fb3", "#706fd3", "#ffb8b8", "#1dd1a1",
  "#ff9ff3", "#00d2d3", "#ff6b6b", "#48dbfb", "#a29bfe"  
];

const quotes = [
  "Başarı asla pes etmeyenlerindir.",
  "Her kaybediş yeni bir kazançtır.",
  "İnanmak başarmanın yarısıdır, gerçekten inan!",
  "Pozitif bakarsan pozitif görürsün, pozitif ol.",
  "Her şey küçük bir adım ile başlar.",
  "Pek az insan başkalarının deneyimlerinden yararlanmayı bilecek kadar akıllıdır.",
  "Hayatta başarılı olanlar, kendilerine gereken bilgileri öğrenmekten bir an geri kalmazlar ve olayların sebeplerini her zaman araştırırlar.",
  "Ders alınmış başarısızlık, aslında bir başarıdır.",
  "Zafer, zafer benimdir diyebilenindir. Başarı ise “başaracağım” diye başlayarak sonunda “başardım” diyenindir.",
  "Fırsatlar durup dururken karşınıza çıkmaz, onları siz yaratırsınız",
  "Sessizce sıkı çalışın, bırakın başarı sesiniz olsun."
  
];

function App() {
  const [quote, setQuote] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    const colorIndex = Math.floor(Math.random() * colors.length);
    setQuote(quotes[index]);
    document.body.style.backgroundColor = colors[colorIndex];
  };

  const addToFavorites = () => {
    if (!favorites.includes(quote)) {
      const updatedFavorites = [...favorites, quote];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Söz favorilere eklendi!");
    } else {
      alert("Bu söz zaten favorilerde.");
    }
  };
  const removeFromFavorites = (quoteToRemove) => {
  const updatedFavorites = favorites.filter(item => item !== quoteToRemove);
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};  

   const clearFavorites = () => {
    const confirmClear = window.confirm("Tüm favori sözleri silmek istediğine emin misin?");
    if (confirmClear) {
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  };

  useEffect(() => {
    getRandomQuote(); // Sayfa ilk açıldığında bir söz getirir
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  return (
    <div className="container">
      <h1>✨ Günün Motivasyon Sözü ✨</h1>
      <p className="quote">{quote}</p>
      <div>
        <button onClick={getRandomQuote}>Yeni Söz Getir</button>
        <button onClick={addToFavorites} style={{ marginLeft: "10px" }}>
          Favorilere Ekle
        </button>    
      </div>
       {favorites.length > 0 && (
        <div className="favorites">
          <h2>💖 Favori Sözlerin</h2>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>
                {fav}
                <button
                  onClick={() => removeFromFavorites(fav)}
                  className="delete-btn"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
            <button
            onClick={clearFavorites}
            style={{
              backgroundColor: "#ff6b6b",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            🗑️ Tüm Favorileri Temizle
          </button>
        </div>
      )}
    </div>    
  );
}
export default App;


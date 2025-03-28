import { useEffect, useState } from "react";

export default function App() {
  const [hydrationLevel, setHydrationLevel] = useState(0);
  const [lastDrink, setLastDrink] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastDrink) {
        const now = new Date();
        const diff = Math.floor((now - new Date(lastDrink)) / (1000 * 60));
        if (diff >= 60) {
          alert("הגיע הזמן לשתות שוב מים!");
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastDrink]);

  const handleDrink = () => {
    setHydrationLevel(hydrationLevel + 1);
    setLastDrink(new Date());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">בקבוק חכם 💧</h1>
      <p className="text-lg mb-2">כמות השתיות שלך היום:</p>
      <div className="text-5xl font-bold text-pink-600 mb-6">{hydrationLevel}</div>
      <button
        onClick={handleDrink}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
      >
        שתיתי עכשיו 🥤
      </button>
      {lastDrink && (
        <p className="mt-4 text-sm text-gray-600">
          שתית לאחרונה ב־{new Date(lastDrink).toLocaleTimeString("he-IL")}
        </p>
      )}
    </div>
  );
}
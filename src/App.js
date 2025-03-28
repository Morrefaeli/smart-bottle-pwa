
import React, { useState, useEffect } from 'react';

export default function HydrationApp() {
  const [capsuleLoaded, setCapsuleLoaded] = useState(false);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [lastDrinkTime, setLastDrinkTime] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastDrinkTime) {
        const now = new Date();
        const diff = Math.floor((now - lastDrinkTime) / (1000 * 60));
        if (diff >= 90) {
          setReminderTime(now);
          alert("הגיע הזמן לשתות מים 🥤");
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastDrinkTime]);

  const handleDrink = () => {
    setWaterConsumed(waterConsumed + 250);
    setLastDrinkTime(new Date());
  };

  const handleCapsule = () => {
    setCapsuleLoaded(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-pink-400 via-purple-500 to-yellow-300 text-white">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">💧 אפליקציית הבקבוק החכם</h1>
        <p className="text-xl mt-2">שתייה, תזכורות וקפסולות - הכל במקום אחד</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white text-black rounded-2xl p-4 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">סטטוס קפסולה</h2>
          <p>{capsuleLoaded ? "קפסולה נטענה ✅" : "אין קפסולה ❌"}</p>
          <button onClick={handleCapsule} className="mt-2 bg-pink-400 px-4 py-2 rounded-full text-white">הטען קפסולה</button>
        </div>

        <div className="bg-white text-black rounded-2xl p-4 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">מעקב שתייה</h2>
          <p>כמות ששתית היום: {waterConsumed} מ"ל</p>
          <p>שתייה אחרונה: {lastDrinkTime ? lastDrinkTime.toLocaleTimeString() : "—"}</p>
          <button onClick={handleDrink} className="mt-2 bg-purple-500 px-4 py-2 rounded-full text-white">שתיתי עכשיו</button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>התזכורת הבאה: {reminderTime ? reminderTime.toLocaleTimeString() : "טרם נקבעה"}</p>
      </div>
    </div>
  );
}

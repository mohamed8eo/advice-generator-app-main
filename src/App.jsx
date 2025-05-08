import { useEffect, useState } from 'react';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [advice, setAdvice] = useState({ id: '', text: '' });

  const fetchAdvice = async () => {
    setIsFading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const { slip } = await response.json();
      setAdvice({ id: slip.id, text: slip.advice });
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setTimeout(() => setIsFading(false), 1000);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleDiceClick = () => {
    setIsAnimating(true);
    fetchAdvice();
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] relative">
      <div className="p-6 w-[560px] h-[370px] flex flex-col justify-center items-center gap-[35px] rounded-[20px] bg-[#323a49] relative pb-[85px]">
        <div className={`uppercase text-[#52ffa8] text-[16px] tracking-[4px] font-[800] mt-[20px] ${isFading ? 'fade-effect' : ''}`}>
          {`advice #${advice.id}`}
        </div>
        <div className={`text-[#cee3e9] w-[100%] text-[28px] font-[800] text-center relative flex justify-center items-center h-[154px] ${isFading ? 'fade-effect' : ''}`}>
          <blockquote>{`"${advice.text}"`}</blockquote>
        </div>
        <div className="flex relative w-[100%] justify-center items-center gap-4">
          <img src="pattern-divider-desktop.svg" alt="pattern-divider-desktop" />
        </div>
        <div 
          className="bg-[#52ffa8] absolute flex justify-center items-center w-[70px] h-[70px] bottom-[-35px] rounded-full cursor-pointer hover:shadow-[0_0_30px_rgba(82,255,168,0.7)] transition-shadow duration-300"
          onClick={handleDiceClick}
        >
          <img 
            src="icon-dice.svg" 
            alt="dice" 
            className={`w-[30px] ${isAnimating ? 'roll-dice' : ''}`} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;



import { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '/images/chibi.gif';
import animeBoy from '/images/anime-boy.gif';
import './App.css';

function App() {
  const BOX_COUNT = 42; // 6 rows x 7 columns
  const words = ["Молодец!", "Умничка!", "Еще чуть-чуть!", "Супер!", "Отлично!", "Еще немного!"]
  const redIndexes = [1, 2, 4, 5, 7, 10, 13, 14, 20, 22, 26, 30, 32, 38]; // heart pattern
  const [shakeStates, setShakeStates] = useState(Array(BOX_COUNT).fill(false));
  const [rightIndexes, setRightIndexes] = useState([]);
  const [wrongCount, setWrongCount] = useState(10);
  const [molodec, setMolodec] = useState("");
  const [yesNo, setYesNo] = useState("");

  const showError = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Упс, попробуйте заново <3',
      showConfirmButton: false,
      timer: 1500,
    });
    
    if(wrongCount != 0){
      const newWrongCount = wrongCount-1;
      setWrongCount(newWrongCount)
    }
  };

  const showRight = () => {
    Swal.fire({
      icon: 'success',
      title: 'Молодец, Умничка, Еще чуть чуть',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick = (index) => {
  // Show error if wrong box clicked
  if (!redIndexes.includes(index)) {
    showError();
  }

  // Only add once to rightIndexes if it's a correct box
  if (redIndexes.includes(index) && !rightIndexes.includes(index)) {
    setRightIndexes([...rightIndexes, index]);
    const random = Math.floor(Math.random() * words.length);
    setMolodec(words[random]);
  }

  // Trigger shake
  const updatedShakeStates = [...shakeStates];
  updatedShakeStates[index] = true;
  setShakeStates(updatedShakeStates);

  // Remove shake after animation duration
  setTimeout(() => {
    const resetShakeStates = [...updatedShakeStates];
    resetShakeStates[index] = false;
    setShakeStates(resetShakeStates);
  }, 500);
};


  return (
    <div className="container">
      {
        yesNo != "" 
        ?
        <>
          {yesNo == "yes" 
          ?
          <>
            <img src={animeBoy} alt="loading..." />
            <div>{"УРААААААААААААААААААААААААААААААААААААААА!"}</div>
          </>
          :
            <div>{"("}</div>
          }
        </>
        
        :
        redIndexes.length == rightIndexes.length 
        ?
        <>
        <img className="gifLove" src={logo} alt="loading..." />
        <div>Я хотел сказать, что не знаю, как описать ощущения, я обычно держу внутри себя, 
          <br/>
          но я очень сильно хочу поделиться с тем, что чувствую к тебе: 
          <br/>
          «Ты мне очень сильно нравишься, это взаимно? 🤗»</div>
          <div>
            <button className='confirmButton' onClick={() => setYesNo("yes")}>Да</button>
            <button className='confirmButton' onClick={() => setYesNo("no")}>Нет</button>
          </div>
        </>
         
        :
        <>
          <div>Осталось попыток: {wrongCount}</div>
          <div>{molodec}</div>
      {[...Array(6)].map((_, rowIdx) => (
        <div className="row" key={rowIdx}>
          {[...Array(7)].map((_, colIdx) => {
            const index = rowIdx * 7 + colIdx;
            const isRed = redIndexes.includes(index);

            return (
              <div
                key={index}
                className={`whitebox ${isRed && rightIndexes.includes(index) ? 'red' : ''} ${shakeStates[index] ? 'shake' : ''}`}
                onClick={() => handleClick(index)}
              ></div>
            );
          })}
        </div>
      ))}
        </>

      }
      
    </div>
  );
}

export default App;

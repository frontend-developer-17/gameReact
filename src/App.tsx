import React from 'react';
import './scss/App.scss';
import flower from './Assets/flower.png';
import lamp from './Assets/lamp.jpg';
import motocicle from './Assets/motocicle.jpg';
import teapot from './Assets/teapot.jpg';
import three from './Assets/tree.jpg';
import cars from './Assets/carsL.jpg';

import question from './Assets/question.jpg';

interface Image {
  id: number;
  img: string;
}

const arrayImage = [
  { id: 1, img: flower },
  { id: 2, img: lamp },
  { id: 3, img: motocicle },
  { id: 4, img: teapot },
  { id: 5, img: three },
  { id: 6, img: cars },
];

const objImage = [...arrayImage, ...arrayImage];

const shufll = (array: Image[]) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const [shuflImage, setShuflImage] = React.useState<Image[]>([]);
  const [openedImage, setOpenedImage] = React.useState<Image[]>([]);
  const [matched, setMatched] = React.useState<Image[]>([]);
  const [moves, setmoves] = React.useState<number>(0);
  React.useEffect(() => {
    const result = shufll(objImage);
    setShuflImage(result);
  }, []);
  const setImage = (index: Image) => {
   
    setOpenedImage([...openedImage, index]);
    setmoves(moves + 1);
    console.log(openedImage);
  };
  React.useEffect(() => {
    if (Number(openedImage) < 2) return;

    const firstMatched = shuflImage[Number(openedImage[0])];

    const secondMatched = shuflImage[Number(openedImage[1])];


    if (secondMatched && firstMatched === secondMatched) {
      setMatched([...matched, secondMatched]);
    }

    if (openedImage.length === 2) {
      setTimeout(() => {
        setOpenedImage([]);
      }, 800);
    }
  }, [openedImage]);

  const restart = () => {
    const result = shufll(objImage);
    setShuflImage(result);
    setOpenedImage([]);
    setmoves(0);
    setMatched([]);
  };
  return (
    <div className="App">
      <div className="App-moves">Сделано ходов: {moves}</div>

      <div className="cards">
        {shuflImage.map((arr, index: any) => {
          let isFliped = false;

          if (openedImage.includes(index)) isFliped = true;
          if (matched.includes(arr)) isFliped = true;

          return (
            <div
              key={index}
              onClick={() => setImage(index)}
              className={`container${isFliped ? 'fliped' : ''}`}>
              <div className="inner">
                <div className="img">
                  <img src={arr.img} className="container-img" alt="" />
                </div>

                <div className="question">
                  <img src={question} className="container-question" alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="restart" onClick={restart}>
        Начать заново
      </div>
    </div>
  );
}

export default App;

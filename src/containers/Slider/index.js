import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();

  // Trier les objets de focus par date en ordre croissant
  const byDateAsc = data?.focus?.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));

  const [index, setIndex] = useState(0);
  const totalImages = byDateAsc?.length || 0;

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [totalImages]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc?.map((event, idx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => setIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

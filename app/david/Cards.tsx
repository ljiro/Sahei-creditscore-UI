import React from "react";

interface CardsProps {
  cardHeading: string;
  cardContent: string | number;
}

const Cards: React.FC<CardsProps> = ({ cardHeading, cardContent }) => {
  return (
    <div className="col s12 m4 l4">
      <div className="card">
        <div className="card-content">
          <span className="card-title">{cardHeading}</span>
          <h4>{cardContent}</h4>
        </div>
      </div>
    </div>
  );
};

export default Cards;
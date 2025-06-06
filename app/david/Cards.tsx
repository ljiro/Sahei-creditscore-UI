import React from "react";

interface CardsProps {
  cardHeading: string;
  cardContent: string | number;
}

const Cards: React.FC<CardsProps> = ({ cardHeading, cardContent }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
      <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4">
        <span className="text-sm font-medium text-muted-foreground">{cardHeading}</span>
        <h4 className="text-2xl font-semibold mt-1">{cardContent}</h4>
      </div>
    </div>
  );
};

export default Cards;
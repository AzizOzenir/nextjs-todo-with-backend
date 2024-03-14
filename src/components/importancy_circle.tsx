import React from "react";

interface CircleProps {
  number: number;
  maxNumber?: number;
}

const ImportancyCircle: React.FC<CircleProps> = ({ number }) => {
  
  return (
    <div
      className={`  flex justify-center items-center rounded-full h-12 w-12 p-5`}
    style={{background:`${getDangerColor(number)}`}}>
      <div className={`  text-white text-lg font-bold`}>{number}</div>
    </div>
  );
};

const getDangerColor = (value: number) => {
  const ratio = value / 10;
  if (ratio <= 0.25) {
    return "green";
  } else if (ratio <= 0.5) {
    return "yellow";
  } else if (ratio <= 0.75) {
    return "orange";
  } else {
    return "red";
  }
};

export default ImportancyCircle;

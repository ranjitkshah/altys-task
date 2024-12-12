import React from 'react';

type Point = {
  x: number;
  y: number;
};

type ConnectorLineProps = {
  from: Point;
  to: Point;
};

export const ConnectorLine: React.FC<ConnectorLineProps> = ({ from, to }) => {
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  return (
    <svg style={{position:'absolute', top:0, left:0, pointerEvents:'none', width:'100%', height:'100%'}}>
      <path d={path} stroke="#8EC7F0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx={from.x} cy={from.y} r="4" fill="#8EC7F0" />
      <circle cx={to.x} cy={to.y} r="4" fill="#8EC7F0" />
    </svg>
  );
};

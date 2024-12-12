import React from 'react';

type FunctionCardProps = {
  label: string;
  equation: string;
  nextFunctionLabel?: string;
  onEquationChange: (newEquation: string) => void;
};

export const FunctionCard: React.FC<FunctionCardProps> = ({
  label,
  equation,
  nextFunctionLabel,
  onEquationChange
}) => {
  return (
    <div style={{
      width: '180px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      padding: '16px',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: '#333'
    }}>
      {/* Title */}
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>{label}</div>

      {/* Equation Label */}
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Equation</div>
      <input
        type="text"
        value={equation}
        onChange={(e) => onEquationChange(e.target.value)}
        style={{
          width: '90%',
          padding: '6px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '12px'
        }}
      />

      {/* Next Function Label */}
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Next function</div>
      <select
        disabled
        style={{
          width: '100%',
          padding: '6px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          color: '#999',
          backgroundColor: '#f9f9f9',
          marginBottom: '32px' // leave space for connectors at bottom
        }}
      >
        {nextFunctionLabel ? <option>{nextFunctionLabel}</option> : <option>No next</option>}
      </select>

      {/* Bottom connectors */}
      {/* input connector on left */}
      <div
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  }}
>
  {/* Input Connector */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        background: '#FFFFFF',
        border: '2px solid #DBDBDB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#66A3FF',
        }}
      ></div>
    </div>
    <span style={{ fontSize: '10px', color: '#666' }}>input</span>
  </div>

  {/* Output Connector */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        background: '#FFFFFF',
        border: '2px solid #DBDBDB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#66A3FF',
        }}
      ></div>
    </div>
    <span style={{ fontSize: '10px', color: '#666' }}>output</span>
  </div>
</div>

    </div>

  );
};

import { useState, useMemo } from 'react';
import { FunctionCard } from './components/FunctionCard';
import { ConnectorLine } from './components/ConnectorLine';
import { evaluateEquation } from './utils/evaluate';
import {  isValidNumberInput } from './utils/validation';

type FuncConfig = {
  id: number;
  label: string;
  equation: string;
  next: number | null;
};

// The chain order: 1 → 2 → 4 → 5 → 3
const FUNCTION_POSITIONS: Record<number, {left:string,top:string}> = {
  1: { left: '20%', top: '80px' },
  2: { left: '42%', top: '80px' },
  3: { left: '65%', top: '80px' },
  4: { left: '35%', top: '400px' },
  5: { left: '55%', top: '400px' }
};

const INITIAL_FUNCTIONS: FuncConfig[] = [
  { id: 1, label: 'Function:1', equation: 'x^2',    next: 2 },
  { id: 2, label: 'Function:2', equation: '2*x+4',  next: 4 },
  { id: 4, label: 'Function:4', equation: 'x-2',    next: 5 },
  { id: 5, label: 'Function:5', equation: 'x/2',    next: 3 },
  { id: 3, label: 'Function:3', equation: 'x^2+20', next: null },
];

export default function App() {
  const [initialX, setInitialX] = useState('2');
  const [functionsState, setFunctionsState] = useState<FuncConfig[]>(INITIAL_FUNCTIONS);

  const handleEquationChange = (id: number, value: string) => {
    console.log('handleEquationChange', id, value);
    // if (!isValidEquationInput(value)) return; // Only allow valid chars
    setFunctionsState(prev =>
      prev.map(f => (f.id === id ? { ...f, equation: value } : f))
    );
  };

  const handleInitialXChange = (value: string) => {
    if (isValidNumberInput(value)) {
      setInitialX(value);
    }
  };

  const finalResult = useMemo(() => {
    const x0 = parseFloat(initialX);
    if (isNaN(x0)) return '';
    const order = [1, 2, 4, 5, 3];
    let current = x0;
    for (let i = 0; i < order.length; i++) {
      const func = functionsState.find(f => f.id === order[i]);
      if (!func) return '';
      const res = evaluateEquation(func.equation, current);
      if (isNaN(res)) return '';
      current = res;
    }
    return current;
  }, [initialX, functionsState]);

  const getFunctionPos = (id: number) => {
    const {left,top} = FUNCTION_POSITIONS[id];
    return elementCenter(left, top, 180, 150);
  };

  const getInitialPos = () => {
    const left = 50;
    const top = 100;
    return { x: left + 30, y: top + 50 };
  };

  const getFinalPos = () => {
    const left = 700;
    const top = 300;
    const width = 80;
    const height = 40;
    return { x: left + width/2, y: top + height/2 };
  };

  return (
    <div>
      {/* Initial X input */}
   
      <div
  style={{
    position: 'absolute',
    left: '60px',
    top: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px', // Add spacing between label and input
  }}
>
  {/* Label */}
  <div
    style={{
      background: '#E29A2D',
      color: '#FFFFFF',
      fontSize: '12px',
      fontWeight: 600,
      padding: '4px 8px',
      borderRadius: '14px',
    }}
  >
    Initial value of x
  </div>

  {/* Input Wrapper */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      background: '#FFFFFF',
      border: '2px solid #FFC267',
      borderRadius: '15px',
      height: '40px',
      padding: '0 12px',
      position: 'relative',
      boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.06)',
    }}
  >
    {/* Input Field */}
    <input
      type="text"
      value={initialX}
      onChange={(e) => handleInitialXChange(e.target.value)}
      style={{
        border: 'none',
        background: 'none',
        textAlign: 'center',
        fontSize: '18px',
        width: '50px',
        fontWeight: 700,
        color: '#000000',
        outline: 'none',
        flexGrow: 1,
      }}
    />

    {/* Connector */}
    <div
      style={{
        width: '15px',
        height: '15px',
        background: '#FFFFFF',
        border: '2px solid #DBDBDB',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          background: '#66A3FF',
          borderRadius: '50%',
        }}
      ></div>
    </div>
  </div>
</div>


      {/* Function Cards */}
      {functionsState.map(func => {
        const pos = FUNCTION_POSITIONS[func.id];
        return (
          <div key={func.id} style={{ position: 'absolute', left: pos.left, top: pos.top }}>
            <FunctionCard
              label={func.label}
              equation={func.equation}
              nextFunctionLabel={func.next ? `Function: ${func.next}` : undefined}
              onEquationChange={(val) => handleEquationChange(func.id, val)}
            />
          </div>
        );
      })}
   

      {/* Final Output */}
      
      <div
  style={{
    position: 'absolute',
    left: '85%',
    top: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px', // Add spacing between label and output box
  }}
>
  {/* Label */}
  <div
    style={{
      background: '#4CAF79',
      color: '#FFFFFF',
      fontSize: '12px',
      fontWeight: 600,
      padding: '4px 8px',
      borderRadius: '14px',
    }}
  >
    Final Output y
  </div>

  {/* Output Box */}
  <div
    style={{
      width: '115px',
      height: '40px',
      background: '#FFFFFF',
      border: '2px solid #2DD179',
      borderRadius: '15px',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.06)',
    }}
  >
    {/* Result Text */}
    <span
      style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#252525',
      }}
    >
      {finalResult === '' ? '...' : finalResult}
    </span>

    {/* Connector */}
    <div
      style={{
        width: '15px',
        height: '15px',
        background: '#FFFFFF',
        border: '2px solid #DBDBDB',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '7px',
          height: '7px',
          background: '#66A3FF',
          borderRadius: '50%',
        }}
      ></div>
    </div>
  </div>
</div>


      {/* Connector Lines */}
      <ConnectorLine from={getInitialPos()} to={getFunctionPos(1)} />
      <ConnectorLine from={getFunctionPos(1)} to={getFunctionPos(2)} />
      <ConnectorLine from={getFunctionPos(2)} to={getFunctionPos(4)} />
      <ConnectorLine from={getFunctionPos(4)} to={getFunctionPos(5)} />
      <ConnectorLine from={getFunctionPos(5)} to={getFunctionPos(3)} />
      <ConnectorLine from={getFunctionPos(3)} to={getFinalPos()} />
    </div>
  );
}

function elementCenter(leftPx: string, topPx: string, width = 180, height = 150) {
  const left = parseFloat(leftPx);
  const top = parseFloat(topPx);
  return {
    x: left + width/2,
    y: top + height/2
  };
}

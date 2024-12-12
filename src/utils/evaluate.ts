export function evaluateEquation(equation: string, x: number): number {
  const sanitized = equation.replace(/\^/g, '**');
  try {
    const f = new Function('x', `return (${sanitized});`);
    const result = f(x);
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      return result;
    }
    return NaN;
  } catch {
    return NaN;
  }
}

import styles from './Calculator.module.css';

const Calculator = (input, setInput) => {
  //   const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      let expression = input
        .replace(/\^/g, '**')
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/!/g, 'fact');

      const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
      const result = eval(expression);
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.buttons}>
        {['7', '8', '9', '/', 'sin', 'cos', 'tan'].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
        {['4', '5', '6', '*', '√', '^', 'log'].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
        {['1', '2', '3', '-', 'π', 'e', 'ln'].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
        {['0', '.', '=', '+', '!', 'C'].map((item) => (
          <button
            key={item}
            onClick={() => (item === '=' ? calculateResult() : item === 'C' ? clearInput() : handleClick(item))}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;

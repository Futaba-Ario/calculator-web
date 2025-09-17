import { Calculator } from './calc.js';

const calculator = new Calculator();
const display = document.querySelector('[data-display]');
const keys = document.querySelector('.calculator__keys');

function updateDisplay() {
  if (!display) return;
  display.textContent = calculator.getDisplayValue();
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      calculator.clear();
      break;
    case 'backspace':
      calculator.backspace();
      break;
    case 'equals':
      calculator.evaluate();
      break;
    case 'decimal':
      calculator.inputDecimal();
      break;
    default:
      break;
  }
  updateDisplay();
}

function handleOperator(operator) {
  calculator.setOperator(operator);
  updateDisplay();
}

function handleDigit(digit) {
  calculator.inputDigit(digit);
  updateDisplay();
}

if (keys) {
  keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) {
      return;
    }

    if (button.dataset.digit) {
      handleDigit(button.dataset.digit);
      return;
    }

    if (button.dataset.operator) {
      handleOperator(button.dataset.operator);
      return;
    }

    if (button.dataset.action) {
      handleAction(button.dataset.action);
    }
  });
}

document.addEventListener('keydown', (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key)) {
    event.preventDefault();
    handleDigit(key);
    return;
  }

  if (key === '.') {
    event.preventDefault();
    handleAction('decimal');
    return;
  }

  if (key === 'Enter' || key === '=') {
    event.preventDefault();
    handleAction('equals');
    return;
  }

  if (key === 'Backspace') {
    event.preventDefault();
    handleAction('backspace');
    return;
  }

  if (key === 'Escape') {
    event.preventDefault();
    handleAction('clear');
    return;
  }

  if (['+', '-', '*', '/'].includes(key)) {
    event.preventDefault();
    handleOperator(key);
  }
});

updateDisplay();

const MAX_DISPLAY_LENGTH = 12;

function formatNumber(value) {
  if (value === null || Number.isNaN(value)) {
    return 'Error';
  }

  if (!Number.isFinite(value)) {
    return value > 0 ? '∞' : '-∞';
  }

  const rounded = Number.parseFloat(value.toFixed(10));
  let output = rounded.toString();

  if (output.includes('e')) {
    return rounded.toExponential(6);
  }

  if (output.length > MAX_DISPLAY_LENGTH) {
    output = rounded.toPrecision(6);
  }

  return output;
}

export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = null;
    this.operator = null;
    this.shouldResetCurrent = false;
    return this.currentOperand;
  }

  inputDigit(digit) {
    if (!/^[0-9]$/.test(digit)) {
      return this.currentOperand;
    }

    if (this.currentOperand === 'Error' || this.shouldResetCurrent) {
      this.currentOperand = digit;
      this.shouldResetCurrent = false;
      return this.currentOperand;
    }

    if (this.currentOperand === '0') {
      this.currentOperand = digit;
    } else if (this.currentOperand.length < MAX_DISPLAY_LENGTH) {
      this.currentOperand += digit;
    }

    return this.currentOperand;
  }

  inputDecimal() {
    if (this.currentOperand === 'Error' || this.shouldResetCurrent) {
      this.currentOperand = '0.';
      this.shouldResetCurrent = false;
      return this.currentOperand;
    }

    if (!this.currentOperand.includes('.')) {
      this.currentOperand += '.';
    }

    return this.currentOperand;
  }

  backspace() {
    if (this.currentOperand === 'Error') {
      return this.clear();
    }

    if (this.shouldResetCurrent) {
      this.currentOperand = '0';
      this.shouldResetCurrent = false;
      return this.currentOperand;
    }

    if (this.currentOperand.length <= 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }

    return this.currentOperand;
  }

  setOperator(operator) {
    if (!['+', '-', '*', '/'].includes(operator)) {
      return this.currentOperand;
    }

    if (this.operator && !this.shouldResetCurrent) {
      const result = this.#compute();
      this.currentOperand = formatNumber(result);
      if (this.currentOperand === 'Error') {
        this.previousOperand = null;
        this.operator = null;
        this.shouldResetCurrent = true;
        return this.currentOperand;
      }
      this.previousOperand = Number.parseFloat(this.currentOperand);
    } else {
      this.previousOperand = this.currentOperand === 'Error' ? 0 : Number.parseFloat(this.currentOperand);
    }

    this.operator = operator;
    this.shouldResetCurrent = true;
    return this.currentOperand;
  }

  evaluate() {
    if (!this.operator) {
      return this.currentOperand;
    }

    const result = this.#compute();
    this.currentOperand = formatNumber(result);

    this.previousOperand = null;
    this.operator = null;
    this.shouldResetCurrent = true;

    return this.currentOperand;
  }

  getDisplayValue() {
    return this.currentOperand;
  }

  #compute() {
    const current = this.currentOperand === 'Error' ? 0 : Number.parseFloat(this.currentOperand);
    const previous = this.previousOperand ?? 0;

    if (this.operator === '/' && current === 0) {
      return null;
    }

    switch (this.operator) {
      case '+':
        return previous + current;
      case '-':
        return previous - current;
      case '*':
        return previous * current;
      case '/':
        return previous / current;
      default:
        return current;
    }
  }
}

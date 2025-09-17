import test from 'node:test';
import assert from 'node:assert/strict';
import { Calculator } from '../calc.js';

test('初期状態では表示が0になる', () => {
  const calc = new Calculator();
  assert.equal(calc.getDisplayValue(), '0');
});

test('数字と少数の入力が連結される', () => {
  const calc = new Calculator();
  calc.inputDigit('1');
  calc.inputDigit('2');
  calc.inputDecimal();
  calc.inputDigit('3');
  calc.inputDigit('4');
  assert.equal(calc.getDisplayValue(), '12.34');
});

test('演算子を使った計算ができる', () => {
  const calc = new Calculator();
  calc.inputDigit('7');
  calc.setOperator('+');
  calc.inputDigit('5');
  assert.equal(calc.evaluate(), '12');
});

test('連続した演算で直前の結果を使える', () => {
  const calc = new Calculator();
  calc.inputDigit('1');
  calc.inputDigit('0');
  calc.setOperator('-');
  calc.inputDigit('2');
  calc.setOperator('+');
  calc.inputDigit('3');
  assert.equal(calc.evaluate(), '11');
});

test('クリアで状態をリセットできる', () => {
  const calc = new Calculator();
  calc.inputDigit('9');
  calc.setOperator('*');
  calc.inputDigit('9');
  calc.clear();
  assert.equal(calc.getDisplayValue(), '0');
  assert.equal(calc.operator, null);
});

test('Backspaceで1文字ずつ削除できる', () => {
  const calc = new Calculator();
  calc.inputDigit('5');
  calc.inputDigit('0');
  calc.backspace();
  assert.equal(calc.getDisplayValue(), '5');
  calc.backspace();
  assert.equal(calc.getDisplayValue(), '0');
});

test('0で割るとErrorになる', () => {
  const calc = new Calculator();
  calc.inputDigit('9');
  calc.setOperator('/');
  calc.inputDigit('0');
  assert.equal(calc.evaluate(), 'Error');
});

test('等号後の数字入力は新しい値になる', () => {
  const calc = new Calculator();
  calc.inputDigit('2');
  calc.setOperator('*');
  calc.inputDigit('3');
  calc.evaluate();
  calc.inputDigit('4');
  assert.equal(calc.getDisplayValue(), '4');
});

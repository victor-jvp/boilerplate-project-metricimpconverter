const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input.', () => {
    assert.equal(convertHandler.getNum(3), 3);
  });
  test('convertHandler should correctly read a decimal number input.', () => {
    assert.isNumber(convertHandler.getNum('1.25'));
  })
  test('convertHandler should correctly read a fractional input.', () => {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  })
  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    assert.isNumber(convertHandler.getNum('5.3/4'));
  })
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
    assert.isFalse(convertHandler.getNum('3/2/3'));
  })
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.equal(convertHandler.getNum('1'), 1);
  })
  test('convertHandler should correctly read each valid input unit.', () => {
    assert.equal(convertHandler.getUnit('1.5gal'), 'gal')
  })
  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    assert.isFalse(convertHandler.getUnit('BadUnit'))
  })
  test('convertHandler should return the correct return unit for each valid input unit.', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  })
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    const input = "1.59L";
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    assert.equal(string, "1.59 liters converts to 0.42003 gallons")
  })
  test('convertHandler should correctly convert gal to L.', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
  })
  test('convertHandler should correctly convert L to gal.', () => {
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
  })
  test('convertHandler should correctly convert mi to km.', () => {
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
  })
  test('convertHandler should correctly convert km to mi.', () => {
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
  })
  test('convertHandler should correctly convert lbs to kg.', () => {
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
  })
  test('convertHandler should correctly convert kg to lbs.', () => {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  })
});
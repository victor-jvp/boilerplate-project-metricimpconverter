'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {


  app.get('/api/convert', (req, res) => {
    let convertHandler = new ConvertHandler();
    const input = req.query.input
    if(!input) return res.json("invalid unit")
    
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (!initNum || !initUnit) {
      if (!initNum && !initUnit) return res.json('invalid number and unit');
      if (!initNum) return res.json('invalid number');
      if (!initUnit) return res.json('invalid unit');
    }

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    })
  })
};

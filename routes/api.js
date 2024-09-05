'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  

  app.get('/api/convert', (req, res) => {
    try {
      let convertHandler = new ConvertHandler();
      const input = req.query.input
      const initNum = convertHandler.getNum(input)
      const initUnit = convertHandler.getUnit(input)
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
    } catch (error) {
      res.json(error.message)
    }

  })

};

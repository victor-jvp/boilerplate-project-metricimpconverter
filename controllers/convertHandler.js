function ConvertHandler() {

  const units = {
    gal: "L",
    L: "gal",
    mi: "km",
    km: "mi",
    lbs: "kg",
    kg: "lbs",
  };

  this.getNum = function (input) {
    let result = 1;

    if (typeof input == 'string') {
      let unit = input.match(/[a-zA-Z]+/g)
      if (unit) {
        if (unit.length == 1) {
          unit = unit[0]
        }
        else {
          unit = unit.join();
        }
      }
      result = input.replace(unit, "")
      if (result.indexOf('/') !== -1) {
        num = result.split('/')
        if (num.length !== 2) return false;
        result = num[0] / num[1]
      }
      if (!isFinite(result)) return false;
    } else {
      result = input;
    }

    return parseFloat(result);
  };

  this.getUnit = function (input) {
    let unit = input.match(/[a-zA-Z]+/g)
    if (!unit) return false;
    if (unit.length == 1) unit = unit[0]
    else unit = unit.join();
    return this.spellOutUnit(unit);
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L" || unit === "l") return "L";
    if (!units.hasOwnProperty(unit.toLowerCase())) return false;
    return unit.toLowerCase();
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const convertRate = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
    }

    return Math.round(convertRate[initUnit] * initNum * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {

    const unitLong = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    }

    return `${initNum} ${unitLong[initUnit]} converts to ${returnNum} ${unitLong[returnUnit]}`;
  };

}

module.exports = ConvertHandler;

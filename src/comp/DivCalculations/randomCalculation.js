import "whatwg-fetch";
import { getCalc1x1 } from "./../../services/calc1x1Service";

const baseUrl = "http://localhost:4000/api";

// provide random calculation scheme for "kleines 1x1"
export function randomCalculationSmall1x1(values, checks) {
  let op_switch, op_str;
  let calc_str, num1, num2;
  let result;

  var valid = false;
  do {
    op_switch = Math.floor(Math.random() * 4) + 1;
    //this.state.debugLevel >= 2 ? console.log('getNewCalc/opSwitch: ', op_switch, checks): '';
    if (op_switch === 1 && checks[0] === true) {
      valid = true;
    } else if (op_switch === 2 && checks[1] === true) {
      valid = true;
    } else if (op_switch === 3 && checks[2] === true) {
      valid = true;
    } else if (op_switch === 4 && checks[3] === true) {
      valid = true;
    }
  } while (!valid);

  switch (op_switch) {
    case 1:
      op_str = "+";
      num1 = Math.floor(Math.random() * values[0]) + 1;
      num2 = Math.floor(Math.random() * values[0]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 + num2;
      //console.log('getNewCalc/C1: ', num1, num2, result, calc_str);
      break;
    case 2:
      op_str = "-";
      num1 = Math.floor(Math.random() * values[1]) + 1;
      num2 = Math.floor(Math.random() * values[1]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 - num2;
      //console.log('getNewCalc/C2: ', num1, num2, result, calc_str);
      break;
    case 3:
      op_str = "x";
      num1 = Math.floor(Math.random() * values[2]) + 1;
      num2 = Math.floor(Math.random() * values[2]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 * num2;
      //console.log('getNewCalc/C3: ', num1, num2, result, calc_str);
      break;
    case 4:
      op_str = "/";
      num1 = Math.floor(Math.random() * values[3]) + 1;
      num2 = Math.floor(Math.random() * values[3]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = (num1 / num2).toPrecision(3);
      //console.log('getNewCalc/C4: ', num1, num2, result, calc_str);
      break;
    default:
    //console.log('default');
  }
  return { calcStr: calc_str, result: result };
}

export async function getCalculationSmall1x1(values, checks) {
  // Tabelle mit + Aufgaben bis 10
  // Tabelle mit - Aufgaben bis 10
  // Tabell mit * Aufgaben bis 10
  // Tabelle mit / Aufgaben bis 10 mit geraden Teilern

  console.log("randomCalc/getCalc/input: ", values, checks);
  const taskArr = ["plus"];
  if (checks[1] === true) {
    taskArr.push("minus");
  }
  if (checks[2] === true) {
    taskArr.push("mal");
  }
  if (checks[3] === true) {
    taskArr.push("geteilt");
  }

  var opt = {
    class: 1,
    tasks: taskArr,
  };

  const data = await getCalc1x1();
  console.log("randomCalculations: ", data);
  return data;
}

// provide random calculation scheme for "großes 1x1"
export function randomCalculationBig1x1(values, checks) {
  let op_switch, op_str;
  let calc_str, num1, num2;
  let result;

  var valid = false;
  do {
    op_switch = Math.floor(Math.random() * 4) + 1;
    //this.state.debugLevel >= 2 ? console.log('getNewCalc/opSwitch: ', op_switch, checks): '';
    if (op_switch === 1 && checks[0] === true) {
      valid = true;
    } else if (op_switch === 2 && checks[1] === true) {
      valid = true;
    } else if (op_switch === 3 && checks[2] === true) {
      valid = true;
    } else if (op_switch === 4 && checks[3] === true) {
      valid = true;
    }
  } while (!valid);

  switch (op_switch) {
    case 1:
      op_str = "+";
      num1 = Math.floor(Math.random() * values[0]) + 1;
      num2 = Math.floor(Math.random() * values[0]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 + num2;
      //console.log('getNewCalc/C1: ', num1, num2, result, calc_str);
      break;
    case 2:
      op_str = "-";
      num1 = Math.floor(Math.random() * values[1]) + 1;
      num2 = Math.floor(Math.random() * values[1]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 - num2;
      //console.log('getNewCalc/C2: ', num1, num2, result, calc_str);
      break;
    case 3:
      op_str = "x";
      num1 = Math.floor(Math.random() * values[2]) + 1;
      num2 = Math.floor(Math.random() * values[2]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = num1 * num2;
      //console.log('getNewCalc/C3: ', num1, num2, result, calc_str);
      break;
    case 4:
      op_str = "/";
      num1 = Math.floor(Math.random() * values[3]) + 1;
      num2 = Math.floor(Math.random() * values[3]) + 1;
      calc_str = `${num1} ${op_str} ${num2} = `;
      result = (num1 / num2).toPrecision(3);
      //console.log('getNewCalc/C4: ', num1, num2, result, calc_str);
      break;
    default:
    //console.log('default');
  }
  return { calcStr: calc_str, result: result };
}

// provide random calculation scheme for rational figures
export function randomCalculationRational(values, checks) {
  let op1, op2, op3;
  let opSw1, opSw2, opSw3;
  let calc_str = [];
  let num1, num2;
  let result;

  // evaluate checks of checkbox
  let withMulti = checks[1] || checks[3];
  let withAddSub = checks[0] || checks[2];
  // random selection of operation
  opSw1 = Math.floor(Math.random() * 2) + 1;
  if (withMulti && withAddSub) {
    // + / - / x
    opSw2 = Math.floor(Math.random() * 3) + 1;
  } else if (!withMulti && withAddSub) {
    // + / -
    opSw2 = Math.floor(Math.random() * 2) + 1;
  } else if (withMulti && !withAddSub) {
    // x
    opSw2 = 1;
  } else {
    // + / -
    opSw2 = Math.floor(Math.random() * 2) + 1;
  }
  opSw3 = Math.floor(Math.random() * 2) + 1;

  opSw1 === 1 ? (op1 = "+") : (op1 = "-");
  if (withMulti && withAddSub) {
    opSw2 === 2 ? (op2 = "x") : opSw2 === 1 ? (op2 = "+") : (op2 = "-");
  } else if (!withMulti && withAddSub) {
    opSw2 === 1 ? (op2 = "+") : (op2 = "-");
  } else if (withMulti && !withAddSub) {
    op2 = "x";
  } else {
    opSw2 === 1 ? (op2 = "+") : (op2 = "-");
  }
  opSw3 === 1 ? (op3 = "+") : (op3 = "-");

  let nums = [];
  // random selection of numbers
  // (+/-)
  if (checks[0]) {
    num1 = Math.floor(Math.random() * values[0]) + 1;
    num2 = Math.floor(Math.random() * values[0]) + 1;
    nums.push({ num1: num1, num2: num2 });
    console.log("nums: ", nums);
  }
  // (x)
  if (checks[1]) {
    num1 = Math.floor(Math.random() * values[1]) + 1;
    num2 = Math.floor(Math.random() * values[1]) + 1;
    nums.push({ num1: num1, num2: num2 });
    console.log("nums: ", nums);
  }
  // (+/-) Komma
  if (checks[2]) {
    num1 = (Math.floor(Math.random() * values[2]) + 1) / 10;
    num2 = (Math.floor(Math.random() * values[2]) + 1) / 10;
    nums.push({ num1: num1, num2: num2 });
    console.log("nums: ", nums);
  }
  // (x) Komma
  if (checks[3]) {
    num1 = (Math.floor(Math.random() * values[3]) + 1) / 10;
    num2 = (Math.floor(Math.random() * values[3]) + 1) / 10;
    nums.push({ num1: num1, num2: num2 });
    console.log("nums: ", nums);
  }
  let numsSelect = Math.floor(Math.random() * nums.length);
  num1 = nums[numsSelect].num1;
  num2 = nums[numsSelect].num2;
  console.log("Auswahl: ", num1, num2, numsSelect, nums, opSw2);

  // preparation of calculation string
  let num1comma = num1.toString().replace(".", ",");
  let num2comma = num2.toString().replace(".", ",");
  calc_str[0] = op1;
  calc_str[1] = num1comma;
  calc_str[2] = op2;
  calc_str[3] = op3;
  calc_str[4] = num2comma;
  calc_str[5] = "=";

  if (opSw1 !== 1) {
    num1 = -num1;
  }
  if (opSw3 !== 1) {
    num2 = -num2;
  }
  console.log("Vorzeichen: ", num1, num2, opSw1, opSw2);

  // calculation of result
  op2 === "x"
    ? (result = num1 * num2)
    : op2 === "+"
    ? (result = num1 + num2)
    : (result = num1 - num2);
  console.log("Ergebnis: ", num1, num2, op2, result);

  return { calcStr: calc_str, result: result.toPrecision(3) };
}

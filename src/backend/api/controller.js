const valid = (input, array) => {
  return array.every((c) => input.hasOwnProperty(c) && input[c] !== "");
};
module.exports = valid;

let flag = false
function validateStr (str) {
  // eng: function that checks if a STRING has numbers
  // esp: función que comprueba si una STRING tiene numeros
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const id = str.split('')
  let i = 0
  while (i <= 9 && flag === false) {
    if (id.includes(numbers[i].toString())) {
      flag = true
    } else {
      i++
      flag = false
    }
  }
  return flag
}
module.exports = validateStr

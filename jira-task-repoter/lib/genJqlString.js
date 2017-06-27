/**
 * generate jql string from object.
 * 
 * @param {object} obj 
 * @returns {string}
 */
function genJqlString (obj) {
  const queryArray = []
  for (const key in obj) {
    const element = obj[key];
    let string = ''
    if (Array.isArray(element)) {
      string += `${key} in (${element.join(', ')})`
    } else {
      string += `${key} = ${element}`
    }
    queryArray.push(string)
  }
  return queryArray.join(' AND ')
}

module.exports = genJqlString

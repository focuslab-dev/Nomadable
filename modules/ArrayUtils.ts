export function uniqueArray(array: any[]) {
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  // usage
  var unique = array.filter(onlyUnique); // returns ['a', 1, 2, '1']

  return unique;
}

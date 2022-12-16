const ress = [
  72, 16, 16, 80, 82, 36,

  36,

  48, 52, 52, 52, 64, 10, 1, 12, 12, 36, 56, 56, 12, 56, 64, 10, 24, 80, 36, 14,
  4, 26
].reduce((res, item) => {
  if (res[item] != null) res[item]++
  else res[item] = 1
  return res
}, [])

ress.forEach((value, index) => console.log('68. ress', index, value))

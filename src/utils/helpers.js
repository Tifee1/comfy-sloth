const formatPrice = (pri) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(pri / 100)
}

const uniqueValues = (arr, cat, color) => {
  let arrays = arr.map((a) => a[cat])
  if (color) {
    arrays = arrays.flat()
  }
  const newValues = ['all', ...new Set(arrays)]
  return newValues
}

export { formatPrice, uniqueValues }

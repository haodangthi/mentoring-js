export function convertMap(map: Map<any, any>) {
  const object = {} as any
  map.forEach((v, k) => {
    object[k] = v
  })

  return object
}

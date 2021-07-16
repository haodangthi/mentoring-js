export function convertMap(map: any) {
  console.log(map)
  const object = {} as any

  for (const [ key, value ] of Object.entries(map)) {
    object[key] = value
  }

  return object
}

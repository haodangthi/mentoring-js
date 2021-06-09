export function getById(id: string, array: any[]) {
  return array.find((item) => id === item.id)
}

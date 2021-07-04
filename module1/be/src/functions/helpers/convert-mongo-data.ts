export function convertMongooseModel(data) {
  if (data instanceof Array) {
    return data.map((element) => {
      const json = JSON.stringify(element)
      return JSON.parse(json)
    })
  } else {
    const json = JSON.stringify(data)
    return JSON.parse(json)
  }
}

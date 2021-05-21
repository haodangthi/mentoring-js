import './styles.scss'

const a = 1012
const b = 12

export const add = (a: any, b: any) => a + b

console.log(add(a, b))

const greetings = 'Hello, Wohhhhhhrld!'

if (document.querySelector('h1')) {
    document.querySelector('h1').innerHTML = greetings
}

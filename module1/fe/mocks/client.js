import { JSDOM } from "jsdom"
const dom = new JSDOM()
document = dom.window.document
window = dom.window

export default {
    querySelector: () => {
        return {innerHTML: ''}
    }
};

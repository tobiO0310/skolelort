import * as sorting from "./SortingAlgorithms.js";
import binarySearch from "./BinarySearch.js";

window.randomNumbers = function (min = 0, max = 100, amount = 10, decimals = false) {
    const numbers = [];
    for (let i = 0; i < amount; i++) {
        const num = random(min, max);
        numbers.push(decimals ? num : num << 0);
    }
    return numbers;
}

window.orderedNumbers = function (min = 0, max = 100, shuffle = false) {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    if (shuffle)
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    return arr;
}

window.clamp = (val, min, max) =>
    Math.max(min, Math.min(val, max));
window.toNearestDecimal = (val, dec) => Math.round(val * (10 ** dec)) / (10 ** dec);

window.binarySearch = binarySearch;
for (let i in sorting) {
    window[i] = sorting[i];
}

const sum = (a, b) => a + b;
const mul = (a, b) => a * b;
const g = 9.8;
const PI = 3.14;

//Method1
// module.exports = 123;

//Method2
// let obj = {
//     sum: sum,
//     mul: mul,
//     g: g,
//     PI: PI
// };

// module.exports = obj;


//Method3
// module.exports = {
//         sum: sum,
//         mul: mul,
//         g: g,
//         PI: PI
//     };

//Method5
// module.exports.sum = (a, b) => a + b;
// module.exports.mul = (a, b) => a * b;
// module.exports.g = 9.8;
// module.exports.PI = 3.14;

//Method6
exports.sum = (a, b) => a + b;
exports.mul = (a, b) => a * b;
exports.g = 9.8;
exports.PI = 3.14;
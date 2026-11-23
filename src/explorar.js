const ventas = require("./datos");

console.log("Cantidad de ventas:",ventas.length);

console.log("Primer Registro:",ventas[0]);

console.log("Ultimo Registro:",ventas[ventas.length -1]);

console.log("Registro posicion 4: ",ventas[4].producto);

console.table(ventas);
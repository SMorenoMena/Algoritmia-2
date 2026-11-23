
const ventas = require("./datos");

const {
    totalVendido,
    UnidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");

// Función para mostrar OK o DIFERENTE
function verificar(nombre, resultadoManual, resultadoMetodo) {
    const estado = resultadoManual === resultadoMetodo
        ? "OK"
        : "DIFERENTE";

    console.log(`${nombre}: ${estado}`);
}

// 1. Comparar total vendido
verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

// 2. Comparar unidades vendidas
verificar(
    "Unidades vendidas",
    UnidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

// 3. Comparar ventas por ciudad
const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

for (const ciudad of ciudades) {
    verificar(
        `Ventas en ${ciudad}`,
        ventasPorCiudad(ventas, ciudad),
        ventasPorCiudadM(ventas, ciudad)
    );
}

// 4. Verificar agrupación por ciudad
const totalesCiudades = totalPorCiudad(ventas);

const ciudadesCorrectas =
    Object.keys(totalesCiudades).length === 4 &&
    ciudades.every((ciudad) =>
        totalesCiudades[ciudad] === ventasPorCiudad(ventas, ciudad)
    );

console.log(
    "Agrupación por ciudad:",
    ciudadesCorrectas ? "OK" : "DIFERENTE"
);

// 5. Verificar unidades por producto
const unidadesProductos = unidadesPorProducto(ventas);

const unidadesAgrupadas = Object.values(unidadesProductos)
    .reduce((acumulador, unidades) => acumulador + unidades, 0);

verificar(
    "Unidades agrupadas por producto",
    UnidadesVendidas(ventas),
    unidadesAgrupadas
);

// 6. Verificar Top 3
const top3 = topProductosPorValor(ventas, 3);

const rankingCorrecto =
    top3.length === 3 &&
    top3.every((producto, indice) =>
        indice === 0 || top3[indice - 1][1] >= producto[1]
    );

console.log(
    "Top 3 productos:",
    rankingCorrecto ? "OK" : "DIFERENTE"
);

// 7. Comprobar que el arreglo original no cambió
const ordenOriginal = ventas.map((venta) => venta.id);

topProductosPorValor(ventas, 3);

const ordenDespues = ventas.map((venta) => venta.id);

verificar(
    "Orden original conservado",
    JSON.stringify(ordenOriginal),
    JSON.stringify(ordenDespues)
);

// Mostrar resultados
console.log("\nTotales por ciudad:", totalesCiudades);
console.log("\nUnidades por producto:", unidadesProductos);
console.log("\nTop 3 productos:", top3);

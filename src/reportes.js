
const ventas = require("./datos");

const {
    totalVendido,
    UnidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica");

// Formatear valores en pesos colombianos
function formatoCOP(valor) {
    return `$${valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}

// Encabezado principal
console.log("\n========================================");
console.log("       CAFÉ ORIGEN - REPORTE v0.1");
console.log("========================================");

// ========================================
// 1. RESUMEN GENERAL
// ========================================

console.log("\n1. RESUMEN GENERAL");
console.log("----------------------------------------");

console.log(`Total vendido: ${formatoCOP(totalVendido(ventas))}`);
console.log(`Unidades vendidas: ${UnidadesVendidas(ventas)}`);
console.log(`Ticket promedio: ${formatoCOP(ticketPromedio(ventas))}`);

const mayor = ventaMayor(ventas);

console.log(
    `Venta de mayor valor: ${mayor ? formatoCOP(mayor.cantidad * mayor.precio) : formatoCOP(0)}`
);

// ========================================
// 2. VENTAS POR CIUDAD
// ========================================

console.log("\n2. VENTAS POR CIUDAD");
console.log("----------------------------------------");

const ciudades = totalPorCiudad(ventas);

const tablaCiudades = Object.entries(ciudades).map(([ciudad, total]) => {
    return {
        Ciudad: ciudad,
        "Total vendido": formatoCOP(total)
    };
});

console.table(tablaCiudades);

// ========================================
// 3. UNIDADES POR PRODUCTO
// ========================================

console.log("\n3. UNIDADES POR PRODUCTO");
console.log("----------------------------------------");

const productos = unidadesPorProducto(ventas);

const tablaProductos = Object.entries(productos).map(([producto, unidades]) => {
    return {
        Producto: producto,
        Unidades: unidades
    };
});

console.table(tablaProductos);

// ========================================
// 4. TOP 3 PRODUCTOS POR VALOR
// ========================================

console.log("\n4. TOP 3 PRODUCTOS POR VALOR");
console.log("----------------------------------------");

const top3 = topProductosPorValor(ventas, 3);

const tablaTop3 = top3.map(([producto, total], indice) => {
    return {
        Posición: indice + 1,
        Producto: producto,
        "Valor generado": formatoCOP(total)
    };
});

console.table(tablaTop3);

// ========================================
// 5. RESUMEN DE VENTAS POR FECHA
// ========================================

console.log("\n5. RESUMEN POR FECHA");
console.log("----------------------------------------");

function mostrarResumenDia(fecha) {
    const ventasDia = ventasDelDia(ventas, fecha);

    console.log(`\nFecha: ${fecha}`);
    console.log(`Número de ventas: ${ventasDia.length}`);
    console.log(`Total vendido: ${formatoCOP(totalVendido(ventasDia))}`);
    console.log(`Ticket promedio: ${formatoCOP(ticketPromedio(ventasDia))}`);

    if (ventasDia.length === 0) {
        console.log("No se registraron ventas en esta fecha.");
    }
}

// Día con ventas
mostrarResumenDia("2026-09-01");

// Día sin ventas
mostrarResumenDia("2026-09-10");

console.log("\n========================================");
console.log("           FIN DEL REPORTE");
console.log("========================================\n");

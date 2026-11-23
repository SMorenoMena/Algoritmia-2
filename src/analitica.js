const ventas = require("./datos");

function ValorVenta(venta){
    return venta.cantidad * venta.precio;
}

console.log(ValorVenta(ventas[0]));


function totalVendido(ventas){
    let total = 0;

    for (const venta of ventas){
       total += ValorVenta(venta);
    }
    return total;
    
}
console.log(totalVendido(ventas));


function UnidadesVendidas(ventas){
    let total = 0;

    for(const venta of ventas){
        total += venta.cantidad;
    }
    return total;
}
console.log(UnidadesVendidas(ventas));


function ventaMayor(ventas){
    if(ventas.length === 0){
        return null;
    }
    let mayor = ventas[0];

    for(const venta of ventas){
        if(ValorVenta(venta)> ValorVenta(mayor)){
            mayor = venta;
        }
    }
    return mayor;
}
console.log(ventaMayor(ventas));

function ticketPromedio(ventas) {
    let cantidad = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            cantidad++;
        }
    }

    if (cantidad === 0) {
        return 0;
    }

    let promedio = totalVendido(ventas) / cantidad;
    return promedio;
}

console.log(ticketPromedio(ventas));

function ventasPorCiudad(ventas, ciudad){
    let total = 0;

    for(const venta of ventas){
        if(venta.ciudad.trim().toLowerCase() === ciudad.trim().toLowerCase()){
            total += ValorVenta(venta);
    }
}
    return total;
} 
console.log(ventasPorCiudad(ventas, "Medellín"));


/* ==========================================
   MINIRETO 3 - MÉTODOS DE ARREGLOS
========================================== */

// 1. Total vendido con reduce()
function totalVendidoM(ventas) {
    return ventas.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad * venta.precio;
    }, 0);
}

// 2. Unidades vendidas con reduce()
function unidadesVendidasM(ventas) {
    return ventas.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad;
    }, 0);
}

// 3. Ventas por ciudad con filter() y reduce()
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter((venta) => {
            return venta.ciudad.trim().toLowerCase() === ciudadBuscada;
        })
        .reduce((acumulador, venta) => {
            return acumulador + venta.cantidad * venta.precio;
        }, 0);
}

// 4. Total vendido agrupado por ciudad
function totalPorCiudad(ventas) {
    const nombresCiudades = {
        "medellín": "Medellín",
        "bogotá": "Bogotá",
        "cali": "Cali",
        "pereira": "Pereira"
    };

    return ventas.reduce((acumulador, venta) => {
        const ciudadNormalizada = venta.ciudad.trim().toLowerCase();

        const ciudad = nombresCiudades[ciudadNormalizada]
            || venta.ciudad.trim();

        acumulador[ciudad] =
            (acumulador[ciudad] || 0) +
            venta.cantidad * venta.precio;

        return acumulador;
    }, {});
}


function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();

        acumulador[producto] =
            (acumulador[producto] || 0) + venta.cantidad;

        return acumulador;
    }, {});
}


function topProductosPorValor(ventas, k) {
    const dineroPorProducto = ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();

        acumulador[producto] =
            (acumulador[producto] || 0) +
            venta.cantidad * venta.precio;

        return acumulador;
    }, {});

    const productos = Object.entries(dineroPorProducto);

   
    const copiaProductos = [...productos];

    copiaProductos.sort((a, b) => {
        return b[1] - a[1];
    });

    return copiaProductos.slice(0, k);
}

function ventasDelDia(ventas, fecha) {
    return ventas.filter((venta) => {
        return venta.fecha === fecha;
    });
}




module.exports = {
   
    ValorVenta,
    totalVendido,
    UnidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};

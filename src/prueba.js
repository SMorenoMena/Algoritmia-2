const ventas = require("./datos");

const{
    ValorVenta,
    totalVendido,
    UnidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
} = require("./analitica");

function probarIndicadore(nombre, ventas){

    console.log('\n-- ${nombre} ---');
    
    console.log("Total vendido: ", totalVendido(ventas));
    console.log("Unidades vendidas: ", UnidadesVendidas(ventas));
    console.log("Venta mayor: ", ventaMayor(ventas));
    console.log("Ticket promedio: ", ticketPromedio(ventas));
    console.log("Ventas por ciudad (Medellín): ", ventasPorCiudad(ventas, "Medellín"));
}

probarIndicadore("Arreglo completo", ventas);

probarIndicadore("un solo arreglo", [ventas[0]]);

probarIndicadore("Arreglo vacío", []);

c
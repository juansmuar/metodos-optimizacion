function falsaPosicion(f, xl, xu, tol, resultadoDiv) {
    let xr;
    let iteraciones = 0;
    let errores = [];
    let xrAnterior;

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>xr</th><th>Error</th></tr>`;

    while ((xu - xl) / 2 > tol) {
        xrAnterior = xu;
        xr = xu - (f(xu) * (xl - xu)) / (f(xl) - f(xu));
        

        let error = Math.abs(xr - xrAnterior);
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${error ?? "-"}</td></tr>`;

        if (f(xr) === 0 || error < tol) break;

        if (f(xr) * f(xl) < 0) xu = xr;
        else xl = xr;

        xrAnterior = xr;
        iteraciones++;
    }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return { raiz: xr, iteraciones, errores };
}

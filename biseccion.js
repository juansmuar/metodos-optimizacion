function biseccion(f, xl, xu, tol, resultadoDiv) {
    let xr;
    let iteraciones = 0;
    let errores = [];

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>xr</th><th>f(xu)</th><th>f(xl)</th><th>f(xr)</th><th>Error</th></tr>`;

    while ((xu - xl) / 2 > tol) {
        xr = (xl + xu) / 2;
        let fxu = f(xu);
        let fxl = f(xl);
        let fxr = f(xr);

        let error = Math.abs(xu) - Math.abs(xl);
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${fxu}</td><td>${fxl}</td><td>${fxr}</td><td>${error}</td></tr>`;

        if (fxr === 0) break;
        if (fxr * fxl < 0) xu = xr;
        else xl = xr;
        iteraciones++;
    }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return { raiz: xr, iteraciones, errores };
}

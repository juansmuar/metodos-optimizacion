function falsaPosicion(f, xl, xu, tol, resultadoDiv) {
    let xr;
    let iteraciones = 0;
    let errores = [];
    let xrAnterior;

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>xr</th><th>f(xu)</th><th>f(xl)</th><th>f(xr)</th><th>Error</th></tr>`;

    while ((xu - xl) / 2 > tol) {
        xrAnterior = xu;
        let fxu = f(xu);
        let fxl = f(xl);
        xr = xu - (fxu * (xl - xu)) / (fxl - fxu);
        let fxr = f(xr);
        

        let error = Math.abs(xr - xrAnterior);
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${fxu}</td><td>${fxl}</td><td>${fxr}</td><td>${error}</td></tr>`;

        if (fxr === 0 || error < tol) break;

        if (fxr * fxl < 0) xu = xr;
        else xl = xr;

        xrAnterior = xr;
        iteraciones++;
    }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return { raiz: xr, iteraciones, errores };
}

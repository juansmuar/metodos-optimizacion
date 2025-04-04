function falsaPosicion(f, xl, xu, tol, resultadoDiv) {
    let xr;
    let iteraciones = 0;
    let errores = [];
    let xrAnterior = null;

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>xr</th><th>Error</th></tr>`;

    while ((xu - xl) / 2 > tol) {
        let fxu = f(xu);
        let fxl = f(xl);

        xr = xu - (fxu * (xl - xu)) / (fxl - fxu);
        

        let error = xrAnterior !== null ? Math.abs(xr - xrAnterior) : null;
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${error ?? "-"}</td></tr>`;

        if (f(xr) === 0 || error < tol) break;

        if (f(xr) * f(xl) < 0) xu = xr;
        else xl = xr;

        xrAnterior = xr;
        iteraciones++;
    }
    //     xr = xu - ((f(xu) * (xl - xu)) / (f(xl) - f(xu)));
        

    //     let error = (xu - xl) / 2;
    //     errores.push(error);

    //     tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${error ?? "-"}</td></tr>`;

    //     if (f(xr) === 0) break;

    //     if (f(xr) * f(xl) < 0) xu = xr;
    //     else xl = xr;

    //     iteraciones++;
    // }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return { raiz: xr, iteraciones, errores };
}

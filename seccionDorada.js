function seccionDorada(f, xl, xu, tol, resultadoDiv) {
    const phi = (1 + Math.sqrt(5)) / 2;
    let iteraciones = 0;
    let errores = [];

    let d = (xu - xl) / phi;
    let x1 = xu - d;
    let x2 = xl + d;
    let f1 = f(x1);
    let f2 = f(x2);
    let xr, error;

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>xr</th><th>Error</th></tr>`;

    while (Math.abs(xu - xl) > tol) {
        if (f1 < f2) {
            xu = x2;
            x2 = x1;
            f2 = f1;
            d = (xu - xl) / phi;
            x1 = xu - d;
            f1 = f(x1);
        } else {
            xl = x1;
            x1 = x2;
            f1 = f2;
            d = (xu - xl) / phi;
            x2 = xl + d;
            f2 = f(x2);
        }

        xr = (xl + xu) / 2;
        error = Math.abs(xu - xl);
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${xr}</td><td>${error ?? "-"}</td></tr>`;

        iteraciones++;
    }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return { raiz: xr, iteraciones, errores };
}

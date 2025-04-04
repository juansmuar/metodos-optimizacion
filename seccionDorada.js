function seccionDorada(f, xl, xu, tol, resultadoDiv) {
    let iteraciones = 0;
    let errores = [];
    let phi = 0.618033;
    let d = phi * (xu - xl);
    let x1 = xl + d;
    let x2 = xl - d;

    let error;

    let tablaHTML = `<table border='1'><tr><th>Iteración</th><th>xl</th><th>xu</th><th>x1</th><th>x2</th><th>d</th><th>Error</th></tr>`;

    while (Math.abs(x1 - x2) > tol) {

        if (f(x2) > f(x1)) {
            xu = x1
        } else {
            xl = x2;
        }

        d = phi * (xu - xl)
        x1 = xl + d;
        x2 = xl - d;

        error = Math.abs(x1 - x2);
        errores.push(error);

        tablaHTML += `<tr><td>${iteraciones}</td><td>${xl}</td><td>${xu}</td><td>${x1}</td><td>${x2}</td><td>${d}</td><td>${error ?? "-"}</td></tr>`;

        iteraciones++;
    }

    tablaHTML += `</table>`;
    resultadoDiv.innerHTML += tablaHTML;
    return {iteraciones, errores };
}

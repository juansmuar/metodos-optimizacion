function interpolacionCuadratica(f, xl, xu, tol, resultadoDiv) {
    let x0 = xl;
    let x1 = (xl + xu) / 2;
    let x2 = xu;
    let iteraciones = 0;
    let errores = [];
    let xrAnterior = x1;
    let xr;

    while (true) {
        iteraciones++;

        const f0 = f(x0);
        const f1 = f(x1);
        const f2 = f(x2);

        const L0 = f0 / ((x0 - x1) * (x0 - x2));
        const L1 = f1 / ((x1 - x0) * (x1 - x2));
        const L2 = f2 / ((x2 - x0) * (x2 - x1));

        xr = 0.5 * (L0 * (x1 + x2) + L1 * (x0 + x2) + L2 * (x0 + x1)) / (L0 + L1 + L2);
        const error = Math.abs(xr - xrAnterior);
        errores.push(error);

        resultadoDiv.innerHTML += `
            <p>Iteración ${iteraciones} → x0: ${x0.toFixed(6)}, x1: ${x1.toFixed(6)}, x2: ${x2.toFixed(6)}, xr: ${xr.toFixed(6)}, error: ${error.toExponential(2)}</p>
        `;

        if (error < tol) break;

        const dist = [Math.abs(xr - x0), Math.abs(xr - x1), Math.abs(xr - x2)];
        const maxIndex = dist.indexOf(Math.max(...dist));
        if (maxIndex === 0) {
            x0 = xr;
        } else if (maxIndex === 1) {
            x1 = xr;
        } else {
            x2 = xr;
        }

        xrAnterior = xr;
    }

    return { raiz: xr, iteraciones, errores };
}

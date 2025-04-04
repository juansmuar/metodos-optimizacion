function calcular() {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    let funcStr = document.getElementById("funcion").value;
    let xl = parseFloat(document.getElementById("limiteInferior").value);
    let xu = parseFloat(document.getElementById("limiteSuperior").value);
    let tol = parseFloat(document.getElementById("tol").value);
    let metodo = document.getElementById("metodo").value;

    if (!funcStr || isNaN(xl) || isNaN(xu) || isNaN(tol)) {
        resultadoDiv.innerHTML = `<p style='color:red;'>Por favor, ingrese todos los valores.</p>`;
        return;
    }

    if (xl >= xu) {
        resultadoDiv.innerHTML = `<p style='color:red;'>El límite inferior debe ser menor que el superior.</p>`;
        return;
    }

    try {
        funcStr = procesarFuncion(funcStr);
        let f = new Function("x", `return ${funcStr};`);

        if (f(xl) * f(xu) >= 0) {
            resultadoDiv.innerHTML = `<p style='color:red;'>La función no tiene raices en el intervalo dado</p>`;
            return;
        }

        let resultado;
        switch (metodo) {
            case "biseccion":
                resultado = biseccion(f, xl, xu, tol, resultadoDiv);
                break;
            case "falsa_posicion":
                resultado = falsaPosicion(f, xl, xu, tol, resultadoDiv);
                break;
            case "seccion_dorada":
                resultado = seccionDorada(f, xl, xu, tol, resultadoDiv);
                break;
            case "interpolacion":
                resultado = interpolacionCuadratica(f, xl, xu, tol, resultadoDiv);
                break;
            default:
                resultadoDiv.innerHTML = `<p style='color:red;'>Método no válido seleccionado.</p>`;
                return;
        }

        resultadoDiv.innerHTML += `<p>Raíz aproximada: ${resultado.raiz} (Iteraciones: ${resultado.iteraciones})</p>`;
        console.log(resultado);

        graficarErrores(resultado.errores);
    } catch (error) {
        console.log(error);
        resultadoDiv.innerHTML = `<p style='color:red;'>Error en la función ingresada</p>`;
    }
}

function procesarFuncion(funcStr) {
    funcStr = funcStr
        .replace(/\^/g, "**")
        .replace(/\b(sin|cos|tan|log|sqrt|exp|abs)\b/g, "Math.$1")
        .replace(/(\d)([a-zA-Z])/g, "$1*$2")
        .replace(/([a-zA-Z])(\()/g, "$1*(");

    if (!validarParentesis(funcStr)) {
        throw new Error("Paréntesis desbalanceados");
    }
    return funcStr;
}

function validarParentesis(funcStr) {
    let balance = 0;
    for (let char of funcStr) {
        if (char === "(") balance++;
        if (char === ")") balance--;
        if (balance < 0) return false;
    }
    return balance === 0;
}

function graficarErrores(errores) {
    const canvas = document.getElementById('graficoErrores');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    const maxError = Math.max(...errores);
    const maxIter = errores.length;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    const escalaX = (width - 2 * padding) / maxIter;
    const escalaY = (height - 2 * padding) / maxError;

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    errores.forEach((error, i) => {
        const x = padding + i * escalaX;
        const y = height - padding - error * escalaY;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Iteración", width / 2, height - 5);
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Error", 0, 0);
    ctx.restore();
}


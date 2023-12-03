function analyzeTriangle() {
    const input1 = parseFloat(document.getElementById("input1").value);
    const input2 = parseFloat(document.getElementById("input2").value);
    const input3 = parseFloat(document.getElementById("input3").value);
    const select1 = document.getElementById("select1").value;
    const select2 = document.getElementById("select2").value;
    const select3 = document.getElementById("select3").value;

    // Verifica se os valores são válidos
    if (!isValidInput(input1, select1) || !isValidInput(input2, select2) || !isValidInput(input3, select3)) {
        alert("Insira valores válidos.");
        return;
    }

    // Verifica se a soma dos ângulos é válida
    if (select1 === "angle" && select2 === "angle" && select3 === "angle" && (input1 + input2 + input3 !== 180)) {
        alert("A soma dos ângulos deve ser 180 graus.");
        return;
    }

    // Determina o tipo de triângulo e tipo de ângulo, e exibe o resultado
    const triangleType = determineTriangleType(input1, input2, input3);
    const angleType = select1 === "angle" || select2 === "angle" || select3 === "angle"
        ? determineAngleType(input1, input2, input3)
        : "Indefinido";

    displayResult(triangleType, angleType);
}

function isValidInput(value, type) {
    return type === "side" ? value > 0 : (value >= 0 && value <= 360);
}

function determineTriangleType(side1, side2, side3) {
    const sides = [side1, side2, side3];
    const uniqueSides = [...new Set(sides)];

    if (uniqueSides.length === 1) {
        displayImage("equilatero.png");
        return "Equilátero";
    } else if (uniqueSides.length === 2) {
        const angles = [side1, side2, side3];
        if (angles.some(angle => angle === 90)) {
            displayImage("isosceles-retangulo.png");
            return "Isósceles";
        } else if (angles.every(angle => angle < 90)) {
            displayImage("isosceles-acutangulo.png");
            return "Isósceles";
        } else if (angles.some(angle => angle > 90)) {
            displayImage("isosceles-obtusangulo.png");
            return "Isósceles";
        }
    } else {
        const angles = [side1, side2, side3];
        if (angles.some(angle => angle === 90)) {
            displayImage("escaleno-retangulo.png");
            return "Escaleno";
        } else if (angles.every(angle => angle < 90)) {
            displayImage("escaleno-acutangulo.png");
            return "Escaleno";
        } else if (angles.some(angle => angle > 90)) {
            displayImage("escaleno-obtusangulo.png");
            return "Escaleno";
        }
    }
}

function determineAngleType(angle1, angle2, angle3) {
    const angles = [angle1, angle2, angle3];

    if (angles.some(angle => angle === 90)) {
        return "Retângulo";
    } else if (angles.every(angle => angle < 90)) {
        return "Acutângulo";
    } else if (angles.some(angle => angle > 90)) {
        return "Obtusângulo";
    } else {
        return "Indefinido";
    }
}

function displayResult(triangleType, angleType) {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Tipo de Triângulo: ${triangleType}<br> Tipo de Ângulo: ${angleType}`;
}

function displayImage(imageName) {
    const imageElement = document.getElementById("graph");
    imageElement.innerHTML = `<img src="imagens/${imageName}" alt="Triângulo Image">`;
}
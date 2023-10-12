// Variables para el juego
var grid = []; // Matriz que representa la cuadrícula
var score = 0; // Puntuación del jugador

// Inicializa la cuadrícula del juego y muestra la cuadrícula en la interfaz.
function init() {
    for (var i = 0; i < 4; i++) {
        grid[i] = [];
        for (var j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
    updateGrid();
    generateTile();
    generateTile();
}

// Genera una ficha aleatoria en una posición vacía de la cuadrícula.
function generateTile() {
    var availableCells = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                availableCells.push({ x: i, y: j });
            }
        }
    }
    if (availableCells.length > 0) {
        var randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        var newValue = Math.random() < 0.9 ? 2 : 4; // La mayoría de las veces será 2, en ocasiones 4.
        grid[randomCell.x][randomCell.y] = newValue;
        updateGrid();
    }
}

// Actualiza la representación de la cuadrícula en la interfaz.
function updateGrid() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.getElementById("cell_" + i + "_" + j);
            var tileValue = grid[i][j];
            cell.innerHTML = tileValue === 0 ? "" : tileValue; // Actualiza el número en la ficha o deja la celda vacía.
            cell.className = "tile tile-" + tileValue; // Agrega clases CSS para dar estilo a la ficha.
        }
    }
    document.getElementById("score").textContent = score;
}

// Función para mover las fichas hacia la izquierda.
function moveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (grid[i][j] !== 0) {
                // Encuentra la posición a la izquierda más cercana donde se puede combinar o mover la ficha.
                for (var k = 0; k < j; k++) {
                    if (grid[i][k] === 0 || grid[i][k] === grid[i][j]) {
                        // Combina las fichas si son del mismo valor.
                        if (grid[i][k] === grid[i][j]) {
                            grid[i][k] *= 2;
                            score += grid[i][k];
                            grid[i][j] = 0;
                            break;
                        }
                        // Mueve la ficha a la celda vacía.
                        else if (grid[i][k] === 0) {
                            grid[i][k] = grid[i][j];
                            grid[i][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    generateTile(); // Genera una nueva ficha al final del movimiento.
    updateGrid(); // Actualiza la representación de la cuadrícula en la interfaz.
}


// Función para mover las fichas hacia la derecha.
function moveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (grid[i][j] !== 0) {
                // Encuentra la posición a la derecha más cercana donde se puede combinar o mover la ficha.
                for (var k = 3; k > j; k--) {
                    if (grid[i][k] === 0 || grid[i][k] === grid[i][j]) {
                        // Combina las fichas si son del mismo valor.
                        if (grid[i][k] === grid[i][j]) {
                            grid[i][k] *= 2;
                            score += grid[i][k];
                            grid[i][j] = 0;
                            break;
                        }
                        // Mueve la ficha a la celda vacía.
                        else if (grid[i][k] === 0) {
                            grid[i][k] = grid[i][j];
                            grid[i][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    generateTile(); // Genera una nueva ficha al final del movimiento.
    updateGrid(); // Actualiza la representación de la cuadrícula en la interfaz.
}


// Función para mover las fichas hacia arriba.
function moveUp() {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (grid[i][j] !== 0) {
                // Encuentra la posición más cercana hacia arriba donde se puede combinar o mover la ficha.
                for (var k = 0; k < i; k++) {
                    if (grid[k][j] === 0 || grid[k][j] === grid[i][j]) {
                        // Combina las fichas si son del mismo valor.
                        if (grid[k][j] === grid[i][j]) {
                            grid[k][j] *= 2;
                            score += grid[k][j];
                            grid[i][j] = 0;
                            break;
                        }
                        // Mueve la ficha a la celda vacía.
                        else if (grid[k][j] === 0) {
                            grid[k][j] = grid[i][j];
                            grid[i][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    generateTile(); // Genera una nueva ficha al final del movimiento.
    updateGrid(); // Actualiza la representación de la cuadrícula en la interfaz.
}

// Función para mover las fichas hacia abajo.
function moveDown() {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (grid[i][j] !== 0) {
                // Encuentra la posición más cercana hacia abajo donde se puede combinar o mover la ficha.
                for (var k = 3; k > i; k--) {
                    if (grid[k][j] === 0 || grid[k][j] === grid[i][j]) {
                        // Combina las fichas si son del mismo valor.
                        if (grid[k][j] === grid[i][j]) {
                            grid[k][j] *= 2;
                            score += grid[k][j];
                            grid[i][j] = 0;
                            break;
                        }
                        // Mueve la ficha a la celda vacía.
                        else if (grid[k][j] === 0) {
                            grid[k][j] = grid[i][j];
                            grid[i][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    generateTile(); // Genera una nueva ficha al final del movimiento.
    updateGrid(); // Actualiza la representación de la cuadrícula en la interfaz.
}

// Verifica si el jugador ha ganado el juego (alcanzado 2048).
function checkWin() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === 2048) {
                // El jugador ha alcanzado la ficha 2048, muestra un mensaje de victoria.
                alert("¡Has ganado! ¡Alcanzaste la ficha 2048!");
                // Puedes agregar aquí más acciones, como reiniciar el juego.
                return;
            }
        }
    }
}

// Función para verificar si el jugador ha perdido el juego.
function checkLoss() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                // Si hay una celda vacía, el jugador no ha perdido.
                return false;
            }
            if (i < 3 && grid[i][j] === grid[i + 1][j]) {
                // Si la ficha actual es igual a la de la derecha, el jugador no ha perdido.
                return false;
            }
            if (j < 3 && grid[i][j] === grid[i][j + 1]) {
                // Si la ficha actual es igual a la de abajo, el jugador no ha perdido.
                return false;
            }
        }
    }
    // Si no se cumple ninguna de las condiciones anteriores, el jugador ha perdido.
    alert("¡Has perdido! No hay más movimientos posibles.");
    // Puedes agregar aquí más acciones, como reiniciar el juego.
    return true;
}


// Maneja eventos de teclado para mover las fichas.
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    } else if (event.key === 'ArrowUp') {
        moveUp();
    } else if (event.key === 'ArrowDown') {
        moveDown();
    }
    // Después de cada movimiento, verifica si el jugador ha ganado o perdido y actualiza la puntuación.
    checkWin();
    checkLoss();
});

// Inicializa el juego cuando la página se carga.
window.addEventListener('load', init);


document.getElementById("start-button").addEventListener("click", function() {
    init(); // Llama a la función init cuando se hace clic en el botón.
});


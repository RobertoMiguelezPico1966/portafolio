
 // Lógica del videojuego

const player = document.getElementById("player");
const map = document.getElementById("map");

// Puntos del mapa
const nodes = {
    start: document.querySelector(".start-node"),
    about: document.querySelector(".about-node"),
    skills: document.querySelector(".skills-node"),
    projects: document.querySelector(".projects-node"),
    education: document.querySelector(".education-node")
};

// Caminos que conectan los puntos
const connections = {
    start: ["about"],
    about: ["start", "skills", "projects"],
    skills: ["about"],
    projects: ["about", "education"],
    education: ["projects"]
};

// Movimientos permitidos
const movements = {
    start: {
        right: "about"
    },
    about: {
        left: "start",
        up: "skills",
        right: "projects"
    },
    skills: {
        down: "about"
    },
    projects: {
        left: "about",
        right: "education",
        down: "education"
    },
    education: {
        left: "projects",
        up: "projects"
    }
};

// Punto inicial
let currentNode = "start";

// Colocar al personaje en el centro de un punto
function placePlayerAtNode(nodeName) {
    const mapPosition = map.getBoundingClientRect();
    const nodePosition = nodes[nodeName].getBoundingClientRect();

    const x =
        nodePosition.left + nodePosition.width / 2 - mapPosition.left;

    const y =
        nodePosition.top + nodePosition.height / 2 - mapPosition.top;

    player.style.left = x + "px";
    player.style.top = y + "px";
    player.style.transform = "translate(-50%, -50%)";
}

// Actualizar el punto seleccionado
function selectNode(nodeName) {
    currentNode = nodeName;

    // Quitar el tamaño extra del punto anterior
    Object.values(nodes).forEach(function(node) {
        node.classList.remove("active");
    });

    // Destacar el punto actual
    nodes[currentNode].classList.add("active");

    // Mover el personaje
    placePlayerAtNode(currentNode);

    console.log("Nodo actual:", currentNode);
}

// Mover al personaje con el teclado
function movePlayer(direction) {
    const nextNode = movements[currentNode][direction];

    if (nextNode) {
        selectNode(nextNode);
    }
}

// Detectar las flechas del teclado
document.addEventListener("keydown", function(event) {
    const keys = {
        ArrowRight: "right",
        ArrowLeft: "left",
        ArrowUp: "up",
        ArrowDown: "down"
    };

    const direction = keys[event.key];

    if (direction) {
        event.preventDefault();
        movePlayer(direction);
    }
});

// Seleccionar puntos directamente con el ratón
Object.entries(nodes).forEach(function(entry) {
    const nodeName = entry[0];
    const node = entry[1];

    node.addEventListener("click", function() {
        selectNode(nodeName);
    });
});

// Colocar al personaje al iniciar
selectNode(currentNode);

// Recalcular la posición si cambia el tamaño de la ventana
window.addEventListener("resize", function() {
    placePlayerAtNode(currentNode);
});

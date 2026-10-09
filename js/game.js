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

// Movimientos permitidos desde cada punto
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
        down: "education"
    },
    education: {
        up: "projects"
    }
};

// Punto inicial del personaje
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

// Mover al personaje
function movePlayer(direction) {
    const nextNode = movements[currentNode][direction];

    if (nextNode) {
        currentNode = nextNode;
        placePlayerAtNode(currentNode);

        console.log("Nodo actual:", currentNode);
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

// Colocar al personaje en el punto inicial
placePlayerAtNode(currentNode);

console.log("Punto inicial:", currentNode);
console.log("Conexiones:", connections);

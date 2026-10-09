// Lógica del videojuego
const player = document.getElementById("player");

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

// Punto donde empieza el personaje
let currentNode = "start";

console.log("Punto inicial:", currentNode);
console.log("Conexiones:", connections);

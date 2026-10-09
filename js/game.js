
const player = document.getElementById("player");
const map = document.getElementById("map");

const sectionScreen = document.getElementById("section-screen");
const sectionContent = document.getElementById("section-content");
const backButton = document.getElementById("back-button");

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

// Contenido provisional de los apartados
const sections = {
    
    about: {
        title: "SOBRE MÍ",
        content: `
            <p>
                Soy estudiante de Desarrollo de Aplicaciones Web y técnico
                informático. Combino mis conocimientos técnicos con mi
                creatividad y mi interés por el diseño para crear experiencias
                digitales funcionales y visualmente atractivas.
            </p>

            <h3>Diseño web · Mussara</h3>
            <p>
                Experiencia en diseño y desarrollo web, tanto en la creación
                de páginas desde cero como en la mejora y modificación de
                sitios existentes. He trabajado en el diseño visual de páginas,
                buscando una buena presentación de los contenidos y una
                experiencia de usuario atractiva.
            </p>

            <h3>Técnico informático · OneSystem</h3>
            <p>
                Experiencia en reparación y mantenimiento de ordenadores,
                instalación y configuración de sistemas operativos y
                controladores, y venta online de equipos informáticos.
            </p>
        `
    },
   
skills: {
    title: "HABILIDADES",
    content: `
        <h3>Lenguajes de programación y marcas</h3>
        <p>
            HTML5 · CSS3 · JavaScript · Java · PHP · .NET · C#
        </p>

        <h3>Herramientas de desarrollo</h3>
        <p>
            Visual Studio 2022 · Visual Studio Code · Apache ·
            Dreamweaver · GitHub · WordPress
        </p>

        <h3>Administración de sistemas y hardware</h3>
        <p>
            Instalación y administración de sistemas operativos
            Windows, reparación y mantenimiento de hardware.
        </p>
    `
},
    projects: {
        title: "PROYECTOS",
        content: "<p>Aquí podrás presentar tus proyectos.</p>"
    },
    education: {
        title: "FORMACIÓN",
        content: "<p>Aquí aparecerán tus estudios y certificados.</p>"
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

    Object.values(nodes).forEach(function(node) {
        node.classList.remove("active");
    });

    nodes[currentNode].classList.add("active");

    placePlayerAtNode(currentNode);

    console.log("Nodo actual:", currentNode);
}

// Mover al personaje
function movePlayer(direction) {
    const nextNode = movements[currentNode][direction];

    if (nextNode) {
        selectNode(nextNode);
    }
}

// Abrir el apartado seleccionado
function openSection() {
    const section = sections[currentNode];

    // El punto inicial no tiene apartado
    if (!section) {
        return;
    }

    sectionContent.innerHTML =
        "<h2>" + section.title + "</h2>" + section.content;

    sectionScreen.hidden = false;
}

// Volver al mapa
function closeSection() {
    sectionScreen.hidden = true;
}

// Botón para volver al mapa
backButton.addEventListener("click", closeSection);

// Detectar las teclas
document.addEventListener("keydown", function(event) {

    // Si un apartado está abierto, no mover al personaje
    if (!sectionScreen.hidden) {
        if (event.key === "Escape") {
            closeSection();
        }

        return;
    }

    // Abrir apartado con Enter
    if (event.key === "Enter") {
        openSection();
        return;
    }

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

// Seleccionar puntos con el ratón
Object.entries(nodes).forEach(function(entry) {
    const nodeName = entry[0];
    const node = entry[1];

    node.addEventListener("click", function() {
        selectNode(nodeName);
    });
});

// Colocar al personaje al iniciar
selectNode(currentNode);

// Recalcular la posición al cambiar el tamaño de la ventana
window.addEventListener("resize", function() {
    placePlayerAtNode(currentNode);
});

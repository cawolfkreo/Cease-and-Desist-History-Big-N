"use strict";

//TODO: Funcion(es) para crear divs, p, h3 y a con los parámetros necesarios
//TODO: Guardar el a en el contenedor y los items en el a.
//TODO: Separar formulario de busqueda de la lista de items.
//TODO: Filtrado con palabras clave.
//TODO: Usar iconos.

/**
 * Formats a date to a simple string
 * @param {Date} dateToFormat The date we need to format as a string
 */
function formatDate(dateToFormat) {
    const options = {
        year: "numeric",
        month: "long"
    }
    const formater = new Intl.DateTimeFormat("en-US", options);

    return formater.format(dateToFormat);
}

/**
 * creates an html Element that will
 * be used to display the 
 * information of the incident on 
 * the website
 * @param {object} incident Object that contains the information of an incident that will be shown on the website
 * @returns The new cell to insert on the DOM of the website.
 */
function createDataCell(incident) {
    const container = document.createElement("div");
    container.className = "dataCell";

    const icon = document.createElement("p");
    icon.innerText = incident.icon;
    container.appendChild(icon);

    const date = document.createElement("p");
    incident.date = new Date(incident.date);
    date.innerText = formatDate(incident.date);
    date.className = "dateText";
    container.appendChild(date);

    const name = document.createElement("h3");
    name.innerText = incident.name;
    container.appendChild(name);

    const description = document.createElement("p");
    description.innerText = incident.description;
    container.appendChild(description);

    const anchor = document.createElement("a");
    anchor.href = incident.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.appendChild(container);

    return anchor;
}

/**
 * Updates the DOM of the website to
 *  display it to the user.
 * @param {Array<Object>} data The data that will be used to update the DOM
 */
function updateDom(data) {
    const contentElem = document.querySelector(".content");
    contentElem.innerHTML = "";

    for (const incident of data) {
        const container = createDataCell(incident);
        contentElem.appendChild(container);
    }
}

/**
 * Loads the information from the
 * static json file passed.
 * @param {String} dataPath The path where the data will be fetched.
 */
async function loadData(dataPath) {
    const rawResult = await fetch(dataPath);
    const data = await rawResult.json();
    console.table(data);
    updateDom(data);
}

onload = () => {
    const dataPath = "./data/data.json";
    loadData (dataPath);
}
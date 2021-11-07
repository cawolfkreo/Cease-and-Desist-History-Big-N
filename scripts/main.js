"use strict";

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
 * Creates an element with the given parameters.
 * @param {String} tagname The tag name for the element that will be created
 * @param {String} [className] The class name that will be added to the element. 
 * @param {String} [innerText] Any text that will be placed inside the object
 * @param {String} [href] The href to use if the element is an anchor.
 * @returns The created HTML Element.
 */
function createElement(tagname, className=null, innerText=null, href=null) {
    const element = document.createElement(tagname);
    if(className)
        element.className = className;

    if(innerText)
        element.innerText = innerText;
    
    if(tagname === "a" && href) {
        element.href = href;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
    }

    return element;
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
    const container = createElement("div", "dataCell");

    const icon = createElement("p", null, incident.icon);
    container.appendChild(icon);

    incident.date = new Date(incident.date);
    const date = createElement("p", "dateText", formatDate(incident.date));
    container.appendChild(date);

    const name = createElement("h3", null, incident.name);
    container.appendChild(name);

    const description = createElement("p", null, incident.description);
    container.appendChild(description);

    const anchor = createElement("a", null, null, incident.url);
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
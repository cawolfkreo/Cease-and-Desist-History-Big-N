"use strict";

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
 * @param {Object} [atributes] The attribues object to use for the object created.
 * @param {String} [atributes.className] The class name that will be added to the element. 
 * @param {String} [atributes.innerText] Any text that will be placed inside the object
 * @param {String} [atributes.href] The href to use if the element is an anchor.
 * @returns The created HTML Element.
 */
function createElement(tagname, {className, innerText, href}) {
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
 * @param {string} incident.icon The path for the icon of the incident
 * @param {string} incident.date The date when the incident happened
 * @param {string} incident.name The name or Title for the incident
 * @param {string} incident.description The description of what happened
 * @param {string} incident.url The archive url with the report
 * @returns The new cell to insert on the DOM of the website.
 */
function createDataCell({icon, date: dateStr, name, description, url}) {
    const container = createElement("div", {className: "dataCell"});

    const anchor = createElement("a", {href: url});
    container.appendChild(anchor);

    const iconElem = createElement("p", {innerText: icon});
    anchor.appendChild(iconElem);

    dateStr = formatDate(new Date(dateStr));
    const dateElem = createElement("p", {className: "dateText", innerText: dateStr});
    anchor.appendChild(dateElem);

    const nameElem = createElement("h3", {innerText: name});
    anchor.appendChild(nameElem);

    const descriptElem = createElement("p", {innerText: description});
    anchor.appendChild(descriptElem);

    return container;
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
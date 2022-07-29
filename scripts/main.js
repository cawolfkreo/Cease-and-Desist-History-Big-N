"use strict";

/**
* One of the incidents that have
* ocurred over the years regarding
* certain videogame company.
* @typedef {Object} Incident
* @property {String} url The reference for this incident.
* @property {String} icon The type of incident (as well a the icon that will be shown).
* @property {String} date When the incident ocurred in string form (can be directly converted to Date).
* @property {String} name The name for the incident.
* @property {String} description The description for the incident.
* @property {string} [alt] The alt for the icon of the incident
*/

/**
* This is a simple "enum + dict" of
* the different types of incidents
* that could be stored on the
* data.json that will be received.
*/
const ITEMS_KEY = {
    "balance.svg": {
        alt: "A balance with no loads or lifts on it. It's in equilibrium.",
        message: "Nintendo has collected !num coins."
    },
    "block.svg": {
        alt: "A circle with a stroke in the middle. Represents blocking or prevention.",
        message: "Nintendo re-locked content !num times."
    },
    "law.svg": {
        alt: "A Gavel floating in a 45 degree angle.",
        message: "Nintendo invited lawyers to smash !num times."
    },
}

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
* @param {String} [atributes.src] The src for the image if the element is an img.
* @param {String} [atributes.alt] The alt about the image if the element is an img.
* @param {HTMLElement[]} [childs] A list of all the child elements that will be in the element.
* @returns The created HTML Element.
*/
function createElement(tagname, {className, innerText, href, src, alt}={}, childs=[]) {
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
    
    if(tagname === "img" && src) {
        element.src = src;
        element.alt = alt;
    }
    
    for (const child of childs) {
        element.appendChild(child);
    }
    
    return element;
}

/**
 * Renders a list of elements inside
 * an already existing HTMLElement
 * in the browser's DOM.
 * @param {HTMLElement} parentElem The parent element where the render will take place
 * @param {HTMLElement[]} childs The array of children elements to render inside the parent
 */
function render(parentElem, childs=[]) {
    const fragment = document.createDocumentFragment();
    childs.forEach(child => fragment.appendChild(child));
    parentElem.appendChild(fragment);
}

/**
* Filters the array of objects by
* looking at the name and
* description of each incident and
* showing only the items that pass
* the filter. After the filter is
* done, the DOM will be updated too.
* @param {string} filter The fitler that will be used to filter the data.
* @param {Array<Incident>} data The data that will be used to update the DOM when filtering.
*/
function filterData(filter, data) {
    filter = filter.toLowerCase();
    const filteredData = data.filter(incident => {
        const name = incident.name.toLowerCase();
        const desc = incident.description.toLowerCase();
        return name.includes(filter) || desc.includes(filter);
    });
    updateGrid(filteredData);
}

/**
* This attaches a listener to the
* input whenever a user presses a
* key (keyup) and said listener
* Will then filter the DOM 
* accordingly.
* @param {Array<Incident>} data The data that will be used to update the DOM when filtering.
*/
function attachToInput(data) {
    const inputElem = document.getElementById("searchInpt");
    inputElem.addEventListener("keyup", ev => {
        if (ev.key === "Enter") {
            ev.preventDefault();
        }
        filterData(inputElem.value, data);
    });
}

/**
* Calculates the total number of
* incidents for each type of
* incidents on the array.
* @param {Array<Incident>} data 
* @returns An object with each type of incident as it's properties and the total number of each of them in data.
*/
function countIncidentTypes(data) {
    const totals = {};
    
    for (const incidentType in ITEMS_KEY) {
        const typeCount = data.filter(incident => incident.icon === incidentType).length;
        totals[incidentType] = typeCount;
    }
    
    return totals
}

/**
* Creates a paragraph with based on the specified message and the count of incidents passed
* @param {Number} count The count to be displayed on the paragraph for this incident
* @param {String} templateMsg The template message to use for the paragraph text
* @param {Object} [atributes] The attribues object to use for the object created.
* @returns An <p> HTML element with the message on it.
*/
function incidentCounterMessage(count, templateMsg, atributes={}) {
    const indivdualCounter = createElement("p", atributes);
    const message = templateMsg.replace("!num", `<span class="num">${count}</span>`);
    indivdualCounter.innerHTML = message;
    return indivdualCounter;
}

function specificCountersRow(data) {
    const incidentTotals = countIncidentTypes(data);
    const incidentTypes = Object.entries(ITEMS_KEY);
    
    return createElement("div", {className: "countRow"}, 
        incidentTypes.map(([incidentType, typeItem]) => (
            createElement("div", {className:"countDiv"}, [
                createElement("img", {src: `./images/${incidentType}`, alt: typeItem.alt}),
                incidentCounterMessage(incidentTotals[incidentType], typeItem.message)
            ])
        ))
    );
}

/**
 * Renders the counter message for the
 * incident count.
 * @param {Text} prefix The text node to display before the counter
 * @param {Number} count The count to display
 * @param {Text} suffix The text node to display after the counter
 * @param {Object} [atributes] The attribues object to use for the object created.
 * @returns A <p> HTML element with the message counter on it.
 */
function test(prefix, count, suffix, attribues={}) {
    return createElement("p", attribues,[
        document.createTextNode(prefix),
        createElement("span", { className: "num", innerText: count}),
        document.createTextNode(suffix)
    ]);
}

/**
 * Creates a counter element that
 * will display the total number of
 * incidents listed so far
 * @param {Number} count The ammount of incidents that will be displayed in the counter
 * @returns The global counter displaying the total number of incidents so far 
 */
function globalCounter(count) {
    return test("Nintendo played this game ", count, " times.", {className: "globalCount"});
}

/**
* Updates the counters of the
* website to display them to the
* user.
* @param {Array<Incident>} data The data that will be used to update the DOM
*/
function updateCount(data) {
    const countersElem = document.querySelector(".counters");
    render(countersElem, [
        globalCounter(data.length),
        specificCountersRow(data),
        createElement("hr")
    ]);
}

/**
* creates an html Element that will
* be used to display the 
* information of the incident on 
* the website
* @param {Incident} incident Object that contains the information of an incident that will be shown on the website
* @returns The new cell to insert on the DOM of the website.
*/
function createDataCell({icon, alt, date: dateStr, name, description, url}) {
    dateStr = formatDate(new Date(dateStr));
    
    return createElement("div", {className: "dataCell"}, [
        createElement("a", {href: url}, [
            createElement("img", {src: `./images/${icon}`, alt}),
            createElement("p", {className: "dateDate", innerText: dateStr}),
            createElement("h2", {innerText: name}),
            createElement("p", {innerText: description})
        ]),
    ]);
}

/**
* Updates the DOM of the website to
* display it to the user.
* @param {Array<Incident>} data The data that will be used to update the DOM
*/
function updateGrid(data) {
    const gridContainer = document.querySelector(".grid");
    gridContainer.innerHTML = "";

    render(gridContainer, 
        data.map(incident => {
            incident.alt = ITEMS_KEY[incident.icon].alt;
            return createDataCell(incident);
        })
    );
}

/**
* Loads the information from the
* static json file passed.
* @param {String} dataPath The path where the data will be fetched.
*/
async function loadData(dataPath) {
    const rawResult = await fetch(dataPath);
    const data = await rawResult.json();
    updateGrid(data);
    updateCount(data);
    attachToInput(data);
}

onload = () => {
    const dataPath = "./data/data.json";
    loadData (dataPath);
}

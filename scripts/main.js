"use strict";

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
 * @returns The created HTML Element.
 */
function createElement(tagname, {className, innerText, href, src, alt}) {
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

    return element;
}

/**
 * creates an html Element that will
 * be used to display the 
 * information of the incident on 
 * the website
 * @param {object} incident Object that contains the information of an incident that will be shown on the website
 * @param {string} incident.icon The path for the icon of the incident
 * @param {string} incident.alt The alt for the icon of the incident
 * @param {string} incident.date The date when the incident happened
 * @param {string} incident.name The name or Title for the incident
 * @param {string} incident.description The description of what happened
 * @param {string} incident.url The archive url with the report
 * @returns The new cell to insert on the DOM of the website.
 */
function createDataCell({icon, alt, date: dateStr, name, description, url}) {
    const container = createElement("div", {className: "dataCell"});

    const anchor = createElement("a", {href: url});
    container.appendChild(anchor);

    const iconElem = createElement("img", {src: `./images/${icon}`, alt});
    anchor.appendChild(iconElem);

    dateStr = formatDate(new Date(dateStr));
    const dateElem = createElement("p", {className: "dateDate", innerText: dateStr});
    anchor.appendChild(dateElem);

    const nameElem = createElement("h3", {innerText: name});
    anchor.appendChild(nameElem);

    const descriptElem = createElement("p", {innerText: description});
    anchor.appendChild(descriptElem);

    return container;
}

/**
 * Filters the array of objects by
 * looking at the name and
 * description of each incident and
 * showing only the items that pass
 * the filter. After the filter is
 * done, the DOM will be updated too.
 * @param {string} filter The fitler that will be used to filter the data.
 * @param {Array<Object>} data The data that will be used to update the DOM when filtering.
 */
function filterData(filter, data) {
    filter = filter.toLowerCase();
    const filteredData = data.filter(incident => {
        const name = incident.name.toLowerCase();
        const desc = incident.description.toLowerCase();
        return name.includes(filter) || desc.includes(filter);
    });
    updateDom(filteredData);
}

/**
 * This attaches a listener to the
 * input whenever a user presses a
 * key (keyup) and said listener
 * Will then filter the DOM 
 * accordingly.
 * @param {Array<Object>} data The data that will be used to update the DOM when filtering.
 */
function attachToInput(data) {
    const inputElem = document.getElementById("searchInpt");
    console.log(inputElem);
    inputElem.addEventListener("keyup", ev => {
        if (ev.key === "Enter") {
            ev.preventDefault();
        }
        filterData(inputElem.value, data);
    });
}

/**
 * Updates the DOM of the website to
 *  display it to the user.
 * @param {Array<Object>} data The data that will be used to update the DOM
 */
function updateDom(data) {
    const contentElem = document.querySelector(".grid");
    const countElem = document.querySelector(".count");
    countElem.innerText = `Displaying ${data.length} items.`
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
    attachToInput(data);
}

onload = () => {
    const dataPath = "./data/data.json";
    loadData (dataPath);
}

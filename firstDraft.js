"use strict"

let main = function() {
    let submit = document.querySelector("#submit");
    let clear = document.querySelector("#clear-items");
    let groceryItems = document.querySelector(".grocery-items");
    let edit

    // refresh
    window.addEventListener("DOMContentLoaded", event => {
        load(groceryItems)
    })

    // add items
    submit.addEventListener("click", event => {
        let inputItem = document.querySelector("#input-item");
        let getValue = inputItem.value;
        let groceryItems = document.querySelector(".grocery-items");

        if (!inputItem.value.length) {
            inputItem.placeholder = "Enter A Item";
            inputItem.style.border = "solid 3px";
            inputItem.style.borderRadius = "5px";
            inputItem.style.borderColor = "red";
        } else {
            addItem(getValue);
            location.reload();
            load(groceryItems);
        }
    })

    // clear items
    clear.addEventListener("click", () => {
        clearItems(groceryItems)
    })
}()

// check item
function checkItem(container) {
    let check = document.querySelectorAll(".check");

    check.forEach(element => {
        let e = element.parentElement.parentElement.children[0];
        checkLocalStorage(e)
        element.addEventListener("click", event => {
            let para = event.currentTarget.parentElement.parentElement.children[0];
            // console.log(para)
            localStorage.setItem(`${para.innerText}Check`, "line-through")
            location.reload()
        })
    })
}

// checking the local storage
function checkLocalStorage(element) {
    let key = element.innerText;
    let localStorageKey = Object.keys(localStorage);
    let check = `${key}Check`;

    for (let value of localStorageKey) {
        if (check === value) {
            element.style.textDecoration = localStorage.getItem(value);
        }
    }
}

// // edit element value
function getInputValue(elementValue) {
    let submit = document.querySelector("#submit");
    let inputItem = document.querySelector("#input-item");

    submit.addEventListener("click", event => {
        localStorage.removeItem(elementValue);
        localStorage.setItem(inputItem.value, inputItem.value);
    }) 
}

// // edit item
function editItem() {
    let items = document.querySelectorAll(".item");

    items.forEach((element, index) => {
        element.addEventListener("click", event => {
            // set value 
            let elementValue = event.currentTarget.textContent;
            let inputItem = document.querySelector("#input-item");
            inputItem.setAttribute("value", elementValue);
            getInputValue(elementValue);
        })

    })
}

// remove item
function removeItem(container) {
    let removes = document.querySelectorAll(".delete");

    removes.forEach((element, index) => {
        element.addEventListener("click", event => {
            let elementValue = event.currentTarget.parentElement.getAttribute("value");
            localStorage.removeItem(elementValue);

            container.innerHTML = addRemoveToContainer();
            removeItem(container);
            // editItem(container)
            location.reload()
        })
    })
}   

// for refresh or add 
function load(container) {
    container.innerHTML = addRemoveToContainer();

    removeItem(container);
    editItem(container);
    checkItem(container);
}

// add items to local storage
function addItem(item) {
   localStorage.setItem(item, item);
}

function addRemoveToContainer() {
    let items = Object.values(localStorage).map(element => {
        if (element !== "line-through") {
        return `<div class="item-container">
                    <p class="item">${element}</p>
                    <div class="edit-delete" value="${element}">
                        <button class="check">&#10004</button>
                        <button class="delete">X</button>
                    </div>
                </div>`
        }
    }).join("")

    return items
}

// clear grocery items
function clearItems(groceryItems) {
    localStorage.clear();
    groceryItems.innerHTML = addRemoveToContainer();
}
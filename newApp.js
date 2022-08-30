"use strict"
import * as module from "./helperFunctions.js";

let main = function() {
    let submit = document.querySelector("#submit");
    let clearBtn = document.querySelector("#clear-items");
    let groceryItems = document.querySelector(".grocery-items");
    let input = document.querySelector("#input-item");
    let indexOfSelectedElement = null;

    displayItems()
    // add items
    submit.addEventListener("click", event => {
        let input = document.querySelector("#input-item");
        let inputValue = input.value;
        
        if (inputValue.length) {
        

            if (indexOfSelectedElement !== null) {
                editElement(indexOfSelectedElement, inputValue);
                indexOfSelectedElement = null;
            } else {
                module.addItemStorage(inputValue);
            } 
        } else {
            let input = document.querySelector("#input-item");

            input.innerText = "Enter Grocery";
            input.classList.add("error");
        }
     
        displayItems()
    })

    // clear items storage
    clearBtn.addEventListener("click", event => {
        localStorage.clear();
        module.storage();
        displayItems();
    })

    // mouse event of grocey items children
    groceryItems.addEventListener("click", event => {
        let index = event.target.parentElement.getAttribute("index");
        let value = event.target.parentElement.children[0].textContent;
        let command = event.target.className;
        indexOfSelectedElement = index;

        // console.log(command)
        action(indexOfSelectedElement, command, value);
        displayItems()
    })

    input.addEventListener("keydown", event => {
            let inputValue = input.value;
            
            if (!inputValue) {
                let submit = document.querySelector("#submit");
    
                submit.value = "Submit";
            }
    })    
}()

// display items in local storage
function displayItems() {
    let container = JSON.parse(localStorage.getItem("container"));
    let groceryItems = document.querySelector(".grocery-items");

    let html = container.map((element, index) => {
        return  `<div class="item-container" index=${index}>
                    <p class="item">${element}</p>
                        <button class="check">&#10004</button>
                        <button class="delete">X</button>
                </div>`
    }).join("");

    groceryItems.innerHTML = html;
    checkItem()
}

// action for check 
function checkItem() {
    let items = document.querySelectorAll(".item");
    let keys = Object.keys(localStorage);

   
    items.forEach(elementP => {
        keys.forEach(keyValue => {
            if (elementP.innerText.toLowerCase() === keyValue) {
                elementP.classList.add("line-through");
            }
        })
    })
}

// action to be done
function action(idx, type, textContent) {
    if (type === "delete") {
        deleteElement(idx);
    } else if (type === "check") {
        localStorage.setItem(textContent, "line-through");
    } else if (type === "item") {
        let input = document.querySelector("#input-item");
        let submit = document.querySelector("#submit");

        submit.value = "Edit";
        input.value = textContent.toUpperCase();
    }
}

// delete element 
function deleteElement(idx) {
    let toDelete = JSON.parse(localStorage.getItem("container"))[idx];

    module.removeItemStorge(toDelete);
}

// edit element 
function editElement(idx, newItem) {
    let toEdit = JSON.parse(localStorage.getItem("container"))[idx];

    module.editItemStorage(toEdit, newItem);
}
"use strict"

// let main = function() {
//     storage();
//     addItemStorage("car");
//     console.log(localStorage)
//     addItemStorage("toy");

//     console.log(indexStorage("car"))
//     removeItemStorge("toy");
//     addItemStorage("helmet");
//     removeItemStorge("car");

//     addItemStorage("crab");
//     editItemStorage("helmet", "crab");
//     storage();
//     console.log(localStorage)
// }()

// local storage
// can clear all items in storage
export function storage(container = []) {
    let stringContainer = JSON.stringify(container) 

    localStorage.setItem("container", stringContainer)
}

// add to local storage
export function addItemStorage(item) {
    let container = JSON.parse(localStorage.getItem("container"));

    if (!container.includes(item)) {
        container.push(item);
    }
    
    storage(container)
}

// get index of storage
// also use to select the item
export function indexStorage(item) {
    let container = JSON.parse(localStorage.getItem("container"));
    let idx = container.indexOf(item);

    return idx
}

// remove item
export function removeItemStorge(item) {
    let container = JSON.parse(localStorage.getItem("container"));
    let idx = indexStorage(item);

    container.splice(idx, 1);
    storage(container);
}

// edit item
export function editItemStorage(item, newItem) {
    let container = JSON.parse(localStorage.getItem("container"));
    let idx = indexStorage(item);

    if (!container.includes(newItem)) {
        container.splice(idx, 1, newItem);
    }
  
    storage(container);
}
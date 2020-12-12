window.addEventListener('load', () => {
    const inputList = document.querySelector(".inputList");
    const quantity = document.querySelector(".quantity");
    const btnSubmit = document.querySelector(".submitButton");
    const shoppingList = document.querySelector(".shopping-list");
    const filterOption = document.querySelector(".filterList");


    function addItemtoList(e) {
        e.preventDefault();
        const itemUl = document.createElement("ul");
        itemUl.classList.add("mainItemUl");
        shoppingList.appendChild(itemUl);

        const addItem = document.createElement("li");
        addItem.innerHTML = inputList.value + " - " + quantity.value;
        itemUl.appendChild(addItem);
        addItem.classList.add("items");

        saveLocalTodos(inputList.value + " - " + quantity.value);

        const doneButton = document.createElement("button");
        doneButton.innerHTML = `<i class="far fa-check-square"></i>`;
        itemUl.appendChild(doneButton);
        doneButton.classList.add("doneBtn");

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
        itemUl.appendChild(trashButton);
        trashButton.classList.add("trashBtn");

        inputList.value = "";
        quantity.value = "1";

        doneButton.addEventListener("click", doneItems);
        trashButton.addEventListener("click", removeItem);


    }


    function doneItems(e) {
        const element = e.target.parentElement;
        element.querySelector('li').classList.toggle("itemDoneTextCrossed");
        element.classList.toggle("itemDoneTextCrossed");
    }

    function removeItem(e) {
        const elementToDelete = e.target.parentElement;
        elementToDelete.classList.add("deletedItem");
        removeFromLocal(elementToDelete);
        elementToDelete.addEventListener("transitionend", e => {
            elementToDelete.remove();
        });
    }


    function filterList(e) {
        const todos = shoppingList.childNodes;
        todos.forEach(function (todo) {
            switch (e.target.value) {
                case 'completed':
                    if (todo.classList.contains("itemDoneTextCrossed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;

                case 'all':
                    todo.style.display = "flex";
                    break;

                case 'uncompleted':
                    if (!todo.classList.contains("itemDoneTextCrossed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break
            }
        });
    }

    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getItemsFromLocal() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.forEach(function (todo) {
            const itemUl = document.createElement("ul");
            itemUl.classList.add("mainItemUl");
            shoppingList.appendChild(itemUl);

            const addItem = document.createElement("li");
            addItem.innerHTML = todo;
            itemUl.appendChild(addItem);
            addItem.classList.add("items");

            const doneButton = document.createElement("button");
            doneButton.innerHTML = `<i class="far fa-check-square"></i>`;
            itemUl.appendChild(doneButton);
            doneButton.classList.add("doneBtn");

            const trashButton = document.createElement("button");
            trashButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
            itemUl.appendChild(trashButton);
            trashButton.classList.add("trashBtn");

            doneButton.addEventListener("click", doneItems);
            trashButton.addEventListener("click", removeItem);
        })
    };

    function removeFromLocal(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
            const todoIndex = todo.children[0].innerText;
            todos.splice(todos.indexOf(todoIndex), 1);
            localStorage.setItem("todos",JSON.stringify(todos));
    }

    getItemsFromLocal();

    btnSubmit.addEventListener("click", addItemtoList);
    filterOption.addEventListener("change", filterList);

})

let itemList = [];

document.getElementById("btnAddExpense").addEventListener("click", addExpense);

if (!localStorage.itemList){
    localStorage.setItem("itemList", JSON.stringify(itemList));
    isEmptyList();
} else {
    itemList = JSON.parse(localStorage.itemList);
    console.log(itemList);
    refreshList();
    isEmptyList();
}

function isEmptyList(){
    if(itemList.length === 0){
        document.getElementById("list").innerHTML = "<p class='p-4 text-center alert alert-info role='alert'>There are no expenses yet, try adding one!</p>";
    }
}

function refreshList(){
    let list = "<div class='table-responsive'><table class='table'><thead><tr class='table-dark'>" + 
    "<th scope='col' class='text-center'>Id<button type='button' class='btn btn-dark p-0' onclick='sortItemsByIdAscendant()'>(↓)</button><button type='button' class='btn btn-dark p-0' onclick='sortItemsByIdDescendent()'>(↑)</button></th>" +
    "<th scope='col' class='text-center'>Name<button type='button' class='btn btn-dark p-0' onclick='sortItemsByNameAscendant()'>(↓)</button><button type='button' class='btn btn-dark p-0' onclick='sortItemsByNameDescendent()'>(↑)</button></th>" +
    "<th scope='col' class='text-center'>Amount<button type='button' class='btn btn-dark p-0' onclick='sortItemsByAmountAscendant()'>(↓)</button><button type='button' class='btn btn-dark p-0' onclick='sortItemsByAmountDescendent()'>(↑)</button></th>" + 
    "<th scope='col' class='text-center'>Date<button type='button' class='btn btn-dark p-0' onclick='sortItemsByDateAscendant()'>(↓)</button><button type='button' class='btn btn-dark p-0' onclick='sortItemsByDateDescendent()'>(↑)</button></th>" +
    "<th scope='col' class='text-center'></th></tr></thead><tbody>";
    for (let i = 1; i <= itemList.length; i++) {
        list += "<tr class='table-light text-center'><th scope='row' class='border-end border-dark' id='id" + i + "'></th><td id='name" + i + "' class='border border-dark'>Name</td><td id='amount" + i + "'class='border border-dark'>Amount</td><td id='date" + i + "'class='border border-dark'>Date</td>" +
        "<td class='border-bottom border-dark text-center'><button class='btn btn-outline-danger' type='button' onclick='removeExpense(" + itemList[i-1].id + ")'>Delete</button></td></tr>";
    }
    document.getElementById("list").innerHTML = list + "</tbody><tfoot><tr class='table-secondary fs-4'><td class='fw-bold text-center'>Total</td><td class='fw-bold text-center' colspan='4'>" + "$" + totalAmount() + "</td></tr></tfoot></table></div>";
    for (let i = 1; i <= itemList.length; i++) {
        document.getElementById("id"+i).textContent = itemList[i-1].id;
        document.getElementById("name"+i).textContent = itemList[i-1].name;
        document.getElementById("amount"+i).textContent = "$" + itemList[i-1].amount;
        let date = itemList[i-1].date.split("-");
        document.getElementById("date"+i).textContent = date[2] + "/" + date[1] + "/" + date[0];
    }
    refreshCounter();
}

function refreshCounter(){
    if(itemList.length === 0){
        document.getElementById("counter").textContent = "";
    } else {
        document.getElementById("counter").textContent = "You have " + itemList.length + " expense(s) in your list!";
    }
}

function addExpense(){
    const expenseName = document.getElementById("inputAddName").value;
    const expenseAmount = document.getElementById("inputAddAmount").value;
    const expenseDate = document.getElementById("inputAddDate").value;

    if(expenseName !== "" && expenseAmount !== "" && expenseDate !== ""){
        document.getElementById("inputAddName").value = "";
        document.getElementById("inputAddAmount").value = "";
        document.getElementById("inputAddDate").value = "";
        itemList.push({id: (itemList.length + 1), name: expenseName, amount: parseInt(expenseAmount), date: expenseDate});
        localStorage.itemList = JSON.stringify(itemList);
        document.getElementById("alert").classList.add("d-none");
        refreshList();
    } else {
        document.getElementById("alert").classList.remove("d-none");
    }
}

function removeExpense(id){
    let index;
    for (let i = 0; i < itemList.length; i++) {
        if (id == itemList[i].id){
            index = i;
        }
    }
    itemList.splice(index, 1);
    itemList.forEach(item => {
        if (item.id > id){
           item.id--; 
        } 
    });
    localStorage.itemList = JSON.stringify(itemList);
    refreshList();
    isEmptyList();
}

function totalAmount(){
    let totalAmount = 0;
    itemList.forEach(item => {
        totalAmount += item.amount;
    });
    return totalAmount;
}

function sortItemsByIdAscendant(){
    itemList.sort(function(a, b) {
        return a.id - b.id;
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByIdDescendent(){
    itemList.sort(function(a, b) {
        return b.id - a.id;
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByNameAscendant(){
    itemList.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name);
    })
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByNameDescendent(){
    itemList.sort(function (a, b) {
        return ('' + b.name).localeCompare(a.name);
    })
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByAmountAscendant(){
    itemList.sort(function(a, b) {
        return a.amount - b.amount;
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByAmountDescendent(){
    itemList.sort(function(a, b) {
        return b.amount - a.amount;
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByDateAscendant(){
    itemList.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}

function sortItemsByDateDescendent(){
    itemList.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    refreshList();
    localStorage.itemList = JSON.stringify(itemList);
}
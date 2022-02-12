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
    let list = "<div class='table-responsive'><table class='table'><thead><tr class='table-dark'><th scope='col'></th><th scope='col'>Name</th><th scope='col'>Amount</th><th scope='col'>Date</th><th scope='col'></th></tr></thead><tbody>";
    for (let i = 0; i < itemList.length; i++) {
        list += "<tr class='table-light'><th scope='row' class='border-end border-dark'>" + (i+1) + "</th><td id='name" + i + "' class='border border-dark'>Name</td><td id='amount" + i + "'class='border border-dark'>Amount</td><td id='date" + i + "'class='border border-dark'>Date</td>" +
        "<td class='border-bottom border-dark'><button class='btn btn-outline-danger' type='button' onclick='removeExpense(" + i + ")'>Delete</button></td></tr>";
    }
    document.getElementById("list").innerHTML = list + "</tbody><tfoot><tr class='table-secondary fs-4'><td></td><td colspan='3'>Total</td><td>" + totalAmount() + "</td></tr></tfoot></table></div>";
    for (let i = 0; i < itemList.length; i++) {
        document.getElementById("name"+i).textContent = itemList[i].name;
        document.getElementById("amount"+i).textContent = itemList[i].amount;
        document.getElementById("date"+i).textContent = itemList[i].date;
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
        itemList.push({name: expenseName, amount: parseInt(expenseAmount), date: expenseDate});
        localStorage.itemList = JSON.stringify(itemList);
        document.getElementById("alert").classList.add("d-none");
        refreshList();
    } else {
        document.getElementById("alert").classList.remove("d-none");
    }
}

function removeExpense(index){
    itemList.splice(index, 1);
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
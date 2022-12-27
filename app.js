const topCard = document.getElementsByClassName("top")[0]

const currencyPlaceholder = document.getElementById("symbol")
const currentBalancePlaceholder = document.getElementById("balance")
const ToatlIncome = document.getElementById("total_income");
const TotalExpense = document.getElementById("total_expense");

const nameHolder = document.getElementById("title");
const incomeRadio = document.getElementById("income");
const expenseRadio = document.getElementById("expense");
const amountHolder = document.getElementById("amount");

const addTransactionButton =  document.getElementById("add_transaction");
const transactionList = document.getElementById("list_of_transactions")

let currencySymbol = "Rs.";
let transactions = [];
let balance = 0
let  total_income=0;
let  total_expense=0;
let editing_id = -1;

currencySymbol = window.localStorage.getItem("currencySymbol") || window.alert("Hello Safina Welcome To My Money Expense Manager")

balance = Number(window.localStorage.getItem("balance")) || 0;
total_income = Number(window.localStorage.getItem("total_income")) || 0;
total_expense = Number(window.localStorage.getItem("total_expense")) || 0;
transactions = JSON.parse(window.localStorage.getItem("transactions")) || [];

const saveStatus = () => {
    window.localStorage.setItem("currencySymbol", currencySymbol);
    window.localStorage.setItem("balance", balance);
    window.localStorage.setItem("total_income", total_income);
    window.localStorage.setItem("total_expense", total_expense);
    window.localStorage.setItem("transactions", JSON.stringify(transactions));
} 


function del(i) {
    transactions = transactions.filter((e,index) => i!=index);
    render();
}


const render = () => {
    transactionList.innerHTML = ``
    balance = 0;
    total_income=0;
    total_expense=0
    currencySymbol='Rs. ';

    if(transactions.length == 0){
        transactionList.innerHTML = `<h3 style="color:red">No History Found</h3>`
    } 

    transactions.forEach((e,i) => {
        transactionList.innerHTML = `
        <tbody>
        <tr class=" ${e.type}">
            <th>${e.name}</th>
                <th>₹${e.amount}</th>
                <th>
                <button class="link" style="background-color:green;align-item:center;color:white;width:50%;height:30px">
                ${e.type }
            </button></th>
                <th><button class="link" onclick="del(${i})" style="background-color:red;color:white;width:50%;height:30px">
                    Delete
                </button></th>
            </div>
        </tr>
        </tbody>
        ` + transactionList.innerHTML;

        if(e.type == "income") {
            balance += e.amount;
            total_income +=e.amount;
        }
        else {
            balance -= e.amount;
            total_expense +=e.amount;
        }
    })

    currencyPlaceholder.innerHTML = `${currencySymbol}`

    currentBalancePlaceholder.innerHTML = `${balance}`

    ToatlIncome.innerHTML = `${total_income}`
    TotalExpense.innerHTML = `${total_expense}`

    if(balance < 0){
        topCard.classList.add("red")
    } else{
        topCard.classList.remove("red")
    }
}


render();
saveStatus();

addTransactionButton.addEventListener("click", () => {
    let name = nameHolder.value;
    let type = incomeRadio.checked ? "income" : "expense"
    let amount = Number(amountHolder.value)

    if(name == "" || amount == 0){
        alert("Name and amount can't be empty");
        return;
    }

    if(amount < 0){
        alert("Negetive amounts are not allowed");
        return;
    }

    let transaction = {
        name,
        amount, 
        type,
    }
    if(editing_id == -1) transactions.push(transaction);
    else{
        transactions[editing_id] = transaction;
        editing_id = -1;
        cancelEditButton.style.display = "none"
    }
    nameHolder.value = "";
    amountHolder.value = "";
    render();
    saveStatus();
})
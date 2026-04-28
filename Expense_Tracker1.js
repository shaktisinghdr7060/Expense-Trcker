// Selecting elements from the DOM
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const categoryInput = document.getElementById("categories");
const dataInput = document.getElementById("text")
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const form = document.getElementById("form");
const historyButton = document.getElementById("history-button");
const homeButton = document.getElementById("home-button");
const customerSupportButton = document.getElementById("customer-support-button");
const logoutButton = document.getElementById("logout-button");
const historySection = document.getElementById("history-section");
const historyTitle = document.getElementById("history-title");

// Initialize transactions as an empty array
let transactions = [];

// Function to display transactions in the history
function displayTransactions() {
  list.innerHTML = ""; // Clear the list first

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
    listItem.innerHTML = `
      ${transaction.text} <span>Rs. ${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">x</button>
    `;

    list.appendChild(listItem);
  });
}

// Function to display transactions in the history section
function displayHistory() {
  historySection.innerHTML = ""; // Clear the history section first

  transactions.forEach((transaction, index) => {
    const historyItem = document.createElement("li");
    historyItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
    historyItem.innerHTML = `
      ${transaction.text} <span>Rs. ${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">x</button>
    `;

    historySection.appendChild(historyItem);
  });
}

// Function to update the balance, income, and expense
function updateBalance() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.textContent = `Rs. ${total}`;
  moneyPlus.textContent = `Rs. ${income}`;
  moneyMinus.textContent = `Rs. ${expense}`;
}

// Function to add a new transaction
function addTransaction(e) {
  e.preventDefault();

  const text = categoryInput.value.trim(); // Changed variable name to match the input
  const amount = +amountInput.value.trim(); // Convert to a number

  if (text === "" || isNaN(amount)) {
    alert("Please provide both a description and a valid amount.");
    return;
  }

  const transaction = {
    id: generateID(),
    text,
    amount,
  };

  transactions.push(transaction);

  displayTransactions();
  updateBalance();

  // Clear input fields
  categoryInput.value = ""; // Changed variable name to match the input
  amountInput.value = "";
}

// Function to delete a transaction by ID
function deleteTransaction(index) {
  transactions = transactions.filter((transaction, i) => i !== index);
  displayTransactions();
  updateBalance();
}

// Function to generate a random ID for each transaction
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Event listeners
form.addEventListener("submit", addTransaction);
historyButton.addEventListener("click", () => {
  historySection.style.display = (historySection.style.display === 'block') ? 'none' : 'block';
  historyTitle.style.display = (historyTitle.style.display === 'block') ? 'none' : 'block';

  // Display transactions in the history section when it becomes visible
  if (historySection.style.display === 'block') {
    displayHistory();
  }
});

homeButton.addEventListener("click", () => {
  // Implement the logic to go to the home page here
});

customerSupportButton.addEventListener("click", () => {
  // Implement the logic to access customer support here
});

logoutButton.addEventListener("click", () => {
  // Implement the logic to log the user out here
});

// Initial display
displayTransactions();
updateBalance();

// ==========================================
// 1. THEME INITIALIZATION (File ke bilkul top par)
// ==========================================
const savedTheme = localStorage.getItem("app_theme") || "light";
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.remove("dark-theme");
}

const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main-content");

if (window.location.href.includes("login")) {
  container.innerHTML = `<h2>Welcome Back</h2>
             <p>Login to FinTrack Pro</p>
             <form class="loginForm" onsubmit = "handleLogin(event)">
                 <label for="username">Username</label>
                 <input type="email" id="username" required>
                 <label for="password">Password</label>
                 <input type="password" id="password" required minlength=8>
                 <button type="submit" class="loginBtn">Login</button>
             </form>
             <p class="footerText">Don't have an account? <a href="/register" class="registerLink">Register here</a></p>`;
} else if (window.location.href.includes("register")) {
  container.innerHTML = `<h2>Create Account</h2>
            <p>Join FinTrack Pro</p>
            <form class="loginForm" onsubmit = "handleRegister(event)">
                <label for="reg_username">Choose a Username</label>
                <input type="email" id="reg_username" required>
                <label for="reg_password">Password</label>
                <input type="password" id="reg_password" required minlength=8>
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" required minlength=8>
                <button type="submit" class="registerBtn">Register</button>
            </form>
            <p class="footerText">Already have an Account? <a href="/login" class="loginLink">Login here</a></p>`;
}

let userData = []; //for checking if user logged in...
let transactionData = []; //for transactions...
let updateIndex = null; //to update the transactions

//registration function**************//
const handleRegister = (event) => {
  event.preventDefault();

  if (reg_password.value !== confirmPassword.value) {
    alert("Please enter the same password...");
    reg_username.value = "";
    reg_password.value = "";
    confirmPassword.value = "";
  } else {
    let obj = {
      username: reg_username.value,
      password: reg_password.value,
      currency: "₹",
    };

    const oldUser = JSON.parse(localStorage.getItem("registerUser")) || [];
    const userExists = oldUser.find(
      (item) => item.username === reg_username.value,
    );

    if (userExists) {
      alert("User already Exist!!!");
      reg_username.value = "";
      reg_password.value = "";
      confirmPassword.value = "";
    } else {
      oldUser.push(obj);
      localStorage.setItem("registerUser", JSON.stringify(oldUser));
      reg_username.value = "";
      reg_password.value = "";
      confirmPassword.value = "";
      window.location.href = "../login/";
    }
  }
};

//*************login function********************* */
const handleLogin = (event) => {
  event.preventDefault();
  let registerUser = JSON.parse(localStorage.getItem("registerUser")) || [];
  let matchUser = registerUser.find((item) => username.value === item.username);

  if (!matchUser) {
    alert("User not register... Please register the user");
    username.value = "";
    password.value = "";
    window.location.href = "../register/";
    return; // Safety break
  }

  if (password.value === matchUser.password) {
    let obj = {
      username: username.value,
      currency: "₹",
    };
    userData.push(obj);
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "../index.html";
    username.value = "";
    password.value = "";
  } else {
    alert("Username or Password does not match...");
    username.value = "";
    password.value = "";
  }
  let nameUser = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem(
    `transaction_${nameUser[0].username}`,
    JSON.stringify(transactionData),
  );
};

//******preventing user to go directly on home page************ */
let verify = JSON.parse(localStorage.getItem("user"));

if (
  !verify &&
  !window.location.href.includes("login") &&
  !window.location.href.includes("register")
) {
  window.location.href = "../login/";
}

//*********************************login & register logic*******************************************//
sidebar.innerHTML = `<div class="logo">
                <div class="company">
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <div class="company_name">
                    <h2>FinTrack Pro</h2>
                    <p>Enterprise Finance</p>
                </div>
            </div>
            <nav class="nav-menu">
                <a href="#" id="dashboard"><i class="fa-solid fa-border-all"></i> <span>Dashboard</span></a>
                <a href="#" id="setting"><i class="fa-solid fa-gear"></i> <span>Setting</span></a>
            </nav>
            <button class="addBtn"><i class="fa-solid fa-plus"></i> <span>Add Transaction</span></button>
            <div class="add-transaction">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Add Transaction</h3>
                        <span class="close-modal">X</span>
                    </div>
                    <form class="transactions">
                        <div class="income-expense">
                            <label for="income_type">Type</label>
                            <select id="income_type">
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                        </div>
                        <div class="description-type">
                            <label for="description">Description</label>
                            <input type="text" id="description" placeholder="e.g. Amazon, Salary, Coffee">
                        </div>
                        <div class="amount-date">
                            <div class="money">
                                <label for="amount">Amount</label>
                                <input type="number" id="amount" min="0">
                            </div>
                            <div class="time">
                                <label for="date">Date</label>
                                <input type="date" id="date">
                            </div>
                        </div>
                        <div class="category-options">
                            <label for="category">Category</label>
                            <select id="category">
                                <option value="select">Select a category</option>
                                <option value="Food & Dinning">Food & Dinning</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Recharge & Bills">Recharge & Bills</option>
                                <option value="Petrol & Auto">Petrol & Auto</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Salary">Salary</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <input type="submit" class="transactionBtn" value="Save Transaction">
                    </form>
                </div>
            </div>`;

const addTransaction = document.querySelector(".addBtn");
const modal = document.querySelector(".add-transaction");
const modalClose = document.querySelector(".close-modal");
const form = document.querySelector(".transactions");

addTransaction.addEventListener("click", () => {
  modal.style.display = "flex";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    description.value.trim() === "" ||
    amount.value.trim() === "" ||
    date.value.trim() === "" ||
    category.value.trim() === ""
  ) {
    alert("Please fill all the fields...");
    return;
  }

  let transactionObj = {
    id: Date.now(),
    type: income_type.value,
    description: description.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
  };
  const userName = JSON.parse(localStorage.getItem("user"));
  const keyName = `transaction_${userName[0].username}`;
  const transactionHistory = JSON.parse(localStorage.getItem(keyName)) || [];

  if (updateIndex !== null) {
    transactionHistory[updateIndex] = transactionObj;
    updateIndex = null;
  } else {
    transactionHistory.push(transactionObj);
  }

  localStorage.setItem(keyName, JSON.stringify(transactionHistory));
  getTransaction();
  form.reset();
  modal.style.display = "none";
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

const navMenu = document.querySelector(".nav-menu");
const dashboard = document.querySelector("#dashboard");
const setting = document.querySelector("#setting");

const showDetail = () => {
  dashboard.classList.add("active-tab");
  setting.classList.remove("active-tab");
  main.innerHTML = `<header class="topbar">
                <div class="user">
                    <span class="profile"></span>
                </div>
                <button class="logoutBtn" onclick=logout()><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
            </header>
            <div class="display-area">
                <div class="display_heading">
                    <h1>Financial Overview</h1>
                    <p>Real-time tracking application</p>
                </div>
                <div class="card">
                    <div class="current">
                        <i class="fa-solid fa-building-columns"></i>
                        <div class="current_amount">
                            <p>Current Balance</p>
                            <h3 class="curr_balance"></h3>
                        </div>
                    </div>
                    <div class="total">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        <div class="total_balance">
                            <p>Total Income</p>
                            <h3 class="totalIncome"></h3>
                        </div>
                    </div>
                    <div class="expense">
                        <i class="fa-solid fa-arrow-trend-down"></i>
                        <div class="total_expense">
                            <p>Total Expense</p>
                            <h3 class="totalExpense"></h3>
                        </div>
                    </div>
                    <div class="length">
                        <i class="fa-solid fa-piggy-bank"></i>
                        <div class="total_transactions">
                            <p>Total Transaction</p>
                            <h3 class="transactionCount"></h3>
                        </div>
                    </div>
                </div>
                <div class="insider">
                    <div class="cash_theme">
                        <div class="cash_flow">
                          <h2>Cash Flow Analysis</h2>
                            <div class="chart-container">
                              <canvas id="myChart"></canvas>
                            </div>
                        </div>
                        <div class="all_transactions">
                            <h3>All Transactions</h3>
                            <div class="search_filter">
                                <div class="serach">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <input type="text" id="searchItem" placeholder="Search transactions...">
                                </div>
                                <div class="filters">
                                    <select id="filterList">
                                        <option value="All">All Types</option>
                                        <option value="Income">Income Only</option>
                                        <option value="Expense">Expense Only</option>
                                    </select>
                                </div>
                            </div>
                            <div class= "table-responsive">
                              <table class="table_data">
                                <thead>
                                    <tr class="table_heading">
                                        <th>DATE</th>
                                        <th>DESCRIPTION</th>
                                        <th>CATEGORY</th>
                                        <th>AMOUNT</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody class="table-body"></tbody>
                              </table>
                            </div>
                        </div>
                    </div>
                </div>
    </div>`;
};

if (verify) {
  showDetail();
}

navMenu.addEventListener("click", (event) => {
  event.preventDefault();
  const link = event.target.closest("a");

  if (!link) return;

  if (link.id === "dashboard") {
    showDetail();
    getTransaction();
    chartData();
  } else if (link.id === "setting") {
    setting.classList.add("active-tab");
    dashboard.classList.remove("active-tab");

    const currentUserData = JSON.parse(localStorage.getItem("user")) || [];
    const currentUsername =
      currentUserData.length > 0 ? currentUserData[0].username : "";
    const currentCurrency =
      currentUserData.length > 0 ? currentUserData[0].currency : "₹";
    const currentLocalTheme = localStorage.getItem("app_theme") || "light";

    main.innerHTML = `<header class="topbar">
                <div class="user">
                    <span class="profile"></span>
                </div>
                <button class="logoutBtn" onclick=logout()><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
            </header>
            <div class= "setting-container">
            <div class="setting-main">
                <span>Settings</span>
                <p>Manage your account profile and app formatting.</p>
            </div>
            <form class="setting-form" onsubmit ="handleProfileAndThemeUpdate(event)">
                <div class="form-data">
                    <h3>Profile Details</h3>
                    <div class = "setting-fields">
                      <div class="profileName">
                        <label for="profile">Full Name</label>
                        <input type="text" id="profile" value=${currentUsername}>
                      </div>
                      <div class="current-currency">
                          <label for="currency">Primary Currency</label>
                          <select id="currency">
                              <option value="₹" ${currentCurrency === "₹" ? "selected" : ""}>INR (₹)</option>
                              <option value="$" ${currentCurrency === "$" ? "selected" : ""}>USD ($)</option>
                              <option value="€" ${currentCurrency === "€" ? "selected" : ""}>EUR (€)</option>
                              <option value="£" ${currentCurrency === "£" ? "selected" : ""}>GBP (£)</option>
                              <option value="¥" ${currentCurrency === "¥" ? "selected" : ""}>JPY (¥)</option>
                          </select>
                      </div>
                      <div class="current-theme">
                          <label for="themeSelect">App Theme</label>
                          <select id="themeSelect">
                              <option value="light" ${currentLocalTheme === "light" ? "selected" : ""}>Light Mode</option>
                              <option value="dark" ${currentLocalTheme === "dark" ? "selected" : ""}>Dark Mode</option>
                          </select>
                      </div>
                    </div>
                </div>
                <button type="submit">Save Changes</button>
                <button class="reset" onclick="handleReset(event)">Reset All Data</button>
            </form>
            </div>`;
  }
});


function handleProfileAndThemeUpdate(event) {
  event.preventDefault();

  const newUserName = document.querySelector("#profile").value.trim();
  const newCurrency = document.querySelector("#currency").value;
  const selectedTheme = document.querySelector("#themeSelect").value;

  if (!newUserName) {
    alert("User Name can not be empty!");
    return;
  }

  let currentLocalUser = JSON.parse(localStorage.getItem("user")) || [];

  if (currentLocalUser.length > 0) {
    const oldUserName = currentLocalUser[0].username;

    if (oldUserName !== newUserName) {
      const oldKey = `transaction_${oldUserName}`;
      const newKey = `transaction_${newUserName}`;

      const savedTransaction = localStorage.getItem(oldKey);

      if (savedTransaction !== null) {
        localStorage.setItem(newKey, savedTransaction);
        localStorage.removeItem(oldKey);
      }

      let allRegisteredUsers =
        JSON.parse(localStorage.getItem("registerUser")) || [];
      let regUserIndex = allRegisteredUsers.findIndex(
        (item) => item.username === oldUserName,
      );
      if (regUserIndex !== -1) {
        allRegisteredUsers[regUserIndex].username = newUserName;
        allRegisteredUsers[regUserIndex].currency = newCurrency;
        localStorage.setItem(
          "registerUser",
          JSON.stringify(allRegisteredUsers),
        );
      }
    }
    currentLocalUser[0].username = newUserName;
    currentLocalUser[0].currency = newCurrency;
    localStorage.setItem("user", JSON.stringify(currentLocalUser));

    localStorage.setItem("app_theme", selectedTheme);
    localStorage.setItem("app_theme", selectedTheme);

    if (selectedTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  const profileElement= document.querySelector(".profile");
  if(profileElement) profileElement.innerHTML = newUserName;

  if(typeof userProfile !== "undefined" && userProfile.length > 0 ){
    userProfile[0].username = newUserName;
    userProfile[0].currency = newCurrency;
  }

    alert("User Name/Currency and theme updated successfully!!")
  }
}

function handleReset(e){
  e.preventDefault()
  alert("WARNING: This will delete all your transaction data permanently!")
  const userInfo = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem(`transaction_${userInfo[0].username}`, JSON.stringify([]))
}

const profileElement = document.querySelector(".profile");
const userProfile = JSON.parse(localStorage.getItem("user")) || [];

if (userProfile.length > 0 && profileElement) {
  profileElement.innerHTML = `${userProfile[0].username}`;
}

let myChartInstance = null;

function chartData() {
  const chart = document.querySelector("#myChart");
  if (!chart) return;

  if (myChartInstance !== null) myChartInstance.destroy();

  const chartTransacion =
    JSON.parse(
      localStorage.getItem(`transaction_${userProfile[0].username}`),
    ) || [];

  const totalIncomeInChart = chartTransacion.reduce((acc, curr) => {
    return curr.type === "Income" ? acc + Number(curr.amount) : acc;
  }, 0);

  const totalExpenseInChart = chartTransacion.reduce((acc, curr) => {
    return curr.type === "Expense" ? acc + Number(curr.amount) : acc;
  }, 0);

  myChartInstance = new Chart(chart, {
    type: "bar",
    data: {
      labels: ["Income vs Expense"],
      datasets: [
        {
          label: "Income",
          data: [totalIncomeInChart],
          backgroundColor: "#166534",
          borderRadius: 5,
        },
        {
          label: "Expense",
          data: [totalExpenseInChart],
          backgroundColor: "#991b1b",
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
  });
}

function getTransaction() {
  const currentBalance = document.querySelector(".curr_balance");
  const totalIncome = document.querySelector(".totalIncome");
  const totalExpense = document.querySelector(".totalExpense");
  const count = document.querySelector(".transactionCount");
  const table = document.querySelector(".table-body");

  if (!table) return;

  const transactionDetail =
    JSON.parse(
      localStorage.getItem(`transaction_${userProfile[0].username}`),
    ) || [];

  const sumOfTotalBalance = transactionDetail.reduce((acc, curr) => {
    return curr.type === "Income"
      ? (acc += Number(curr.amount))
      : (acc -= Number(curr.amount));
  }, 0);

  const sumOfTotalIncome = transactionDetail.reduce((acc, curr) => {
    return curr.type === "Income" ? (acc += Number(curr.amount)) : acc;
  }, 0);

  const sumOfTotalExpense = transactionDetail.reduce((acc, curr) => {
    return curr.type === "Expense" ? (acc += Number(curr.amount)) : acc;
  }, 0);

  chartData();

  table.innerHTML = transactionDetail
    .map((item) => {
      let statusColor = item.type === "Income" ? "#166534" : "#991b1b";
      return `
      <tr class="body-row" id=${item.id}>
      <td>${item.date}</td>
      <td>${item.description}</td>
      <td><span style="background:#f8f9fb; padding:5px; border-radius:6px; color:#333">${item.category}</span></td>
      <td style="color: ${statusColor}"><span style="font-size: 16px; font-weight:550">${item.type === "Income" ? "+" : "-"} ${userProfile[0].currency + item.amount}.00</span></td>
      <td><div>
        <button onclick="handleUpdate(${item.id})" style="background:transparent; border:none; color: #1e40af; cursor:pointer"><i class="fa-solid fa-pen"></i></button>
        <button onclick="handleDelete(${item.id})" style="background:transparent; border:none; cursor:pointer; color: #991b1b"><i class="fa-solid fa-trash"></i></button>
        </div></td>
      </tr>`;
    })
    .join("");

  if (currentBalance)
    currentBalance.innerHTML = `${userProfile[0].currency} ${sumOfTotalBalance}.00`;
  if (totalIncome)
    totalIncome.innerHTML = `${userProfile[0].currency} ${sumOfTotalIncome}.00`;
  if (totalExpense)
    totalExpense.innerHTML = `${userProfile[0].currency} ${sumOfTotalExpense}.00`;
  if (count) count.innerHTML = `${transactionDetail.length}`;
}

const handleDelete = (id) => {
  let userName = JSON.parse(localStorage.getItem("user"));
  let newList =
    JSON.parse(localStorage.getItem(`transaction_${userName[0].username}`)) ||
    [];
  newList = newList.filter((item) => item.id !== id);
  localStorage.setItem(
    `transaction_${userName[0].username}`,
    JSON.stringify(newList),
  );
  getTransaction();
};

function handleUpdate(id) {
  modal.style.display = "flex";
  let userName = JSON.parse(localStorage.getItem("user"));
  let transactions = JSON.parse(
    localStorage.getItem(`transaction_${userName[0].username}`),
  );
  let findTransaction = transactions.find((item) => item.id === id);
  updateIndex = transactions.findIndex((item) => item.id === id);

  form[0].value = findTransaction.type;
  form[1].value = findTransaction.description;
  form[2].value = findTransaction.amount;
  form[3].value = findTransaction.date;
  form[4].value = findTransaction.category;
}

if (verify) {
  getTransaction();
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../login/";
}

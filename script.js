// HTML結構需要的元素
// 1. input: transactionDate, transactionType (收入/支出), amount
// 2. table: transactionTable
// 3. span: totalBalance

function updateTable() {
    // 獲取輸入值
    const date = document.getElementById('transactionDate').value.trim();
    const type = document.getElementById('transactionType').value.trim();
    const amountInput = document.getElementById('amount').value.trim();

    const amount = parseFloat(amountInput);

    // 驗證輸入值
    if (!date) {
        alert('請輸入日期！');
        return;
    }

    if (type !== '收入' && type !== '支出') {
        alert('請選擇交易類型（收入或支出）！');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('請輸入正確的金額！');
        return;
    }

    const adjustedAmount = type === '支出' ? -amount : amount;

    // 更新表格
    const transactionTable = document.getElementById('transactionTable');
    const row = transactionTable.insertRow(-1); // 新增到最後一行

    const cellDate = row.insertCell(0);
    const cellType = row.insertCell(1);
    const cellAmount = row.insertCell(2);

    cellDate.textContent = date;
    cellType.textContent = type;
    cellAmount.textContent = adjustedAmount.toFixed(2);

    // 根據金額調整顏色
    cellAmount.style.color = adjustedAmount < 0 ? 'green' : 'red';

    // 更新總餘額
    updateTotalBalance(adjustedAmount);
}

function updateTotalBalance(amount) {
    const totalBalanceElement = document.getElementById('totalBalance');
    const currentBalance = parseFloat(totalBalanceElement.textContent) || 0;
    const newBalance = currentBalance + amount;

    totalBalanceElement.textContent = newBalance.toFixed(2);

    // 調整餘額顏色
    totalBalanceElement.style.color = newBalance < 0 ? 'green' : 'red';
}

// 清除所有記錄功能
function clearTransactions() {
    const transactionTable = document.getElementById('transactionTable');

    // 保留表頭，移除其他行
    while (transactionTable.rows.length > 1) {
        transactionTable.deleteRow(1);
    }

    // 重置總餘額
    const totalBalanceElement = document.getElementById('totalBalance');
    totalBalanceElement.textContent = '0.00';
    totalBalanceElement.style.color = 'black';
}

// 假設以下是綁定在按鈕上的事件處理
// document.getElementById('addTransactionBtn').addEventListener('click', updateTable);
// document.getElementById('clearTransactionsBtn').addEventListener('click', clearTransactions);

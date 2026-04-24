let minimaskConnected = false;

function connectMiniMask() {
  const status = document.getElementById("connectStatus");

  if (typeof window.MINIMASK !== "undefined") {
    minimaskConnected = true;
    status.innerText = "MiniMask detected and ready";
    status.style.color = "#22c55e";
  } else {
    minimaskConnected = false;
    status.innerText = "MiniMask extension not detected. Please install and enable MiniMask.";
    status.style.color = "#ef4444";
  }
}

async function getAddress() {
  const addressBox = document.getElementById("address");

  try {
    if (typeof window.MINIMASK === "undefined") {
      addressBox.innerText = "MiniMask not detected";
      return;
    }

    const result = await window.MINIMASK.account();
    addressBox.innerText = result.address || JSON.stringify(result);
  } catch (error) {
    addressBox.innerText = "Error loading address";
    console.error(error);
  }
}

async function getBalance() {
  const balanceBox = document.getElementById("balance");

  try {
    if (typeof window.MINIMASK === "undefined") {
      balanceBox.innerText = "MiniMask not detected";
      return;
    }

    const result = await window.MINIMASK.balance();
    balanceBox.innerText = result.balance || JSON.stringify(result);
  } catch (error) {
    balanceBox.innerText = "Error loading balance";
    console.error(error);
  }
}

async function sendTransaction() {
  const receiver = document.getElementById("receiver").value;
  const amount = document.getElementById("amount").value;
  const txStatus = document.getElementById("txStatus");

  if (!receiver || !amount) {
    txStatus.innerText = "Please enter receiver address and amount";
    txStatus.style.color = "#ef4444";
    return;
  }

  try {
    if (typeof window.MINIMASK === "undefined") {
      txStatus.innerText = "MiniMask not detected";
      txStatus.style.color = "#ef4444";
      return;
    }

    const result = await window.MINIMASK.send({
      address: receiver,
      amount: amount
    });

    txStatus.innerText = "Transaction request sent successfully";
    txStatus.style.color = "#22c55e";
    console.log(result);
  } catch (error) {
    txStatus.innerText = "Transaction failed or rejected";
    txStatus.style.color = "#ef4444";
    console.error(error);
  }
}

function postMessage() {
  const input = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  if (!input.value.trim()) return;

  const div = document.createElement("div");
  div.className = "message";
  div.innerText = input.value;

  messages.prepend(div);
  input.value = "";
}

window.onload = connectMiniMask;

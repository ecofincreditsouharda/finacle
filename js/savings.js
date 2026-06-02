let currentMemberName = "";

async function fetchMemberName() {
  const memberNumber = document.getElementById("memberNumber").value.trim();
  const nameDisplay = document.getElementById("memberNameDisplay");

  if (!memberNumber) {
    nameDisplay.innerHTML = "";
    currentMemberName = "";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}?action=getMemberName&memberNumber=${encodeURIComponent(memberNumber)}`);
    const result = await response.json();

    if (result.status === "success") {
      currentMemberName = result.memberName;
      nameDisplay.innerHTML = `✅ <strong>${result.memberName}</strong>`;
    } else {
      nameDisplay.innerHTML = `<span style="color:red">Member not found</span>`;
      currentMemberName = "";
    }
  } catch (err) {
    nameDisplay.innerHTML = `<span style="color:red">Error loading name</span>`;
  }
}

async function depositSavings() {
  const memberNumber = document.getElementById("memberNumber").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const paymentMode = document.getElementById("paymentMode").value;
  const remarks = document.getElementById("remarks").value.trim();

  if (!memberNumber || !currentMemberName) {
    alert("Please enter valid Member Number");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Please enter valid amount");
    return;
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "depositSavings",
        data: { memberNumber, amount, paymentMode, remarks }
      })
    });

    const result = await response.json();
    if (result.status === "success") {
      document.getElementById("result").style.display = "block";
      document.getElementById("result").innerHTML = `
        <strong>${result.message}</strong><br><br>
        Member: <b>${currentMemberName}</b><br>
        New Balance: <b>₹${result.balance.toLocaleString('en-IN')}</b><br>
        Transaction ID: <b>${result.transactionID}</b>
      `;
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert("Server error. Please try again.");
  }
}

// savings.js

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
    const response = await fetch(API_BASE_URL + "?action=getMemberName&memberNumber=" + encodeURIComponent(memberNumber));
    const result = await response.json();

    if (result.status === "success") {
      currentMemberName = result.memberName;
      nameDisplay.innerHTML = `Member Name: <span style="color:#28a745">${result.memberName}</span>`;
    } else {
      nameDisplay.innerHTML = `<span style="color:red">Member not found</span>`;
      currentMemberName = "";
    }
  } catch (err) {
    console.error(err);
    nameDisplay.innerHTML = `<span style="color:red">Error fetching member</span>`;
  }
}

async function depositSavings() {
  const memberNumber = document.getElementById("memberNumber").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const paymentMode = document.getElementById("paymentMode").value;
  const remarks = document.getElementById("remarks").value.trim();

  if (!memberNumber) {
    alert("Please enter Member Number");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Please enter a valid deposit amount");
    return;
  }
  if (!currentMemberName) {
    alert("Please enter a valid Member Number first");
    return;
  }

  const btn = document.querySelector("button");
  const originalBtnText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Processing...";

  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "depositSavings",
        data: {
          memberNumber: memberNumber,
          amount: amount,
          paymentMode: paymentMode,
          remarks: remarks
        }
      })
    });

    const result = await response.json();

    if (result.status === "success") {
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <strong>${result.message}</strong><br><br>
        <b>Member:</b> ${currentMemberName}<br>
        <b>New Balance:</b> ₹${result.balance.toLocaleString('en-IN')}<br>
        <b>Transaction ID:</b> ${result.transactionID}
      `;

      // Clear form
      document.getElementById("amount").value = "";
      document.getElementById("remarks").value = "";
      alert(result.message);
    } else {
      alert(result.message || "Deposit Failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  } finally {
    btn.disabled = false;
    btn.textContent = originalBtnText;
  }
}

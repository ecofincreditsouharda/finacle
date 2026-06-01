// savings.js
async function depositSavings() {
  const memberNumber = document.getElementById("memberNumber").value.trim();
  const amountInput = document.getElementById("amount").value;
  const paymentMode = document.getElementById("paymentMode").value;
  const remarks = document.getElementById("remarks").value.trim();

  const amount = parseFloat(amountInput);

  // Validation
  if (!memberNumber) {
    alert("Please enter Member Number");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Please enter a valid deposit amount");
    return;
  }

  // Loading state
  const btn = document.querySelector("button");
  const originalBtnText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Processing...";

  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
      let message = result.message || "Deposit Successful";
      
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <strong>${message}</strong><br><br>
        <b>New Balance:</b> ₹${result.balance.toLocaleString('en-IN')}<br>
        <b>Transaction ID:</b> ${result.transactionID}
      `;

      // Clear form fields
      document.getElementById("amount").value = "";
      document.getElementById("remarks").value = "";
      
      alert(message);
    } else {
      alert(result.message || "Operation Failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server connection error. Please try again.");
  } finally {
    btn.disabled = false;
    btn.textContent = originalBtnText;
  }
}

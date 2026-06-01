// =====================================
// GLOBAL VARIABLES
// =====================================
let isUpdateMode = false;

// =====================================
// LOAD NEXT MEMBER NUMBER ON PAGE LOAD
// =====================================
window.onload = async function () {
    try {
        const response = await fetch(`${API_BASE_URL}?action=getNextMemberNumber`);
        const result = await response.json();

        if (result.status === "success") {
            document.getElementById("memberNumber").value = result.memberNumber;
        }
    } catch (error) {
        console.error("Failed to load member number:", error);
    }
};

// =====================================
// SAVE / UPDATE MEMBER (CORS FIXED)
// =====================================
async function saveMember() {
    try {
        showLoading();

        const memberData = {
            memberNumber: document.getElementById("memberNumber").value,
            fullName: document.getElementById("fullName").value,
            fatherName: document.getElementById("fatherName").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            age: document.getElementById("age").value,
            mobile: document.getElementById("mobile").value,
            alternateMobile: document.getElementById("alternateMobile").value,
            email: document.getElementById("email").value,
            aadhaar: document.getElementById("aadhaar").value,
            pan: document.getElementById("pan").value,
            occupation: document.getElementById("occupation").value,
            monthlyIncome: document.getElementById("monthlyIncome").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            district: document.getElementById("district").value,
            state: document.getElementById("state").value,
            pinCode: document.getElementById("pinCode").value,
            aadhaarCollected: document.getElementById("aadhaarCollected").value,
            panCollected: document.getElementById("panCollected").value,
            photoCollected: document.getElementById("photoCollected").value,
            signatureCollected: document.getElementById("signatureCollected").value,
            nomineeName: document.getElementById("nomineeName").value,
            nomineeRelation: document.getElementById("nomineeRelation").value,
            nomineeMobile: document.getElementById("nomineeMobile").value,
            status: document.getElementById("status").value
        };

        const action = isUpdateMode ? "updateMember" : "saveMember";

        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"   // Important for Google Apps Script CORS
            },
            body: JSON.stringify({
                action: action,
                data: memberData
            })
        });

        const result = await response.json();
        hideLoading();

        if (result.status === "success") {
            showSuccessPopup(
                isUpdateMode ? "Member Updated Successfully" : "Member Saved Successfully",
                result.memberNumber || memberData.memberNumber
            );
        } else {
            showErrorPopup(result.message || "Operation failed");
        }
    } catch (error) {
        console.error("Save Error:", error);
        hideLoading();
        showErrorPopup("Error Saving Member. Check console for details.");
    }
}

// =====================================
// SEARCH MEMBER
// =====================================
async function searchMember() {
    const memberNumber = document.getElementById("searchMemberNumber").value.trim();

    if (!memberNumber) {
        showErrorPopup("Please enter Member Number");
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}?action=searchMember&memberNumber=${encodeURIComponent(memberNumber)}`
        );
        const result = await response.json();

        if (result.status !== "success") {
            showErrorPopup(result.message || "Member Not Found");
            return;
        }

        const m = result.member;

        document.getElementById("memberNumber").value = m.memberNumber || "";
        document.getElementById("fullName").value = m.fullName || "";
        document.getElementById("fatherName").value = m.fatherName || "";
        document.getElementById("gender").value = m.gender || "";
        document.getElementById("dob").value = m.dob || "";
        document.getElementById("age").value = m.age || "";
        document.getElementById("mobile").value = m.mobile || "";
        document.getElementById("alternateMobile").value = m.alternateMobile || "";
        document.getElementById("email").value = m.email || "";
        document.getElementById("aadhaar").value = m.aadhaar || "";
        document.getElementById("pan").value = m.pan || "";
        document.getElementById("occupation").value = m.occupation || "";
        document.getElementById("monthlyIncome").value = m.monthlyIncome || "";
        document.getElementById("address").value = m.address || "";
        document.getElementById("city").value = m.city || "";
        document.getElementById("district").value = m.district || "";
        document.getElementById("state").value = m.state || "";
        document.getElementById("pinCode").value = m.pinCode || "";
        document.getElementById("aadhaarCollected").value = m.aadhaarCollected || "No";
        document.getElementById("panCollected").value = m.panCollected || "No";
        document.getElementById("photoCollected").value = m.photoCollected || "No";
        document.getElementById("signatureCollected").value = m.signatureCollected || "No";
        document.getElementById("nomineeName").value = m.nomineeName || "";
        document.getElementById("nomineeRelation").value = m.nomineeRelation || "";
        document.getElementById("nomineeMobile").value = m.nomineeMobile || "";
        document.getElementById("status").value = m.status || "Active";

        isUpdateMode = true;
        document.getElementById("saveBtn").innerHTML = "Update Member";

        showLoadedMessage(memberNumber);
    } catch (error) {
        console.error("Search Error:", error);
        showErrorPopup("Error searching member");
    }
}

// =====================================
// POPUP & LOADING FUNCTIONS
// =====================================
function showLoadedMessage(memberNumber) {
    alert("Member Loaded: " + memberNumber);
}

function showSuccessPopup(message, memberNumber) {
    alert(message + "\n\nMember Number: " + memberNumber);
    location.reload();   // Refresh to get new member number
}

function showErrorPopup(message) {
    alert(message);
}

function showLoading() {
    console.log("Loading...");
    // You can add a loading spinner here later
}

function hideLoading() {
    console.log("Done");
}

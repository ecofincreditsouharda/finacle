let isUpdateMode = false;

/* ==========================
   LOAD NEXT MEMBER NUMBER
========================== */

window.onload = async function () {

    try {

        const response = await fetch(
            `${API_BASE_URL}?action=getNextMemberNumber`
        );

        const result = await response.json();

        if (result.status === "success") {

            document.getElementById("memberNumber").value =
                result.memberNumber;

        }

    } catch (error) {

        console.log(error);

    }

};


/* ==========================
   SAVE / UPDATE MEMBER
========================== */

async function saveMember() {

    try {

        const memberData = {

            memberNumber:
                document.getElementById("memberNumber").value,

            fullName:
                document.getElementById("fullName").value,

            fatherName:
                document.getElementById("fatherName").value,

            gender:
                document.getElementById("gender").value,

            dob:
                document.getElementById("dob").value,

            age:
                document.getElementById("age").value,

            mobile:
                document.getElementById("mobile").value,

            alternateMobile:
                document.getElementById("alternateMobile").value,

            email:
                document.getElementById("email").value,

            aadhaar:
                document.getElementById("aadhaar").value,

            pan:
                document.getElementById("pan").value,

            occupation:
                document.getElementById("occupation").value,

            monthlyIncome:
                document.getElementById("monthlyIncome").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            district:
                document.getElementById("district").value,

            state:
                document.getElementById("state").value,

            pinCode:
                document.getElementById("pinCode").value,

            nomineeName:
                document.getElementById("nomineeName").value,

            nomineeRelation:
                document.getElementById("nomineeRelation").value,

            nomineeMobile:
                document.getElementById("nomineeMobile").value,

            status:
                document.getElementById("status").value,

            photoURL: "",
            aadhaarFrontURL: "",
            aadhaarBackURL: "",
            panCardURL: "",
            signatureURL: ""

        };

        showLoading();

        const action =
            isUpdateMode
                ? "updateMember"
                : "saveMember";

        const queryParams = new URLSearchParams({

            action: action,
            data: JSON.stringify(memberData)

        });

        const response = await fetch(
            `${API_BASE_URL}?${queryParams}`
        );

        const result = await response.json();

        hideLoading();

        if (result.status === "success") {

            if (isUpdateMode) {

                showSuccessPopup(
                    "Member Updated Successfully",
                    memberData.memberNumber
                );

            } else {

                showSuccessPopup(
                    "Member Saved Successfully",
                    result.memberNumber
                );

            }

        } else {

            showErrorPopup(result.message);

        }

    } catch (error) {

        console.error(error);

        hideLoading();

        showErrorPopup("Error Saving Member");

    }

}


/* ==========================
   SEARCH MEMBER
========================== */

async function searchMember() {

    const memberNumber =
        document.getElementById("searchMemberNumber")
        .value
        .trim();

    if (!memberNumber) {

        showErrorPopup("Enter Member Number");

        return;

    }

    try {

        const response = await fetch(
            `${API_BASE_URL}?action=searchMember&memberNumber=${memberNumber}`
        );

        const result = await response.json();

        if (result.status !== "success") {

            showErrorPopup(result.message);

            return;

        }

        const m = result.member;

        document.getElementById("memberNumber").value = m.memberNumber || "";
        document.getElementById("fullName").value = m.fullName || "";
        document.getElementById("fatherName").value = m.fatherName || "";
        document.getElementById("gender").value = m.gender || "";

        if (m.dob) {

            document.getElementById("dob").value =
                String(m.dob).substring(0, 10);

        }

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
        document.getElementById("nomineeName").value = m.nomineeName || "";
        document.getElementById("nomineeRelation").value = m.nomineeRelation || "";
        document.getElementById("nomineeMobile").value = m.nomineeMobile || "";
        document.getElementById("status").value = m.status || "Active";

        document.getElementById("saveBtn").innerHTML =
            "Update Member";

        isUpdateMode = true;

        showLoadedMessage(memberNumber);

    } catch (error) {

        console.error(error);

        showErrorPopup("Error Loading Member");

    }

}


/* ==========================
   MEMBER LOADED
========================== */

function showLoadedMessage(memberNumber) {

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="loadedMsg" style="
            position:fixed;
            top:20px;
            right:20px;
            background:#00b894;
            color:white;
            padding:15px 25px;
            border-radius:12px;
            z-index:99999;
            font-weight:bold;
        ">
            ✓ Member Loaded : ${memberNumber}
        </div>
        `
    );

    setTimeout(() => {

        const el =
            document.getElementById("loadedMsg");

        if (el) el.remove();

    }, 3000);

}


/* ==========================
   SUCCESS POPUP
========================== */

function showSuccessPopup(message, memberNumber) {

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="successPopup" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,.4);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:999999;
        ">
            <div style="
                background:#fff;
                width:420px;
                padding:35px;
                border-radius:20px;
                text-align:center;
                box-shadow:0 15px 40px rgba(0,0,0,.25);
            ">

                <div style="
                    font-size:70px;
                    color:#00b894;
                ">
                    ✔
                </div>

                <h2>${message}</h2>

                <p style="margin-top:10px;">
                    Member Number
                </p>

                <h1 style="
                    color:#0984e3;
                    margin:15px 0;
                ">
                    ${memberNumber}
                </h1>

                <button onclick="closeSuccessPopup()">
                    OK
                </button>

            </div>
        </div>
        `
    );

}

function closeSuccessPopup() {

    location.reload();

}


/* ==========================
   ERROR POPUP
========================== */

function showErrorPopup(message) {

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="errorPopup" style="
            position:fixed;
            top:20px;
            right:20px;
            background:#e74c3c;
            color:white;
            padding:15px 25px;
            border-radius:12px;
            z-index:99999;
            font-weight:bold;
        ">
            ✖ ${message}
        </div>
        `
    );

    setTimeout(() => {

        const popup =
            document.getElementById("errorPopup");

        if (popup) popup.remove();

    }, 3000);

}


/* ==========================
   LOADING
========================== */

function showLoading() {

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="loadingPopup" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(255,255,255,.75);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:999999;
        ">
            <div style="
                background:white;
                padding:30px;
                border-radius:16px;
                box-shadow:0 10px 25px rgba(0,0,0,.15);
            ">
                <h2>Please Wait...</h2>
            </div>
        </div>
        `
    );

}

function hideLoading() {

    const popup =
        document.getElementById("loadingPopup");

    if (popup) {

        popup.remove();

    }

}

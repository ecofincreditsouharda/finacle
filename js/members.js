async function saveMember() {

    try {

        const memberData = {

            fullName: document.getElementById("fullName").value,
            fatherName: document.getElementById("fatherName").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            mobile: document.getElementById("mobile").value,
            aadhaar: document.getElementById("aadhaar").value,
            pan: document.getElementById("pan").value,
            address: document.getElementById("address").value,

            photoURL: "",
            aadhaarFrontURL: "",
            aadhaarBackURL: "",
            panCardURL: ""

        };

        /* SHOW LOADING */

        showLoading();

        const queryParams = new URLSearchParams({

            action: "saveMember",

            data: JSON.stringify(memberData)

        });

        const response = await fetch(

            `${API_BASE_URL}?${queryParams}`,

            {

                method: "GET"

            }

        );

        const result = await response.json();

        console.log(result);

        hideLoading();

        if(result.status === "success") {

            showSuccessPopup(result.memberNumber);

        } else {

            showErrorPopup(result.message);

        }

    } catch(error) {

        console.error(error);

        hideLoading();

        showErrorPopup("Error Saving Member");

    }

}


/* SUCCESS POPUP */

function showSuccessPopup(memberNumber){

    document.body.insertAdjacentHTML(

        "beforeend",

        `

        <div id="successPopup" style="

            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;

            background:rgba(0,0,0,0.45);

            display:flex;
            justify-content:center;
            align-items:center;

            z-index:9999;

        ">

            <div style="

                background:white;

                width:380px;

                padding:35px;

                border-radius:22px;

                text-align:center;

                box-shadow:0 15px 40px rgba(0,0,0,0.25);

                animation:popupShow 0.3s ease;

            ">

                <div style="

                    width:90px;
                    height:90px;

                    background:#e8fff3;

                    border-radius:50%;

                    margin:auto;

                    display:flex;
                    align-items:center;
                    justify-content:center;

                    font-size:50px;

                    color:#00b894;

                    margin-bottom:20px;

                ">
                    ✔
                </div>

                <h2 style="
                    margin-bottom:10px;
                    color:#222;
                    font-size:28px;
                ">
                    Member Saved
                </h2>

                <p style="
                    color:#666;
                    margin-bottom:25px;
                    font-size:15px;
                ">
                    New member created successfully
                </p>

                <div style="

                    background:#f4f7fb;

                    padding:18px;

                    border-radius:14px;

                    margin-bottom:25px;

                ">

                    <div style="
                        font-size:14px;
                        color:#666;
                        margin-bottom:8px;
                    ">
                        Member Number
                    </div>

                    <div style="
                        font-size:28px;
                        font-weight:bold;
                        color:rgb(0,145,255);
                        letter-spacing:1px;
                    ">
                        ${memberNumber}
                    </div>

                </div>

                <button onclick="closeSuccessPopup()" style="
                    width:100%;
                ">
                    OK
                </button>

            </div>

        </div>

        <style>

            @keyframes popupShow{

                from{
                    opacity:0;
                    transform:scale(0.9);
                }

                to{
                    opacity:1;
                    transform:scale(1);
                }

            }

        </style>

        `

    );

}


/* CLOSE SUCCESS POPUP */

function closeSuccessPopup(){

    document.getElementById("successPopup").remove();

    location.reload();

}


/* ERROR POPUP */

function showErrorPopup(message){

    document.body.insertAdjacentHTML(

        "beforeend",

        `

        <div id="errorPopup" style="

            position:fixed;
            top:30px;
            right:30px;

            background:#ff4d4f;

            color:white;

            padding:18px 25px;

            border-radius:14px;

            box-shadow:0 10px 25px rgba(0,0,0,0.2);

            z-index:9999;

            font-size:15px;

            animation:slideIn 0.3s ease;

        ">

            ❌ ${message}

        </div>

        <style>

            @keyframes slideIn{

                from{
                    opacity:0;
                    transform:translateX(50px);
                }

                to{
                    opacity:1;
                    transform:translateX(0);
                }

            }

        </style>

        `

    );

    setTimeout(() => {

        const popup = document.getElementById("errorPopup");

        if(popup){

            popup.remove();

        }

    }, 3000);

}


/* LOADING */

function showLoading(){

    document.body.insertAdjacentHTML(

        "beforeend",

        `

        <div id="loadingPopup" style="

            position:fixed;
            top:0;
            left:0;

            width:100%;
            height:100%;

            background:rgba(255,255,255,0.7);

            display:flex;
            justify-content:center;
            align-items:center;

            z-index:9999;

        ">

            <div style="text-align:center;">

                <div style="

                    width:70px;
                    height:70px;

                    border:7px solid #eee;

                    border-top:7px solid rgb(0,145,255);

                    border-radius:50%;

                    animation:spin 1s linear infinite;

                    margin:auto;

                "></div>

                <div style="
                    margin-top:15px;
                    font-size:16px;
                    font-weight:bold;
                    color:#333;
                ">
                    Saving Member...
                </div>

            </div>

        </div>

        <style>

            @keyframes spin{

                0%{
                    transform:rotate(0deg);
                }

                100%{
                    transform:rotate(360deg);
                }

            }

        </style>

        `

    );

}


/* HIDE LOADING */

function hideLoading(){

    const loading = document.getElementById("loadingPopup");

    if(loading){

        loading.remove();

    }

}
window.onload = async function(){

    try{

        const response = await fetch(
            `${API_BASE_URL}?action=getNextMemberNumber`
        );

        const result = await response.json();

        if(result.status === "success"){

            document.getElementById("memberNumber").value =
                result.memberNumber;

        }

    }catch(error){

        console.log(error);

    }

}

async function searchMember() {

    const memberNumber =
        document.getElementById(
            "searchMemberNumber"
        ).value;

    if (!memberNumber) {

        alert("Enter Member Number");

        return;

    }

    try {

        const response = await fetch(

            `${API_BASE_URL}?action=searchMember&memberNumber=${memberNumber}`

        );

        const result = await response.json();

        if (result.status !== "success") {

            alert(result.message);

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
        document.getElementById("nomineeName").value = m.nomineeName || "";
        document.getElementById("nomineeRelation").value = m.nomineeRelation || "";
        document.getElementById("nomineeMobile").value = m.nomineeMobile || "";
        document.getElementById("status").value = m.status || "";

        document.getElementById(
            "saveBtn"
        ).innerHTML = "Update Member";

    } catch (error) {

        console.error(error);

        alert("Error Loading Member");

    }

}

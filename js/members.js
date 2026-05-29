async function saveMember() {

    const memberData = {

        fullName: document.getElementById("fullName").value,
        fatherName: document.getElementById("fatherName").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        mobile: document.getElementById("mobile").value,
        aadhaar: document.getElementById("aadhaar").value,
        pan: document.getElementById("pan").value,
        address: document.getElementById("address").value,

        aadhaarFrontURL: "",
        aadhaarBackURL: "",
        panCardURL: "",
        photoURL: ""

    };

    const response = await apiPost("saveMember", memberData);

    if(response.status === "success") {

        alert(
            "Member Saved Successfully\n\n" +
            "Member Number: " + response.memberNumber
        );

        location.reload();

    } else {

        alert("Error Saving Member");

        console.log(response);

    }

}

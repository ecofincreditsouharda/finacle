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

            aadhaarFrontURL: "",
            aadhaarBackURL: "",
            panCardURL: "",
            photoURL: ""

        };

        console.log(memberData);

        const response = await fetch(
            `${API_BASE_URL}?action=saveMember`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(memberData)
            }
        );

        const result = await response.json();

        console.log(result);

        if(result.status === "success") {

            alert(
                "Member Saved Successfully\n\n" +
                "Member Number: " + result.memberNumber
            );

            location.reload();

        } else {

            alert(result.message);

        }

    } catch(error) {

        console.error(error);

        alert("Error Saving Member");

    }

}

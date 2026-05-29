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

        if(result.status === "success") {

            alert(

                "Member Saved Successfully\n\n" +

                "Member Number: " +

                result.memberNumber

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

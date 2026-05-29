// =====================================
// API GET REQUEST
// =====================================

async function apiGet(action) {

    try {

        const response = await fetch(`${API_BASE_URL}?action=${action}`);

        return await response.json();

    } catch(error) {

        console.error("GET API ERROR:", error);

    }

}


// =====================================
// API POST REQUEST
// =====================================

async function apiPost(action, data) {

    try {

        const response = await fetch(`${API_BASE_URL}?action=${action}`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        return await response.json();

    } catch(error) {

        console.error("POST API ERROR:", error);

    }

}

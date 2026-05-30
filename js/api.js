// =====================================
// ECOFIN API CONFIG HELPERS
// =====================================

async function apiGet(action, params = {}) {

    try {

        const query =
            new URLSearchParams({
                action,
                ...params
            });

        const response =
            await fetch(
                `${API_BASE_URL}?${query}`
            );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            status: "error",
            message: error.message
        };

    }

}


// =====================================
// API POST
// =====================================

async function apiPost(action, data = {}) {

    try {

        const response =
            await fetch(API_BASE_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    action: action,
                    data: data

                })

            });

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            status: "error",
            message: error.message
        };

    }

}

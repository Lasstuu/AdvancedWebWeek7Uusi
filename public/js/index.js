document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
    } else {
        fetch("/api/private", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to authenticate");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            window.location.href = "/login.html";
        });
    }
});

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

document.getElementById("logout").addEventListener("click", logout)
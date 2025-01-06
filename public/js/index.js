document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
    } else {
        try{
            fetch("/api/private", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
                
            })
            if (response.ok) {
                return response.json();
            }
        }catch(error){
            console.error("Error:", error);
            window.location.href = "/login.html";
        }
    }
});

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

document.getElementById("logout").addEventListener("click", logout)
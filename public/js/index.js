document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
    } 

    const response = await fetch("/api/private", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }     
        })
        if (!response.ok) {
            console.log("error")
        }
        else{
            console.log("Success authetnitcate")
            
            window.location.href = "/login.html";
        }
    
    });

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

document.getElementById("logout").addEventListener("click", logout)
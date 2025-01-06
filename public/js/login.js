const initializeLogin = () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        fetchData(event)
    })
}

const fetchData = async (event) => {
    event.preventDefault()
    const formData ={
        email: event.target.email.value,
        password: event.target.password.value
    }
    console.log(formData)
    try {
        const res = await fetch("api/user/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!res.ok){
            console.log("error")
        }else{
            const data = await res.json()
            if(data.token){
                localStorage.setItem("token", data.token)
                
            }
            console.log("Login succesful")
            window.location.href = "/index.html"
        }
    } catch(error){
        console.log(`Error trying to register: {$error.message}`)
    }
}

initializeLogin()
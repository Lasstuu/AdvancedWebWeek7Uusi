const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
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
        const res = await fetch("api/user/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!res.ok){
            console.log("error")
        }else{
            window.location.href = "/login.html"
        }
    } catch(error){
        console.log(`Error trying to register: {$error.message}`)
    }
}

initializeRegister()
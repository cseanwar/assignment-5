document.getElementById("sign-in-btn").addEventListener("click", function() {
    const inputUsername = document.getElementById("input-username");
    const userName = inputUsername.value;
    const inputPassword = document.getElementById("input-password");
    const pass = inputPassword.value;
    if (userName == "admin" && pass == "admin123") {
        alert("Logged in Successfully")
        window.location.assign("home.html");
    } else {
        alert("Login Failed!!!");
        return;
    } 
});
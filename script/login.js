document.getElementById("sign-in-btn").addEventListener("click", function() {
    //1- get the username input
    const inputUsername = document.getElementById("input-username");
    const userName = inputUsername.value;
    // console.log(userName);

    //2- get the password input
    const inputPassword = document.getElementById("input-password");
    const pass = inputPassword.value;
    // console.log(pass);
    //3- match password & username
    if (userName == "admin" && pass == "admin123") {
        //3-1 true:::>> alert> homepage
        alert("Logged in Successfully")

        // window.location.replace("/home.html");
        window.location.assign("./home.html");
    } else {
        //3-2 true:::>> alert> return
        alert("Login Failed!!!");
        return;
    } 
});
fetch("nav_bar.html")
.then(res => res.text())
.then(data => {
    document.getElementById("nav-bar").innerHTML = data;

    // updating the nav bar with login, logout
    const navElement = document.getElementById("nav-element");
    const token = localStorage.getItem("token")
    console.log(token)

    if (token) {
        if (localStorage.getItem("role") != "admin"){
            navElement.innerHTML += `
                <li class="menu">
                    <a target="_blank" href="service_contact.html" class="text-white link">Services</a>
                </li>

                <li class="menu">
                    <a target="_blank" href="service_contact.html" class="text-white link">Contact Us</a>
                </li>

                <li class="menu">
                    <a target="_blank" href="profile.html" class="text-white link">Profile</a>
                </li>

                <li class="menu">
                    <p class="text-white link" onclick="handleLogout()" style=".status:hover{ pointer-events: painted; }">Logout</p>
                </li>
            `;
        }
        else{
            navElement.innerHTML += `
                <li class="menu">
                    <a target="_blank" href="add_tuitons.html" class="text-white link">Add Tuition Jobs</a>
                </li>
                <li class="menu">
                    <p class="text-white link" onclick="handleLogout()" style=".link:hover{ pointer-events: painted; }">Logout</p>
                </li>
            `;
        }
    }
    else{
        navElement.innerHTML += `
                <li class="menu">
                    <a target="_blank" href="service_contact.html" class="text-white link">Services</a>
                </li>

                <li class="menu">
                    <a target="_blank" href="service_contact.html" class="text-white link">Contact Us</a>
                </li>
                <li class="menu"><a target="_blank" href="register.html" class="text-white link">Register</a></li>
        `
    }
})
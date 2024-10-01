const handleRegistration = (event) => {
  event.preventDefault();

  const selectedGender = document.querySelector('input[name="gender"]:checked').value;
  console.log(selectedGender)

  const username = getValue("username")
  const first_name = getValue("first_name")
  const last_name = getValue("last_name")
  const email = getValue("inputEmail4")
  const password = getValue("password")
  const confirm_password = getValue("confirm_password")
  const location = getValue("address")
  const educational_institute = getValue("educational_institute")
  const gender = selectedGender

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    location,
    educational_institute,
    gender
  };
  // http://127.0.0.1:8000/users/register_user_list/

  if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(confirm_password)){
    document.getElementById("error").innerText = "";

    if (password === confirm_password) {
      console.log(JSON.stringify(info))
      fetch("https://final-exam-tuition-media-64an.vercel.app/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),

      }).then((res) => res.json())
        .then((data) => {
          console.log(data)
          alert("Registration Done! Check Your Email!")
        });
     }
     else {
      document.getElementById("error").innerText = "password and confirm password do not match";
     }
  }
  else {
    document.getElementById("error").innerText =
    "password must contain eight characters, at least one letter, one number and one special character:";
  }
}


const getValue = (id) => {
  const element = document.getElementById(id);
  if (element) {
    return element.value;
  }
  console.error(`Element with id "${id}" not found.`);
  return null; // Or handle it as needed
};

const handleLogin = (event) => {
  event.preventDefault();

  // Get form values
  const username = getValue("username");
  const email = getValue("inputEmail4");
  const password = getValue("password");
  const select_role = document.querySelector("#role").value;

  console.log(username, password, email);
  console.log(select_role);

  // Role-based validation
  if (select_role === "teacher" && (username === "user" || email === "user@gmail.com")) {
    alert("Invalid Teacher Info!");
  } 
  else if (select_role === "admin" && (username !== "user" || email !== "user@gmail.com")) {
    alert("Invalid Admin Info!");
  } 
  else if (!username || !email || !password) {
    // Ensure all fields are filled
    alert("All fields are required!");
  } 
  else {
    // Proceed with login API call
    fetch("https://final-exam-tuition-media-64an.vercel.app/users/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === "error") {
          alert("Login Failed!");
        } 
        else if (data.token && data.user_id) {
          // Save data to localStorage if login is successful
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("user_model_id", data.user_model_id);
          localStorage.setItem("role", select_role);

          window.location.href = "home.html";

          alert("Login Successfully!")
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login Failed due to server error!");
      });
  }
};

  
  // event.preventDefault();
  // const username = getValue("username");
  // const email = getValue("inputEmail4")
  // const password = getValue("password");

  // const select_role = document.querySelector("#role").value

  // console.log(username, password, email);
  // console.log(select_role)

  // // if (username != "user" || email != "user@gmail.com" || password != "123") {
  // //   alert("Invalid Login as Admin!")
  // // }

  // // else {
  // if (select_role == "teacher" && (username == "user" || email == "user@gmail.com")){
  //   alert("Invalid Teacher Info!")
  // }
  // else if (username != "user" || email == "user@gmail.com" && select_role == "admin"){
  //   alert("Invalid Admin Info")
  // }
  // else if ((username, password, email)) {
  //   fetch("http://127.0.0.1:8000/users/login/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, password, email }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data == "error"){
  //         alert("Login Failed!")
  //       }

  //       if (data.token && data.user_id) {
  //         localStorage.setItem("token", data.token);
  //         localStorage.setItem("user_id", data.user_id);
  //         localStorage.setItem("user_model_id", data.user_model_id);
  //         localStorage.setItem("role", select_role);
  //         window.location.href = "home.html";
  //       }
  //     });
  // }
  // else{
  //   alert("Login Failed!")
  // }
  

  // // if (username == "user" || email == "user@gmail.com" && select_role == "teacher"){

const handleLogout = () => {
  const token = localStorage.getItem("token");

  fetch('https://final-exam-tuition-media-64an.vercel.app/users/logout/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        window.location.href = "./home.html";
      } else {
        console.error("Failed to log out:", res.status, res.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
};

// const handleLogout = () => {
//   console.log("hello")
//   const token = localStorage.getItem("token")

//   fetch('http://127.0.0.1:8000/users/logout/',{
//       method:"POST",
//       headers:
//       {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//     }).then((res) => {
//       if (res.ok){
//         localStorage.removeItem("token");
//         window.location.href = "./home.html"
//       }
//     })
// }
window.onload = function() {
  loadUserInfo1() 
  loadUserInfo2() 
  loadTuitionHistory()
};
// displaying profile functions
const loadUserInfo1 = () =>{
    const user_model_id = localStorage.getItem("user_model_id")
    fetch(`https://final-exam-tuition-media-64an.vercel.app/users/list/${user_model_id}/`) // getting educational bg
    .then((res)=>res.json())
    .then((data)=>{
      displayUserInfo1Details(data)
    })
}
const loadUserInfo2 = () =>{
    const user_id = localStorage.getItem("user_id")
    fetch(`https://final-exam-tuition-media-64an.vercel.app/users/register_user_list/${user_id}/`) // username, first & last name
    .then((res)=>res.json())
    .then((data)=>{
      // console.log(data)
      displayUserInfo2Details(data) 
    })
}

const displayUserInfo2Details = (data) =>{
    console.log(data)
    const parent = document.getElementById("userInfo2")
    const div = document.createElement("div")

    div.innerHTML =`
        <div>
            <table class="table user-info-edu">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">${data.username}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Full Name</th>
                  <td>${data.first_name} ${data.last_name}</td>
                </tr>
                <tr>
                  <th scope="row">First Name</th>
                  <td>${data.first_name}</td>
                </tr>
                <tr>
                  <th scope="row">last Name</th>
                  <td>${data.last_name}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>${data.email}</td>
                </tr>
              </tbody>
            </table>
        </div>
    `
    parent.appendChild(div)
}

const displayUserInfo1Details = (data) =>{
    console.log(data)
    const parent = document.getElementById("userInfo1")
    const div = document.createElement("div")

    div.innerHTML =`
        <div>
            <table class="table user-info-edu">
              <thead>
                <tr>
                  <th scope="col">Educational Institute</th>
                  <th scope="col">${data.educational_institute}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Location</th>
                  <td>${data.location}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td>${data.gender}</td>
                </tr>
              </tbody>
            </table>
        </div>
    `
    parent.appendChild(div)
}

// displaying tuition history functions

const loadTuitionHistory = () =>{
  const user_id = localStorage.getItem("user_model_id")
  console.log(user_id)
  fetch(`https://final-exam-tuition-media-64an.vercel.app/tuition_history/list/?user_id=${user_id}/`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach(element => {
      console.log("All tuition History:", data)
      loadTuitionHistoryTuitionDetails(element.tuition, element.status)
    }); 
  })
}

const loadTuitionHistoryTuitionDetails = (tuition_id, tuition_status) =>{
  fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`) // getting educational bg
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    displayTuitionHistoryTuitionDetails(data, tuition_status)
  })
}

const displayTuitionHistoryTuitionDetails = (data, tuition_status) =>{
  const parent = document.getElementById("tuition-history-details")
  const row_details = document.createElement("tr")

  row_details.innerHTML =`
                    <th scope="row">${data.id}</th>
                    <td>${data.grade}</td>
                    <td>${data.name}</td>
                    <td>${data.salary}<i class="fa-solid fa-bangladeshi-taka-sign"></i> / month</td>
  `
  if (tuition_status == "Pending"){
    row_details.innerHTML +=`
                    <td class="tuition-status"><button class="tuition-status-btn btn-pending">${tuition_status}</button></td>
    `
  }
  else{
    row_details.innerHTML +=`
                    <td class="tuition-status"><button class="tuition-status-btn btn-selected">${tuition_status}</button></td>
    `
  }

  parent.appendChild(row_details)
}

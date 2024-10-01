window.onload = function() {
    getParams()
    loadAllReview()
};

const getParams = () =>{
    const param = new URLSearchParams(window.location.search).get("tuition_id");
    console.log(param)
    loadTuitionDetails(param)
}

const loadTuitionDetails = (tuition_id) => {
    console.log("loading details")
    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`) 
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        displayTuitionDetails(data)
    })
};

const displayTuitionDetails = (tuition) => {
    console.log(tuition)
    const parent = document.getElementById("details-container");
    parent.innerHTML = ''; // Clear previous content
    const div = document.createElement("div");
    div.classList.add("details");

    div.innerHTML = `
        <div>
            <h1 class="text-center">Tutor Needed For ${tuition.medium} Version</h1>
            <h5 class="text-center">Tuition ID: ${tuition.id}</h5>
            <h4 class="text-center mt-3 mb-2"><i class="fa-solid fa-location-dot text-danger"></i> ${tuition.location}</h4>
            <hr>
            <div>
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Student's Name: ${tuition.name}</h4></div>
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Student's Grade: ${tuition.grade}</h4></div>
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Medium: ${tuition.medium} Version</h4></div>
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Student's Gender: ${tuition.stu_gender}</h4></div>
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Expected Tutor: ${tuition.prefered_tutor} Tutor</h4></div>

                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Salary: ${tuition.salary} <i class="fa-solid fa-bangladeshi-taka-sign"></i>/month</h4></div>
                
                <div class="border border-primary p-2 mb-3 rounded-end"><h4>Student Descripition: ${tuition.descripition}</h4></div>

                <div class="border border-primary p-2 mb-4 rounded-end mb-2"><h4>Extra Need: ${tuition.extra_need}</h4></div>
                <hr>
            </div>
        </div>
    `;
    if (localStorage.getItem("role") != "teacher" && localStorage.getItem("role") != "admin"){
        div.innerHTML += `
                <a style="background-color: #79addc; border: solid 3px #a0c4ff ; color: white" class="w-100 p-3 mb-2 rounded fw-bold fs-5 btn text-center m-auto text-white fw-bold" href="./login.html" style="text-decoration:none;">

                <i class="fa-solid fa-paper-plane"></i> Login/Register To Apply for This Job

                </a>
                
                <a class="text-center m-auto btn btn-warning text-white f
                w-bold" href="./tuition_jobs.html" style="text-decoration:none;">See All Tuition Jobs</a>
        `
    }
    else if (localStorage.getItem("role") == "teacher"){
        div.innerHTML += `
                <button class="w-100 p-3 mb-2 rounded fw-bold fs-5" style="background-color: #79addc; border: solid 3px #a0c4ff ; color: white;" onclick="applyTuition(${tuition.is_applied})">Apply Tuition</button>
        `
        
    }
    else if (localStorage.getItem("role") == "admin"){
        div.innerHTML += `
                <a class="w-100 m-auto admin-btn p-3 mb-2 rounded fw-bold fs-5 text-center text-light" 
                   href="./tuition_history.html?tuition_id=${tuition.id}" 
                   style="background-color: #79addc; border: solid 3px #a0c4ff; text-decoration: none;">
                    See All Applicants For this Tuition
                </a>
        `
    }

    parent.appendChild(div);
}

// apply for tuition
const updateTuition_isApplied = (tuition_id) => {
    const token = localStorage.getItem('token');
    const postData = {
        is_applied: true
    };

    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`, { 
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
    })
    .then((res) => res.json())
    .then((data) => {
        alert("Tuition status updated to applied");
        window.location.href = "./tuition_jobs.html";
    })
};

const applyTuition = (is_applied) =>{
    if (is_applied == false)
    {
        const tuition = new URLSearchParams(window.location.search).get("tuition_id");
        const user = localStorage.getItem("user_model_id")

        updateTuition_isApplied(tuition)
        //console.log("applied Tuition", param, user_model_id)
        const postData = {
            status:"Pending",
            tuition:tuition,
            user:user
        }
        const token = localStorage.getItem('token')
        fetch('https://final-exam-tuition-media-64an.vercel.app/tuition_history/list/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(postData),
        }).then((res) => res.json())
        .then((data)=>{
            alert("Applied Successfully!")
            is_applied = true
            window.location.href = "./home.html"
        })
    }
    else{
        alert("Applied Unsuccessful! You can't apply twice!")
    }
}

// review

const loadAllReview = () =>{
    const tuition_id = new URLSearchParams(window.location.search).get("tuition_id");

    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/review/?tuition_id=${tuition_id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        displayReview(data)
    })
}

const displayReview = (review) =>{
    console.log("display")
    const parent = document.getElementById("review-container")

    review.forEach(element => {
        fetch(`https://final-exam-tuition-media-64an.vercel.app/users/register_user_list/${element.reviewer}/`) // fetching user's data
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)

            const date = new Date(element.time)
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            console.log(formattedDate)

            parent.innerHTML += `
            <div class="p-3 p-xl-5 text-light gap-5 slide-visible" style="background-color: #bcffc4; border-right: 1px solid #adf7b6; border-left: 1px solid #adf7b6; border-radius: 10px; --darkreader-inline-bgcolor: #3a423c;">
                <div class="d-flex gap-5">
                    <h4 class="text-uppercase" style="color: #f6ac69;">${data.username}</h4>
                    <h4 class="text-uppercase" style="color: #58c4ee; font-weight: bold;">${formattedDate}</h4>
                </div>     
                
                <h3 class="text-uppercase h5 text-light">${element.rating}</h3>
                <br>
                <h5 class="" style="color: #9cadce;">" ${element.review} "</h5>
            </div>
        `
        
        })
    });
}

const postReview = (event) =>{
    event.preventDefault()

    const tuition_id = new URLSearchParams(window.location.search).get("tuition_id");
    const user_id = localStorage.getItem("user_id")

    const form = document.getElementById("review-form")
    const formData = new FormData(form)

    const postData = {
        reviewer: user_id,
        tuition: tuition_id,
        review: formData.get("review"),
        rating: formData.get("rating")
    }

    console.log(postData)

    const token = localStorage.getItem('token')
    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/review/`, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData)
    }).then((res) => res.json())
    .then((data)=>{
        window.location.reload()
        alert("review Added Successfully!")
    })
}
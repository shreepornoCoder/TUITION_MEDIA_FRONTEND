let tuition_edit_id = 0

const filterTuitionByClass = (tuition_class) => {
    const parent_class = document.getElementById('selected-class')

    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/?grade=${
        tuition_class
    }`)
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("job-count")

        console.log(tuition_class)
        if (tuition_class == ''){
            parent_class.innerText = `All`
        }
        else
        {
            parent_class.innerText = `${tuition_class}`
        }
        parent.innerText = `${data.length}`

        console.log(parent_class);

        console.log(data)
        displayTuition(data)
    })
};

const displayTuition = (tuitions) =>{
    const token = localStorage.getItem("token")
    const parent = document.getElementById("tuition-container");
    parent.innerHTML = '';
    tuitions.forEach((tuition) => {
        const div = document.createElement("div");
        div.classList.add("tuition");
        div.innerHTML += `
            <div class="card mb-2" style="width: 65rem;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title"><i class="fa-solid fa-location-dot text-danger"></i> ${tuition.location}</h5>
                        <div class="d-flex g-2" style="background-color: #80fb8f; padding: 10px; border-radius: 7px;">
                            <h4 class="text-white">Tuition ID:  </h4>
                            <h4 class="text-white mx-2"> ${tuition.id}</h4>
                        </div>
                    </div>
                    <br>
                    <h2 class="card-title">Tutor Needed For ${tuition.medium} Version</h2>
                    <br>
                    <div class="d-flex justify-content-around">
                        <div>
                            <h5 class="card-text"><i class="fa-solid fa-school"></i> Medium:</h5>
                            <h5>${tuition.medium}</h5>
                        </div>
                        <div>
                            <h5 class="card-text"><i class="fa-solid fa-chalkboard-user"></i> Class:</h5>
                            <h5>Standard ${tuition.grade}</h5>
                        </div>
                        <div>
                            <h5 class="card-text"><i class="fa-solid fa-user"></i> Preferred Tutor:</h5>
                            <h5>${tuition.prefered_tutor} Tutor</h5>
                        </div>
                        <div>
                            <h5 class="card-text"><i class="fa-solid fa-money-bill text-success"></i> Salary:</h5>
                            <h5>${tuition.salary} <i class="fa-solid fa-bangladeshi-taka-sign"></i>/month</h5>
                        </div>
                    </div>
                    <br>
                    <div class="d-flex gap-5" style="margin-left: 10px;">
                        <div style="margin-left: 50px; margin-right: 35px;">
                            <h5 class="card-text"><i class="fa-solid fa-graduation-cap"></i> Student Gender:</h5>
                            <h5>${tuition.stu_gender}</h5>
                        </div>
                        <div class="w-75">
                            <h5 class="card-text"><i class="fa-solid fa-copy"></i> Subjects:</h5>
                            ${tuition?.subjects?.map((subject) => {
                                return `<button class="subject">${subject.name}</button>`;
                            })}
                        </div>
                    </div>
                    <button class="mt-4" style="position: relative; left: 860px; padding: 10px; padding-left: 15px; padding-right: 15px; border-radius: 6px; border: none; background-color: #f6bc66 ; font-weight: bold"> <a class="text-light" target="_blank" href="./details_tuition.html?tuition_id=${tuition.id}" style="text-decoration: none;">View Details</a> </button>
                </div>
            </div>
        `;
        if (localStorage.getItem("role") == "admin") {
            div.innerHTML+=`
                    <div class="mt-4">
                        <button id="edit_btn" type="button" class="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-primary" 
                        style="position: relative; left: 805px; top: -88px; padding: 10px; padding-left: 15px; padding-right: 15px; border-radius: 6px;" onclick="loadTuitionEditDetails(${tuition.id})">Edit</button>


                        <button class="btn btn-danger" style="position: relative; left: 650px; top: -88px; padding: 10px; padding-left: 15px; padding-right: 15px; border-radius: 6px;"> <a class="text-light" style="text-decoration: none;" id="delete_btn" onclick="Delete_Tuition(${tuition.id})">Delete</a> </button>
                    <div>
            `
        }
        parent.appendChild(div);
    });
};

// editting 
const loadTuitionEditDetails = (tuition_id) =>{
    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        displayTuitionEditPost(data)
    })
}

const displayTuitionEditPost = (tuition) =>{
    document.getElementById("stu_edit_name").value = tuition.name;
    document.getElementById("edit_description").value = tuition.descripition;
    document.getElementById("edit_salary").value = tuition.salary;
    document.getElementById("edit_location").value = tuition.location;
    document.getElementById("edit_extra_need").value = tuition.extra_need;

    document.getElementById("stu_gender").value = tuition.stu_gender;
    document.getElementById("tutor_gender").value = tuition.prefered_tutor;
    document.getElementById("medium").value = tuition.medium;
    document.getElementById("grade").value = tuition.grade;
    document.getElementById("subjects").value = tuition.subjects.map(subject => subject.name);

    var ele = document.getElementsByName('have_tutor');

    if (ele.checked){
        console.log(ele.values)
    }
    tuition_edit_id = tuition.id

    // submit btn
    // const parent = document.getElementById("submit-edit-btn")
    // const btn = document.createElement("button")
    
    // btn.innerHTML = `
    //                         <button class="btn btn-info w-100 p-3 text-light fw-bold" id="submit-edit-btn" updatePost(event, ${tuition.id})>Submit</button>
    // `
    // parent.appendChild(btn)
};

const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const updatePost = (event) => {
    event.preventDefault();

    // Get tuition id
    const tuition_id = document.getElementById("tuition_id").value;
    console.log(tuition_id);

    // Get edit form data
    const form = document.getElementById("updateForm");
    const formData = new FormData(form);
    console.log(formData)

    const token = localStorage.getItem("token");

    // Getting the selected subjects
    const select = document.getElementById('subjects');
    const subjects = [];
    const subject_ids = [];
    for (const option of select.options) {
        if (option.selected) {
            subjects.push(option.value);
            subject_ids.push(option.id);
        }
    }

    // Handling "Have Tutor" checkbox
    const ele = document.getElementsByName('have_tutor')[0];
    let have_edit_tutor = ele.checked ? true : false;

    // Get form values (if null, default to current values)
    let name = document.getElementById("stu_edit_name").value || '';
    let description = document.getElementById("edit_description").value || '';
    let salary = document.getElementById("edit_salary").value || '';
    let location = document.getElementById("edit_location").value || '';
    let extra_need = document.getElementById("edit_extra_need").value || '';

    let stu_gender = document.getElementById("stu_gender").value || '';
    let tutor_gender = document.getElementById("tutor_gender").value || '';
    let medium = document.getElementById("medium").value || '';
    let grade = document.getElementById("grade").value || '';

    console.log(name, description, salary, location, extra_need, stu_gender, tutor_gender, medium, grade, have_edit_tutor)

    // Fetch current data for default values if needed
    fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // If fields are empty, use existing data as default
        name = name || data.name;
        description = description || data.descripition;
        salary = salary || data.salary;
        location = location || data.location;
        extra_need = extra_need || data.extra_need;
        stu_gender = stu_gender || data.stu_gender;
        tutor_gender = tutor_gender || data.prefered_tutor;
        medium = medium || data.medium;
        grade = grade || data.grade;
        console.log(name, description, salary, location, extra_need, stu_gender, tutor_gender, medium, grade)

        // Update post data
        const updatePostData = {
            name: name,
            descripition: description,
            salary: salary,
            location: location,
            extra_need: extra_need,
            grade: grade,
            stu_gender: stu_gender,
            prefered_tutor: tutor_gender,
            medium: medium,
            is_applied: false,
            have_tutor: have_edit_tutor,
            subjects: subjects,
            subject_ids: subject_ids,
        };
        console.log(updatePostData)

        // Perform PUT request to update the tuition post
        fetch(`https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/${tuition_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(updatePostData),
        })
        .then((res) => res.json())
        .then((updatedData) => {
            console.log(updatedData);
            $("#editModal").modal("hide");
            alert("Tuition Post Updated Successfully!")
            window.location.reload()
        })
    })
};

// const updatePost = (event) =>{
//     event.preventDefault();

//     // get tuition id
//     const tuition_id = document.getElementById("tuition_id").value;
//     console.log(tuition_id)
    
//     // get edit form 
//     const form = document.getElementById("updateForm")
//     const formData = new FormData(form) 

//     const token = localStorage.getItem("token")

//     // getting the selected subjects
//     const select = document.getElementById('subjects');
//     const subject = []
//     const subject_id = []
//     for (const option of select.options){
//         if (option.selected) {
//             subject.push(option.value);
//             subject_id.push(option.id);
//         }
//     }

//     //have tutor
//     var ele = document.getElementsByName('have_tutor');
//     const have_edit_tutor = false
//     if (ele.checked){
//         have_edit_tutor = true
//     }
    
//     // getting form data
//     let name = formData.get("stu_edit_name");
//     let descripition = formData.get("edit_description");
//     let salary = formData.get("edit_salary");
//     let location = formData.get("edit_location");
//     let extra_need= formData.get("edit_extra_need");

//     let stu_gender = document.getElementById("stu_gender").value;
//     let tutor_gender = document.getElementById("tutor_gender").value;
//     let medium = document.getElementById("medium").value;
//     let grade = document.getElementById("grade").value;
//     // const subject = document.getElementById("subjects").value;
//     console.log(name, descripition, salary, location, extra_need, stu_gender, tutor_gender, medium, grade)

//     fetch(`http://127.0.0.1:8000/tuitions/tuiton/${tuition_id}/`)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data)
//         if (name == null) name = data.name
//         if (descripition == null) descripition = data.descripition
//         if (salary == null) salary = data.salary
//         if (location == null) location = data.location
//         if (extra_need == null) extra_need = data.extra_need
//         if (stu_gender == null) stu_gender = data.stu_gender
//         if (tutor_gender == null) tutor_gender = data.tutor_gender
//         if (medium == null) medium = data.medium
//         if (grade == null) grade = data.grade
//     })
//     console.log(name, descripition, salary, location, extra_need, stu_gender, tutor_gender, medium, grade)

//     var ele = document.getElementsByName('have_tutor');

//     if (ele.checked){
//         console.log(ele.values)
//     }

//     // update data
//     const updatePostData = {
//         name: name,
//         descripition: descripition,
//         salary: salary,
//         location: location,
//         extra_need: extra_need,
//         grade: grade,
//         stu_gender: stu_gender,
//         prefered_tutor: tutor_gender,
//         medium: medium,
//         is_applied: false,
//         have_tutor: have_edit_tutor,
//         subjects: subject,
//         subject_ids:subject_id,
//         // name: formData.get("stu_edit_name"),
//         // descripition: formData.get("edit_description"),
//         // salary: formData.get("edit_salary"),
//         // location: formData.get("edit_location"),
//         // extra_need: formData.get("edit_extra_need"),
//         // grade: document.getElementById("grade").value,
//         // stu_gender: document.getElementById("stu_gender").value,
//         // prefered_tutor: document.getElementById("tutor_gender").value,
//         // medium: document.getElementById("medium").value,
//         // is_applied: false,
//         // have_tutor: have_edit_tutor,
//         // subjects: subject,
//         // subject_ids:subject_id,
//     }
//     console.log(updatePostData)

//     // fetch(`http://127.0.0.1:8000/tuitions/tuiton/${tuition_id}/`, {
//     //     method: "PUT",
//     //     headers: {
//     //         "Content-Type" : "application/json",
//     //         Authorization : `Token ${token}`
//     //     },
//     //     body: JSON.stringify(updatePostData)
//     // })
//     // .then((res) => res.json())
//     // .then((data) => {
//     //     console.log(data)
//     //     $("#editModal").modal("hide");
//     // })
// }

// delete
const Delete_Tuition = (tuition_id) =>{
    const token = localStorage.getItem("token")
    fetch(`http://127.0.0.1:8000/tuitions/tuiton/${tuition_id}/`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Token ${token}`,
        }
    })
    .then((res) => {
        window.location.reload()
        alert("Tuition Post Deleted Successully!")
    })
    .catch((err) => {
        console.log(err)
    })

}
//*********** Added code for displaying subjects *************// 
document.addEventListener("DOMContentLoaded", function() {
    load_Subjects();
});

const load_Subjects = () =>{
    fetch('https://final-exam-tuition-media-64an.vercel.app/tuitions/subject/')
    .then((res) => res.json())
    .then((data) =>{
        // console.log(data)
        show_Subjects(data)
    })
}
const show_Subjects = (subjects) =>{
    const parent = document.getElementById("subjects")
    const div = document.createElement("div")
    subjects.forEach(element => {
        parent.innerHTML +=`
            <option value='${element.name}' id='${element.id}'>${element.name}</option>    
        `;
    });
}
//************************// 


const addPost = (event) =>{
    event.preventDefault();

    const form = document.getElementById("addTuition")
    const formData = new FormData(form)

    // getting the selected subjects
    const select = document.getElementById('subjects');
    const subject = []
    const subject_id = []
    for (const option of select.options){
        if (option.selected) {
            subject.push(option.value);
            subject_id.push(option.id);
        }
    }

    const postData = {
        name: formData.get("stu_name"),
        descripition: formData.get("description"),
        salary: formData.get("salary"),
        location: formData.get("location"),
        extra_need: formData.get("extra_need"),
        grade: document.getElementById("grade").value,
        stu_gender: document.getElementById("stu_gender").value,
        prefered_tutor: document.getElementById("tutor_gender").value,
        medium: document.getElementById("medium").value,
        is_applied: false,
        have_tutor: false,
        subjects: subject,
        subject_ids:subject_id,
    }

    const token = localStorage.getItem('token')
    fetch('https://final-exam-tuition-media-64an.vercel.app/tuitions/tuiton/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
    }).then((res) => res.json())
    .then((data)=>{
        alert("Tuition Post Added")
        window.location.href = "./tuition_jobs.html"
    })
}
var tuition_history_id_global = null;

window.onload = function() {
    getParams();
};

const getParams = () => {
    const param = new URLSearchParams(window.location.search).get("tuition_id");
    console.log("Tuition ID from URL:", param);
    loadAllTuitionHistory(param);
};

const loadAllTuitionHistory = (tuition_id) => {
    const parent_no_tutor_found = document.getElementById("no-tutor-found");
    const parent_tutor_found = document.getElementById("tutor-found");

    fetch(`http://127.0.0.1:8000/tuition_history/list/?tuition_id=${tuition_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Tuition History Data:", data);  // Log the response to debug
            if (data.length == 0) {
                parent_tutor_found.innerHTML = '';
                const no_data_text = document.createElement("div");
                no_data_text.innerHTML = `
                    <h3 class="text-center text-danger">No Tutor Found!</h3>
                `;
                parent_no_tutor_found.appendChild(no_data_text);
            } else {
                parent_no_tutor_found.innerHTML = '';
                const no_data_text = document.createElement("div");
                no_data_text.innerHTML = `
                    <h5 class="text-center text-danger mb-2">Total Tutor Found : ${data.length}</h5>
                `;
                parent_tutor_found.appendChild(no_data_text);

                data.forEach(element => {
                    console.log("Tuition History Element:", element);  // Debug the element data
                    loadUserID(element, element.status, element.id);
                });
            }
        })
        .catch(error => console.error("Error loading tutors:", error));
};

const loadUserID = (data, status, tuition_history_id) => {
    fetch(`http://127.0.0.1:8000/users/list/${data.user}/`)
        .then((res) => res.json())
        .then((user_data) => {
            console.log("User Data Loaded:", user_data);  // Debug user data
            displayUserHistory(user_data, status, tuition_history_id);
        })
        .catch(error => console.error("Error loading user data:", error));
};

const displayUserHistory = (data, tuition_status, tuition_history_id) => {
    const parent = document.getElementById("tuition-history-data");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <th scope="row">${data.id}</th>
        <th>${data.user}</th>
        <td>${data.educational_institute}</td>
        <td>${data.location}</td>
        <td>${data.gender}</td>
        <td>
            <button type="button" class="btn ${tuition_status === "Pending" ? 'btn-primary' : 'btn-success'}" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    onclick="assign_tuition_history(${tuition_history_id})">
                ${tuition_status}
            </button>
        </td>
    `;
    
    parent.appendChild(tr);
};

const assign_tuition_history = (id) => {
    tuition_history_id_global = id;
    console.log("Assigned tuition_history_id_global:", tuition_history_id_global);  // Debug assignment
};

document.getElementById('submitStatus').addEventListener("click", function(event) {
    updateTutor(tuition_history_id_global);
});

const updateTuitionData = (id, updating_status) => {
    const token = localStorage.getItem('token');
    const postData = {
        have_tuitor: updating_status,
    };

    fetch(`http://127.0.0.1:8000/tuitions/tuiton/${id}/`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Updated Tuition Data:", data);  // Debugging response
    })
    .catch(error => console.error("Error updating tuition:", error));
};

const updateTuitionHistory = (id, status) => {
    const token = localStorage.getItem('token');
    const postData = {
        status: status
    };

    fetch(`http://127.0.0.1:8000/tuition_history/list/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData), 
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Updated Tuition History Data:", data);  // Debugging response
    })
    .catch(error => console.error("Error updating tuition history:", error));
};

const updateTutor = (tuition_history_id) => {
    if (!tuition_history_id) {
        console.error("No tuition history ID is set. Aborting the update process.");
        alert("Please select a tutor before updating.");
        return;
    }

    const param = new URLSearchParams(window.location.search).get("tuition_id");
    console.log("Tuition ID from URL:", param);
    console.log("Selected Tuition History ID:", tuition_history_id);

    let selectedValue = null;
    const ele = document.getElementsByName('status');
    
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            selectedValue = ele[i].value;
            break;
        }
    }

    if (!selectedValue) {
        console.log("No status selected.");
        alert("Please select a status to update.");
        return;
    }

    if (selectedValue === "Pending") {
        // Update the tutor status to "Pending"
        updateTuitionHistory(tuition_history_id, "Pending");
    } else if (selectedValue === "Selected") {
        // Update the tutor status to "Selected"
        fetch(`http://127.0.0.1:8000/tuitions/tuiton/${param}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Tuition Data:", data);
                updateTuitionHistory(tuition_history_id, "Selected");
            })
            .catch(error => console.error("Error during tutor selection:", error));
    }

    alert("Status updated successfully!");
    window.location.reload();  // Optionally reload the page after update
};

// change password
const changePassword = (event) =>{
    event.preventDefault();
    console.log("Inside Pass change function")
  
    const form = document.getElementById("change-pass-container")
    const formData = new FormData(form)
  
    const old_pass = formData.get("old_pass")
    const new_pass = formData.get("new_pass")

    console.log(old_pass, new_pass)
  
    const parent = document.getElementById("message") // div where I will display my messages
  
    if (old_pass === new_pass){
      parent.innerHTML = `
        <div class="alert alert-danger " role="alert">        
          <p class="text-center fw-bold"><i class="fa-solid fa-circle-exclamation"></i> Old Password and New Passwords Can't be Same!</p>
        </div>
      `
    }
    else{
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(new_pass) && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(old_pass)){

        const user_id = localStorage.getItem("user_id")
        const token = localStorage.getItem("token")

        const postData = {
            password : old_pass,
            new_password : new_pass,
            user_id : user_id
        }

        fetch(`https://final-exam-tuition-media-64an.vercel.app/users/change_password/`, {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body : JSON.stringify(postData)
        })

        .then(response => {
          if (!response.ok) {
              throw new Error('Password change failed');
          }
          return response.json();
        })

        .then(data => {
          console.log(data.message);
          alert('Password changed successfully');
        })
        
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to change password. Please check your inputs.');
        });
  
        
      }
      else{
        parent.innerHTML = `
          <div class="alert alert-danger " role="alert">        
            <p class="text-center fw-bold"><i class="fa-solid fa-circle-exclamation"></i> Password must contain 8 characters, at least one letter (A-Z, a-z), one number(0-9) and one special character (@,#,$,% etc)</p>
          </div>
        `
      } 
    }
  
    // console.log(postData.old_pass)
  }
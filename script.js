let row = null;

// show alerts
const showAlerts =(msg,className)=>{
      const div = document.createElement("div");
      div.className =`alert alert-${className}`
      div.appendChild(document.createTextNode(msg));
      const container = document.querySelector(".container");
      const main = document.querySelector(".main");
      container.insertBefore(div,main);

      setTimeout(()=> document.querySelector(".alert").remove(),3000);

}

// clear fields
const clearFields =()=>{
    document.querySelector("#fullName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#birth").value = "" ;
    document.querySelector("#gender").value = "" ;
    document.querySelector("#hobby").value = "" ;
    document.querySelector("#country").value = "" ;
    document.querySelector("#state").value = "" ;
    document.querySelector("#city").value = "" ;
}

// Add data on the table
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();

//    get form values first
  const fullName = document.querySelector("#fullName").value;
  const email = document.querySelector("#email").value;
  const birth = document.querySelector("#birth").value ;
  const gender = document.querySelector("#gender").value ;
  const hobby = document.querySelector("#hobby").value ;
  const country = document.querySelector("#country").value ;
  const state = document.querySelector("#state").value ;
  const city = document.querySelector("#city").value ;

    // form values Validate
    if( fullName == "" || email == "" || birth == "" || gender == "" || hobby == "" || country == "" || state == "" || city == ""){
       showAlerts("Please fill out the form first!", "warning");
    }else{
        if(row === null){
            const list = document.querySelector(".student-list");
            const showRow = document.createElement("tr");
            showRow.innerHTML = `
               <td>${fullName}</td>
               <td>${email}</td>
               <td>${birth}</td>
               <td>${gender}</td>
               <td>${hobby}</td>
               <td>${country}</td>
               <td>${state}</td>
               <td>${city}</td>
               <td>
               <a href="#" class="btn btn-primary btn-sm m-1 edit">Edit</a>
               <a href="#" class="btn btn-danger btn-sm m-1 delete">Delete</a>
               </td>
            `;
            list.appendChild(showRow);
            row = null;
            showAlerts("Successfully, Student Added!", "success");
        }else{
           row.children[0].textContent = fullName;
           row.children[1].textContent = email;
           row.children[2].textContent = birth;
           row.children[3].textContent = gender;
           row.children[4].textContent = hobby;
           row.children[5].textContent = country;
           row.children[6].textContent = state;
           row.children[7].textContent = city;
           row = null;
           showAlerts("Students Info Edited", "primary")
        }
        clearFields();
    }

})

// Edit Data

document.querySelector(".student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        row = target.parentElement.parentElement;


        document.querySelector("#fullName").value = row.children[0].textContent ;
        document.querySelector("#email").value = row.children[1].textContent ;
        document.querySelector("#birth").value  = row.children[2].textContent ;
        document.querySelector("#gender").value  = row.children[3].textContent ;
        document.querySelector("#hobby").value  = row.children[4].textContent ;
        document.querySelector("#country").value  = row.children[5].textContent ;
        document.querySelector("#state").value  = row.children[6].textContent ;
        document.querySelector("#city").value  = row.children[7].textContent ;
    }
});

// Delete Data

document.querySelector(".student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlerts("Student Removed!","danger")
    }
});
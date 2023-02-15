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
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#idNumber").value = "" ;
}

// Add data on the table
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();

//    get form values first
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const idNumber = document.querySelector("#idNumber").value;

    // form values Validate
    if( firstName == "" || lastName == "" || idNumber == ""){
       showAlerts("Please fill out the form first!", "warning");
    }else{
        if(row === null){
            const list = document.querySelector(".student-list");
            const showRow = document.createElement("tr");
            showRow.innerHTML = `
               <td>${firstName}</td>
               <td>${lastName}</td>
               <td>${idNumber}</td>
               <td>
               <a href="#" class="btn btn-primary btn-sm m-1 edit">Edit</a>
               <a href="#" class="btn btn-danger btn-sm m-1 delete">Delete</a>
               </td>
            `;
            list.appendChild(showRow);
            row = null;
            showAlerts("Successfully, Student Added!", "success");
        }else{
           row.children[0].textContent = firstName;
           row.children[1].textContent = lastName;
           row.children[2].textContent = idNumber;
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
        
        document.querySelector("#firstName").value = row.children[0].textContent;
        
        document.querySelector("#lastName").value = row.children[1].textContent;
        
        document.querySelector("#idNumber").value = row.children[2].textContent;
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
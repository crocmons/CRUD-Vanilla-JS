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

    // dropdown filter
    
    const getUniqueValuesfromColumn = ()=>{
       let uniqueColDict = {}
      allFilters = document.querySelectorAll(".table-filter")
      allFilters.forEach(filterIndex => {
          col_index = filterIndex.parentElement.getAttribute("col-index");
        //   alert(col_index)
         const rowsCol = document.querySelectorAll(" #tableFilter > tbody > tr ")
        rowsCol.forEach((rows)=>{
          cell_value = rows.querySelector("td:nth-child("+col_index+")").innerHTML;
          
          if(col_index in uniqueColDict){
            
            if(uniqueColDict[col_index].includes(cell_value)){
                // alert(cell_value + "is Already present in the array!" + uniqueColDict[col_index])
            }else{
              uniqueColDict[col_index].push(cell_value)
            //   alert("After adding the cell value :" + uniqueColDict[col_index])
            }
    
    
    
          }else{
            uniqueColDict[col_index] = new Array(cell_value)
          }
    
    
        })
      });
    
      for ( i in uniqueColDict) {
        // alert(`column index: ${i} has unique values: /n ${uniqueColDict[i]}`)
      }
    
      updateSelectedOptions(uniqueColDict);
    
    };
    
    const updateSelectedOptions =(uniqueColDict)=>{
        allFilters = document.querySelectorAll(".table-filter")
        allFilters.forEach(filterIndex => {
            col_index = filterIndex.parentElement.getAttribute("col-index");
            uniqueColDict[col_index].forEach((i)=>{
                filterIndex.innerHTML = filterIndex.innerHTML += `/n<option value=${i}>${i}</option>`
            })
        })
    
    };
    
    window.onload = ()=>{
       console.log(document.querySelector("#tableFilter > tbody > tr:nth-child(1) > td:nth-child(7)").innerHTML)
       getUniqueValuesfromColumn();
    };
    
    // create filter_rows function
    
    // filterValue_dict ={6:Value selected,7:value,8:value}
    
    function filterRows (){
        allFilters = document.querySelectorAll(".table-filter")
        let filterValue_dict ={};
    
        allFilters.forEach((filterIndex)=>{
           col_index = filterIndex.parentElement.getAttribute("col-index")
    
           value = filterIndex.value
           
           if(value !== "all"){
               filterValue_dict[col_index] = value; 
           }
        });
    
        var colCellValueDict = {};
        const rowsValue = document.querySelectorAll("#tableFilter tbody tr");
        rowsValue.forEach((row)=>{
            var displayRow = true;
            allFilters.forEach((filterIndex)=>{
                col_index = filterIndex.parentElement.getAttribute("col-index")

                colCellValueDict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
            })
    
            for (var col_i in filterValue_dict) {
                filter_value = filterValue_dict[col_i]
                rowCell_value = colCellValueDict[col_i]
    
                if(rowCell_value.indexOf(filter_value) == -1 && filter_value !== "all"){
                    displayRow = false;
                    break;
                }
            }
    
            if(displayRow === true){
                row.style.display = ""
            }else{
                row.style.display = "none"
            }
        })
    
    
    }
    
    
    
    
    
    
    // {6:[], 7:[], 8:[]}
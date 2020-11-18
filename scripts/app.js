// Add Candidate
let candidate_form=document.querySelector(".add-candidate");
let body=document.body;
body.addEventListener("click",function(e){
   if(e.target.classList.contains("add")==true){
       console.log(e)
       let candidates =[];
       
       let candidate ={
         
           fname : document.getElementById('first-name').value,
           lname : document.getElementById('last-name').value,
           company : document.getElementById('company').value,
           lpa : document.getElementById('package').value

       }
       console.log(this.fname);
       candidates.push(candidate);
       console.log(candidates);
    //    console.log("add")
       let div = document.createElement("div");
       console.log("remove");
       let form =` <section class="add-member center">
           <form id="add-candidate">
           <div class="form-row mt-3 ml-3">
             <div class="form-group col-md-4">
               <label for="inputEmail4">First Name</label>
               <input type="text" class="form-control" id="first-name" placeholder="First Name">
             </div>
             <div class="form-group col-md-4">
               <label for="inputPassword4">Last Name</label>
               <input type="text" class="form-control" id="last-name" placeholder="Last Name">
             </div>
           </div>
           <div class="form-row ml-3">
               <div class="form-group col-md-4">
                 <label for="inputEmail4">Comapny</label>
                 <input type="text" class="form-control" id="company" placeholder="Comapny">
               </div>
               <div class="form-group col-md-4">
                 <label for="inputPassword4">Annual Package</label>
                 <input type="text" class="form-control" id="package" placeholder="Annual Package">
               </div>
             </div>
       
             <div class="form-row ml-3">
               <div class="form-group col-md-4">
                   <label for="exampleFormControlFile1">Upload Candidate Photo</label>
                   <input type="file" class="form-control-file" id="photo">
               </div>
             </div>
         </form>
         <button type="button" class="btn btn-primary ml-3 add" id="addButton">Add Candidate</button>
         <button type="submit" class="btn btn-danger ml-3">Remove Candidate</button>
         </section>`
       //  console.log("dsds")
       div.innerHTML = form;
       candidate_form.appendChild(div);
    //    console.log("adda")
       }
})

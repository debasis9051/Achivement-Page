let body = document.body;
body.addEventListener("click",function(e){
    // Add Candidate
    let candidate_form = document.querySelector(".add-candidate");
    if(e.target.classList.contains("add")==true)
    {
        let div = document.createElement("div");
        let form =` <section class="add-member center">
                      <form id="add-candidate-form">

                        <div class="form-row mt-3 ml-3">
                          <div class="col-md-2"></div>
                          <div class="form-group col-md-4">
                            <label for="inputEmail4">First Name</label>
                            <input type="text" class="form-control" id="first-name" placeholder="First Name">
                          </div>
                          <div class="form-group col-md-4">
                            <label for="inputPassword4">Last Name</label>
                            <input type="text" class="form-control" id="last-name" placeholder="Last Name">
                          </div>
                          <div class="col-md-2"></div>
                        </div>

                        <div class="form-row ml-3">
                          <div class="col-md-2"></div>
                          <div class="form-group col-md-4">
                            <label for="inputEmail4">Year</label>
                            <input type="number" class="form-control" id="year" placeholder="Year">
                          </div>
                          <div class="form-group col-md-4">
                            <label for="inputPassword4">Stream</label>
                            <input type="text" class="form-control" id="stream" placeholder="Stream">
                          </div>
                          <div class="col-md-2"></div>
                        </div>

                        <div class="form-row ml-3">
                          <div class="col-md-2"></div>
                          <div class="form-group col-md-4">
                              <label for="exampleFormControlFile1">Upload Candidate Photo</label>
                              <input type="file" class="form-control-file" id="photo" accept="image/*">
                          </div>
                          <div class="form-group col-md-4">
                            <label for="inputPassword4">Annual Package</label>
                            <input type="text" class="form-control" id="package" placeholder="Annual Package">
                          </div>
                          <div class="col-md-2"></div>
                        </div>
                      </form>
                        <div class="form-row ml-3">
                          <div class="col-md-2"></div>
                          <div class="col-md-4">
                            <button type="button" class="btn btn-primary add" >Add Candidate</button>
                            <button type="submit" class="btn btn-danger remove">Remove Candidate</button>
                          </div>
                          <div class="col-md-6"></div>
                        </div>
                    </section> `

       div.innerHTML = form;
       candidate_form.appendChild(div);
    }

    //Remove Candidate
    if(e.target.classList.contains("remove")==true)
    {
        let curr_sec = e.target.parentElement.parentElement.parentElement
        curr_sec.remove()
    }

})

//Generate Button
document.getElementById("generate").onclick= function()
{
    let elemArr = document.querySelectorAll(".add-member")
    console.log(elemArr)

    let candidates_company = document.getElementById("company").value

    let candidates =[]
    for(let i=0;i<elemArr.length;i++)
    {
      let k=0
      if(i==0)
        k=1;

      let candidate ={
          fname : elemArr[i].firstElementChild[0+k].value,
          lname : elemArr[i].firstElementChild[1+k].value,
          year : elemArr[i].firstElementChild[2+k].value,
          stream : elemArr[i].firstElementChild[3+k].value,
          file_link : elemArr[i].firstElementChild[4+k].value,
          a_pack : elemArr[i].firstElementChild[5+k].value
      }
      candidates.push(candidate)     
    } 
    
    //DATA INPUTS
    // console.log(candidates_company)
    // for(let i=0;i<candidates.length;i++)
    // {
    //     console.log(candidates[i].fname)
    //     console.log(candidates[i].lname)
    //     console.log(candidates[i].year)
    //     console.log(candidates[i].stream)
    //     console.log(candidates[i].file_link)
    //     console.log(candidates[i].a_pack)
    //     console.log(" ")
    // } 
    

    //MAKING THE PDF WITH JSPDF
    let doc = new jsPDF()

    // let width = doc.internal.pageSize.getWidth();
    // let height = doc.internal.pageSize.getHeight();

    // doc.rect(0, 0, width, height)
    doc.setFillColor(60, 179, 113)
    doc.rect(0, 0, 300, 300, 'FD')

    let x=25
    let y=40
    let offsetx=60
    let offsety=100
    let opt={align: 'center'}

    // doc.addImage(imgData, 'JPEG', 50, 10, 110, 10)

    doc.setFontSize(20)
    doc.text(candidates_company, 80, 30)

    doc.setFontSize(15)
    for(let i=0;i<2;i++)
    {
        for(let j=0;j<3;j++)
        {
        // doc.addImage(imgData, 'JPEG', x+offsetx*j, y+offsety*i, 40, 40)
        doc.text(candidates[0].fname+' '+candidates[0].lname, x-5+offsetx*j, y+50+offsety*i, opt)
        doc.text('Stream '+'Year', x+5+offsetx*j, y+60+offsety*i, opt)
        doc.text('AnnualPackage', x+2+offsetx*j, y+70+offsety*i, opt)
        }
    }

    // doc.save("Sample pdf")
    window.open(doc.output('bloburl'))

}

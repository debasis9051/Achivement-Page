document.getElementById("generate").onclick = function() 
{
    let name = document.getElementById("name").value
    let image = []
    image.push(document.getElementById("image1").files[0])
    image.push(document.getElementById("image2").files[0])

    console.log(name)
    console.log(image)

    makeit(name,image)
}

function makeit(name, image)
{
    let doc = new jsPDF()

    doc.text(name, 50, 50)
    readmultifiles(image)

    function readmultifiles(image)
    {
        var reader = new FileReader();  

        function readFile(index)
        {
          if(index>= image.length) 
          {
            window.open(doc.output('bloburl'))
            return;
          }

          var file = image[index];
          reader.onload = function(e)
          {   
            var bin = e.target.result;
            // do sth with bin
            doc.addImage(bin, "JPG", 50, 100+(index*100))
            readFile(index+1)
          }
          reader.readAsBinaryString(file)
        }

        readFile(0)
    }

    // doc.addImage(msg, "JPG", 50, 100)
}

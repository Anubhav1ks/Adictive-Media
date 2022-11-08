(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()




  const Searching = () => {
    let filter = document.getElementById('input').value.toUpperCase();
    let myTable = document.getElementById('country');
    let tr = myTable.getElementsByTagName('option');

    for(var i=0; i<tr.length; i++)
    {
        // let td = tr[i].getElementsByTagName('td')[0];
        // console.log(i);
        if(tr[i]){
            // console.log(i);
            let textValue = tr[i].value || tr[i].value;
            console.log(textValue);
            if(textValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            }
           
            else{
                tr[i].style.display = "None";
            }
        }
    }
}

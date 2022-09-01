
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
function showTab(n) {
  
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Calculate the Cost";
  }

  
  // fixStepIndicator(n)
}
function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");

//   local storage storage
  var salary = document.getElementById("salary").value;
  //var button1 = document.getElementsByName("civil").value;
  var buttonfirst = document.querySelector('input[name="civil"]:checked');
  var loan = document.getElementById("loan").value;
  var month = document.getElementById("month").value;
  //var tick = document.getElementById("vehicle1").value;
//   console.log(salary);
//local storage
  localStorage.setItem("salary", salary);
  if(buttonfirst != null)
  {
    buttonfirst = buttonfirst.value; 

  //console.log(buttonfirst);
    localStorage.setItem("button1",buttonfirst);
  }
 // localStorage.setItem("button1",button1);
 // localStorage.setItem("button2",button2);
  localStorage.setItem("loan",loan);
  localStorage.setItem("month",month);
  localStorage.setItem("tick",tick);
// get loaclstorage value from 2
     var salaryGet = localStorage.getItem("salary");
     var buttonGet =  localStorage.getItem("button1");
     
     var loan =  localStorage.getItem("loan");
     var month =  localStorage.getItem("month");
     //var tick =  localStorage.getItem("tick");
    document.getElementById("salary2").value = salaryGet;
    //document.getElementById("button2").value = buttonGet;
    document.querySelector("input[name=radiobutton2][value="+buttonGet+"]").checked = true;
    document.getElementById("loan2").value = loan;
    document.getElementById("month2").value = month;
    //document.getElementById("vehicle2").value = tick;

    // document.getElementById("employer").innerHTML = button1;

    // get localStorage value from 3
    document.getElementById("salary3").value = salaryGet;
    //document.getElementById("button5").value = buttonGet;
    document.querySelector("input[name=radiobutton3][value="+buttonGet+"]").checked = true;
    document.getElementById("loan3").value = loan;
    document.getElementById("month3").value = month;
    
    //document.getElementById("vehicle3").value = tick;

  // Exit the f
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase o
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ...  submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  if(currentTab == 3){
    fetchbanksList();
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
function validateForm() {
  
  var x, y,i,valid = true;
  var radionValidation = false;

  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  // radio button validate 
  //z = x[currentTab].getElementsByClassName("val");
  // A loop that checks every input field in the current tab:
  //All input
  for (let i = 0; i < y.length; i++) {
    //  empty...
    if (y[i].value == "") {
      y[i].className += "invalid";
      // console.log(y[i].classList.contains('rad'))
      valid = false;
    }
    //radio button valusation
    if(y[i].classList.contains('rad')){
      if(y[i].checked){
        radionValidation = true;
        
      } 
    }
    
  }
  if(!radionValidation){
    document.getElementById('rd').innerHTML =" ** employer field reuired";
    valid = false;
  }
  else{
    document.getElementById('rd').innerHTML ="";
  } 
  
  //checkbox validation
  if(!document.getElementById('vehicle1').checked){
    document.getElementById('tick').innerHTML =" ** checkbox required";
    valid = false;
  }
  else{
    document.getElementById('tick').innerHTML ="";
  }
  
  // console.log(radioValid)
  // If the valid status is true, mark the step as finished and valid:
  if (valid && radionValidation) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
//fetch data


var banks_list;
let http = new XMLHttpRequest();
var url = "data.json";
http.open('GET',url,true);
http.send();
http.addEventListener('load',function(){
  banks_list = JSON.parse(this.responseText); 
});


function fetchbanksList(){
  var loan = document.getElementById("loanamount").value;
  console.log("loan",loan);
    var fetchbanks = banks_list.data.Banks.filter((value) => {
      //console.log("value.loanstart",value.loanstart);
      //console.log("value.loanEnd",value.loanEnd);
      //console.log("loan",loan);

      if(loan >= value.loanstart  && loan <= value.loanEnd){
        //console.log("sdfds");
        return value;
      }
 
    })
    output = "";
    for (let item of fetchbanks){
      output+=`
      
          <div class="col-md-4">
            <img src="index.png" class="img-fluid rounded-start" alt="...">
        </div>
          <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <h5 class="card-title">${item.intreset}%</h5>
                <p class="card-text">Anunal Profit Margin</p>
                <h5 class="card-title">SAR 14,676.91</h5>
                <p class="card-text"> Monthly Instalment</p>
                <h5 class="card-title">SAR ${loan}</h5>
                <p class="card-text"> Net Fancing Amount</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      
                                                `
}
    // console.log("fetch_banks",fetch_banks);
    document.querySelector(".products").innerHTML = output;
}
 
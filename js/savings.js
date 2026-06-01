async function depositSavings() {

const data = {

memberNumber:
document.getElementById("memberNumber").value,

amount:
document.getElementById("amount").value,

paymentMode:
document.getElementById("paymentMode").value,

remarks:
document.getElementById("remarks").value

};

try {

const response =
await fetch(API_BASE_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"depositSavings",

data:data

})

});

const result =
await response.json();

if(result.status==="success"){

alert(
"Deposit Successful"
);

document.getElementById("result").innerHTML=

"New Balance : ₹" +
result.balance;

}else{

alert(result.message);

}

}catch(err){

alert(err);

}

}

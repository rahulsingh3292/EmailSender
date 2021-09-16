
$("#alert_msg").hide();
$("#sendMail").attr({"disabled":true})
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function button(type){
  
  if (type == "enable"){
    $("#sendMail").attr({"disabled":false})
 
  } else {
       $("#sendMail").attr({"disabled":true})
  }
}



$(".email").keyup(function(){
  if(validateEmail(this.value)){
    button("enable")
    $(this).removeClass("text-danger").addClass("text-success");
  } else{
    button("disable")
    $(this).removeClass("text-success").addClass("text-danger");
  }
 
})


$("#sendMail").click(function(){
  
  let to = $("#sendTo").val();
  let from = $("#from").val();
  let subject = $("#subject").val();
  let body = $("#body").val();
  let emailData ={
    "to":to, "from":from, "subject":subject, "body":body
  }
  if(to == ""){
      $("#alert_msg").attr({"class":"alert alert-danger"}).text("Please Enter email where you want to send..")
    $("#alert_msg").show();
    return
  }
  if(body == ""){
    $("#alert_msg").attr({"class":"alert alert-danger"}).text("Message Body can't Be Empty.. ")
    $("#alert_msg").show();
    return 
  }
  
  $("#alert_msg").attr({"class":"alert alert-info"}).text("Sending Mail....")
  
    $.ajax({
    url : "/send/mail/",
    method : "POST",
    data : emailData,
    success : function(data){
      $("#alert_msg").attr({"class":"alert alert-success"}).text("Email Sent Successfully..")
    }
  })

  
})
  


// set up global URLs  
var login_url = "http://clinic.evocare.co/api/authenticate";
var register_url = "http://clinic.evocare.co/api/register";
var patientList_url = "http://clinic.evocare.co/api/list_patients";
var patientTriageHistory_url = "http://clinic.evocare.co/api/patient_triage_history";
var crateNewTriage_url = "http://clinic.evocare.co/api/create_triage";
var onboard_url = "http://clinic.evocare.co/api/onboard_patient"


var api_key = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    document.addEventListener("backbutton", function(e)
    {

       if($.mobile.activePage.is('#login_page'))
       {
        e.preventDefault();
        navigator.app.exitApp();
       }

       if($.mobile.activePage.is('#triage_page'))
       {
        console.log('reset triage page');
        navigator.app.backHistory();
        resetTriagePage();
       }
      if($.mobile.activePage.is('#checklist_page'))
       {
        console.log('reset checklist page');
        resetChecklistPage();
        navigator.app.backHistory();
       }


       if($.mobile.activePage.is('#vc_page'))
       {
        console.log('reset triage page');
        navigator.app.backHistory();
        resetVCPage();
       }

       if($.mobile.activePage.is('#onborading_page'))
       {
        resetOnBoardingPage();
        getPatientList("patients_page"); 
       }
       else 
       {
        navigator.app.backHistory();
       }
    }, false);

    
}


function resetTriagePage()
{
  $("#triage_form").trigger('reset'); 
  $('#triage_slide .carousel-inner .item').removeClass('active')
  $('#triage_slide .carousel-inner .item:first').addClass('active');
  $('#triage_slide .carousel_controls .right').text("CONTINUE");
  $('#triage_slide .carousel_controls .save_note').hide();
  $('#triage_slide .carousel_controls .right').show();
  $('#treatement_date').val();
  $('#blood_last_date').val('');
}

function resetOnBoardingPage()
{
  $('#onboarding_form').trigger('reset'); 
  $('#onboarding_birthday').val('');
  var image = document.getElementById("onboarding_avatar");
  image.src = "img/ChooseAvatar.png";
}


function resetChecklistPage(){  
  $("#triage_form").trigger('reset'); 
  $('#checklist_slide .carousel-inner .item').removeClass('active')
  $('#checklist_slide .carousel-inner .item:first').addClass('active');
  $('#checklist_slide .carousel_controls .add_btn').hide();
  $('#checklist_slide .carousel_controls .save_btn').hide();
  $('#checklist_slide .carousel_controls .right').show("CONTINUE");
}

function resetVCPage()
{
  $('#vc_form').trigger('reset');
  $('#vc_slide .carousel-inner .item').removeClass('active')
  $('#vc_slide .carousel-inner .item:first').addClass('active');
  $('#vc_treatment_last_date').val('');
  $('#vc_blood_last_date').val('');
}




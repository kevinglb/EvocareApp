
// set up global URLs  
var login_url = "http://clinic.evocare.co/api/authenticate";
var register_url = "http://clinic.evocare.co/api/register";
var patientList_url = "http://clinic.evocare.co/api/list_patients";
var patientTriageHistory_url = "http://clinic.evocare.co/api/patient_triage_history";
var crateNewTriage_url = "http://clinic.evocare.co/api/create_triage";
var onboard_url = "http://clinic.evocare.co/api/onboard_patient"
var sendConsultant_url = "http://clinic.evocare.co/api/send_memo";
var getevents_url = "http://clinic.evocare.co/api/get_calendar_events"; 
var api_key = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    document.addEventListener("backbutton", function(e)
    {

      if($.mobile.activePage.is('#login_page')){
        e.preventDefault();
        navigator.app.exitApp();
      }
      else if($.mobile.activePage.is('#triage_page')){
        console.log('reset triage page');
        navigator.app.backHistory();
        resetTriagePage();
      }
      else if($.mobile.activePage.is('#checklist_page')){
        console.log('reset checklist page');
        
        navigator.app.backHistory();
        resetChecklistPage();
      }
      else if($.mobile.activePage.is('#vc_page')){
        console.log('reset triage page');
        navigator.app.backHistory();
        resetVCPage();
      }
      if($.mobile.activePage.is('#scheduler_page')){
        console.log('reset triage page');
        //navigator.app.backHistory();
        resetSchedulerPage();
      } 
      if($.mobile.activePage.is('#onborading_page')){
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
  $('#triage_slide').carousel(0);
  $('#triage_slide .carousel_controls .right').text("CONTINUE");
  $('#triage_slide .carousel_controls .save_note').hide();
  $('#triage_slide .carousel_controls .right').show();
  $('#treatement_date').val();
  $('#blood_last_date').val('');
  $('#triage_pie_chart .pie_chart_text').text('0%');
  $('#triage_slide .carousel_controls .right').text('Continue').show();
  $('#triage_slide .carousel_controls .save_note').hide();
  showPercentDonut('#triage_pie_chart',0);
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
  $('#checklist_slide').carousel(0);
  $('#checklist_slide .carousel_controls .add_btn').hide();
  $('#checklist_slide .carousel_controls .save_btn').hide();
  $('#checklist_slide .carousel_controls .right').show("CONTINUE");
}

function resetVCPage()
{
  $('#vc_form').trigger('reset');
  $('#vc_slide').carousel(0);
  $('#vc_treatment_last_date').val('');
  $('#vc_blood_last_date').val('');
  $('#vc_pie_chart .pie_chart_text').text('0%');
  $('#vc_slide .carousel_controls .right').text('Continue').show();
  $('#vc_slide .carousel_controls .save_note').hide();
  showPercentDonut('#vc_pie_chart',0);
}

function resetConsultantPage(){
  $("#consultant_page form").trigger('reset');
}

function resetSchedulerPage(){
  $('#schedule_slide').carousel(0);
}

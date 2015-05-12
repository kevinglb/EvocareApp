var patients_list;

function enterPatientTriage()
{
	// load patient list 
	getPatientList();
}

function getPatientList()
{
	$.ajax(
		{
    		url : patientList_url,
    		type: "POST",
    		data : {key: api_key},
    		dataType: 'json',
    		success: function(response)
    		{
    			if(response.status == "1")
    			{
                    patients_list = response.patients;

                    var output = "";

                    $.each(response.patients, function(index, value)
                    {
                        output += '<li class="patient" data-icon="false"><a id="' + value.id + '" onClick="SetUpTriagePage(this.id)"><div class="col-xs-3 patient_photo text-center"><img class="img-circle" src="' + value.avatar + '"></div><div class="col-xs-9 patient_info"><div class="row"><p class="patient_name">' + value.full_name + '</p></div><div class="row"><p class="patient_date">' + value.date_of_birth + '</p></div><div class="row"><p class="patient_issue">' +value.condition + '</p></div></div></a></li>';
                    });

                    $('#patient_list ul').first().html(output);

    				// navigate to patientlist page after updating
    				$.mobile.changePage("#patientlist_page", 
    				{
    					transition: "slide",
    					reverse: false,
   						changeHash: true
    				});
    			}
    			else
    			{
    				alert("Sorry, cannot load your patient list");
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, failed to load patient list. Please check your network and try again later");
    		}
		});
}


//load data and fill in the Triage Page
function SetUpTriagePage(patient_id)
{
    // get single patient info by id
    var single_patient = getSinglePatientInfo(patient_id);

    // set up patient info on triage page header
    var output = '<div class="col-xs-3 vertical-middle"><img src="' +single_patient.avatar + '" class="img-circle img-responsive"></div><div class="col-xs-9 vertical-middle"><div class="row"><span class="blod-text patient_name md-size">' + single_patient.full_name + '</span> <span class="light-text birth_date">' + single_patient.date_of_birth + '</span></div><div class="row"><span class="light-text disease_issue">' + single_patient.condition + '</span></div></div>';
    $('#triage_info').first().html(output);

    // get patient triage history
    $.ajax(
    {
        url : patientTriageHistory_url,
        type: "POST",
        data : {key: api_key, patient: patient_id},
        dataType: 'json',
        success: function(response)
        {
          if(response.status == "1")
          {
            setUpPatientTriageContent(response);
          }
          else
          {
            alert("Sorry, cannot load patient triage history");
          }
        },
        error: function (error)
        {
          alert("Sorry, failed to load patient triage history. Please check your network and try again later");
        }
    });


}

function setUpPatientTriageContent(response)
{
  var total_clinic_visits = response.total_clinic_visits;
  var total_patients = response.total;

  var total_trend = (total_clinic_visits/total_patients) * 100;

  // set up triage trend page
  $('#patient_contacts').text(total_patients);
  $('#clinic_visit').text(total_clinic_visits);

  showPercentDonut(total_trend);

  $.mobile.changePage("#triage_page", 
  {
    transition: "slide",
    reverse: false,
    changeHash: true
  });
}

function getSinglePatientInfo(patient_id)
{
    var i = null;
    for(i = 0; i<patients_list.length; i++)
    {  
        if(patients_list[i].id === patient_id)
        {
            return patients_list[i];
        }
    }
    return null;
}

function showPercentDonut(percent) 
{

    $("#pie_chart").empty();
    //console.log('after empty ');
    var width= 240;
    //console.log(width);
    var height = 240;
    var radius = Math.min(width, height) / 2;
    //console.log(radius);
    var dig = radius/6;
    var color = d3.scale.category20();
    var centerX =  radius;
    var centerY =  height/2;
    var center = [centerX, centerY];
    var dataset = {
        lower: [0, 100],
        upper: [percent, 100-percent]
      },
    
      pie = d3.layout.pie().sort(null),
      format = d3.format(".0%");

    var arc = d3.svg.arc()
        .innerRadius(radius - 2 - dig)
        .outerRadius(radius -5);

    var svg = d3.select("#pie_chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr('transform', 'translate(' + center[0] + ', ' + center[1] + ')');

    var path = svg.selectAll("path")
        .data(pie(dataset.lower))
        .enter().append("path")
        .attr('fill', function (d, i) { return color(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial values

    var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr('fill',"#000")
        .attr("font-size", "6vh")
        .attr("dy",".35em");

   if (typeof(percent) == "string")
   {
     text.text(percent);
   }
   else 
   {
     var progress = 0;
     var timeout = setTimeout(function ()
    {
       clearTimeout(timeout);
       path = path.data(pie(dataset.upper)); // update the data
       path.transition().duration(1200).attrTween("d", function (a) 
       {
         var i  = d3.interpolate(this._current, a);
         var i2 = d3.interpolate(progress, percent);
         this._current = i(0);
         return function(t) 
         {
           text.text( format(i2(t) / 100) );
           return arc(i(t));
        };
      }); // redraw the arcs
    }, 100);
  }
}

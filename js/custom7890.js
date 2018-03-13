//(Mo)For Checkout Validation
function isemptyvalue(name,message = 'value') {
  if($('#'+name).val().trim().length <= 0){
    $('#'+name).focus().addClass('has-danger');
    alert("Please Enter "+message);
    return true;
  }else{
     $('#'+name).removeClass('has-danger');
    return false;
  }
}

function isvalidemail(name,message="Valid Email")
{
  if (!($('#'+name).val()).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    $('#'+name).focus().addClass('has-danger');
    alert("Please Enter "+message);
    return true;
  }else{
    $('#'+name).removeClass('has-danger');
    return false;
  }
}
//check billing information
function isValidNumber(name,message="")
{
  var regexp = '';
  if(name=="Phone")
  {
    regexp = /^[0-9]{10}|[0-9]{8}$/;
  }
  else if(name=="CardNumber")
  {
    regexp = /^[0-9]{16}$/;
  }
  else if(name=="CVC")
  {
    regexp = /^[0-9]{3}$/;
  }
  else if(name=="ZipCode" || name=="bill_zip")
  {
    country_regexs = [];
    country_regexs['AU'] = /\d{4}/;
    country_regexs['CA'] = /(^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ]$)|(^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ]$)/i;
    country_regexs['GB'] = /(^[a-zA-Z]{1}[0-9]{1,2}$)|(^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$)/;
    country_regexs['US'] = /\d{5}([ \-]\d{4})?/;
    var element_id = "Country";
    if(name=="bill_zip")
    {
      element_id = "bill_country";
    }
    if(!isemptydropdownc(element_id))
    {
      country_selected = $("#"+element_id).val();
      regexp = country_regexs[country_selected];
    }

  }
// check
  if(regexp !== '')
  {
    if (!($('#'+name).val()).match(regexp)){
      alert("Please Enter Valid "+message);
      $('#'+name).focus().addClass('has-danger');
      return true;
    }else{
      $('#'+name).removeClass('has-danger');
      return false;
    }
  }
}
//Key Press
function onlynumberpressdot(name)
{
  $(document).on('keypress','#'+name,function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(charCode == 46 || charCode == 8 || charCode == 37 || charCode == 39 || charCode == 46){//For Delete ,BackSpace & Dot
      return true;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
  return true;
  });
}
function isemptydropdownc(name,message = 'Atlest One Value') {
  if($('#'+name).val().trim().length <= 0){
    $('#'+name).focus().addClass('has-danger');
    alert("Please Select "+message);
    return true;
  }else{
     $('#'+name).removeClass('has-danger');
    return false;
  }
}

function get_formated_date(date = '',plusoneday = false) {
  var monthNames = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
  var dateNames = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31");
  var today = new Date(date);
  if(plusoneday)
    today.setDate(today.getDate() + 1);
  var cDate = today.getDate();
  var cMonth = today.getMonth();
  var cYear = today.getFullYear();

  var cHour = today.getHours();
  var cMin = today.getMinutes();
  var cSec = today.getSeconds();
  return cYear+'/'+monthNames[cMonth]+'/'+ dateNames[cDate]+' '+cHour+':'+cMin+':'+cSec;
}

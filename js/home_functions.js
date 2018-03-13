/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);

// Pop Up Start
//setInterval(function() {
/*setTimeout(function() {
	$.ajax({
          type: 'GET', 
          url: baseurl+'Home/get_recent_order', 
          dataType: 'json',
          success: function (data) {
            console.log(data);
            if(data['status']){
              latest_order(data['message'])
            }
          }
      });
    
}, 6000); */
// Pop Up end

function latest_order(message) {
	$.notify({
		title: "<h4>Recent Purchase</h4> ",
		message: message
	},{// settings
		type: 'info',delay: 1000000,timer: 2000000,z_index: 9999,showProgressbar: false,
		placement: {
			from: "bottom",
			align: "left"
		},
		animate: {
			enter: 'animated bounceInUp',
			exit: 'animated bounceOutDown'
		},
	});
}

//On Click Go To Order Page With Quantity Select
/*$(document).ready(function() {
	$('input[type="radio"][name="qtyPicker"]').on('click', function () {
	    var qty = $(this).val();
	    window.location.href = baseurl+'order?qty='+qty;
	});
});*/

function initgif() {
var imgDefer = document.getElementsByTagName('img');
 for (var i=0; i<imgDefer.length; i++) {
  if(imgDefer[i].getAttribute('data-src')) {
   imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
  } 
 } 
}
// setTimeout(function(){
//  initgif();
// },1500);

window.addEventListener('load', function(){
  //initgif();
  $("[data-src]").unveil();
});

//Images Load After 5 Seconds
setTimeout(function(){
  /*$('#gif_img_one').html('<img src="'+gif_img_one+'">');
  $('#gif_img_two').html('<img src="'+gif_img_two+'">');*/
  // $('#gif_img_four').html('<img src="'+gif_img_four+'">');
},5000);
setTimeout(function(){
  $('#vid_img_iframe').html('<iframe width="640" height="360" src="https://fast.wistia.net/embed/iframe/kqjzgnhux0?autoPlay=0&amp;playerPreference=html5&amp;wmode=transparent" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" wmode="opaque"></iframe>');
  //<iframe src="https://fast.wistia.net/embed/iframe/idpgwl471d?autoPlay=0&amp;playerPreference=html5&amp;wmode=transparent" allowtransparency="true" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" wmode="opaque" id="fitvid459677" frameborder="0"></iframe>
},1000);

// Discount POP Up Start

$(document).on('mouseleave', leaveFromTop);
function leaveFromTop(e){
  if( e.clientY < 0 && IsViewPopUp) // less than 60px is close enough to the top
    $('#leaveFade').show();
}

//$('#leaveFade').show();
$(document).ready(function() {
  //document.getElementById('timeCount').innerHTML = 05 + " : " + 04;
  //startTimer();
  function startTimer() {
    var presentTime = document.getElementById('timeCount').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    document.getElementById('timeCount').innerHTML =
      m + ":" + s;
      if(m == 0 && s == 0){  /*$('#buttonC').attr('href');*/ $('#buttonC').attr('href','javascript:void(0);');  }
      else {setTimeout(startTimer, 1000);}
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }
  $('#leaveX').click(function() {
    $('#leaveFade').hide();
  });
});

// Header Timer
document.getElementById('hour').innerHTML = '00';
document.getElementById('minute').innerHTML = 30;
document.getElementById('second').innerHTML = 00;
startTimer1();

function startTimer1() {
  //var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = [document.getElementById('minute').innerHTML,document.getElementById('second').innerHTML];//presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
    if (m == 0)
      m = "00";
    document.getElementById('minute').innerHTML = m;
    document.getElementById('second').innerHTML = s;
    if(m != 00 || s != 00)
      setTimeout(startTimer1, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

$(document).ready(function() {
  var viewportWidth = $(window).width();
        if (viewportWidth <= 767) {
        $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        // console.log(scroll);
        if (scroll >= 890) {
          
            $("#GetUrl").addClass("sfilter-stick");
        } else {

          if (scroll <= 600) {
              $("#GetUrl").removeClass("sfilter-stick");
          }
      }
      });
    }

    loadStyles();
}); 

function loadStyles(){
  var styles = ['/assets/user/css/font-awesome.min.css', '/assets/plugins/my-style.css'];
  styles.forEach(function(s){
    var link = document.createElement('link');
    link.href = baseurl+s;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  })
}
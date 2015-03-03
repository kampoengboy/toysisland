
$(document).ready(function(){$('.carousel').carousel({interval:3000});

/* affix the navbar after scroll below header */
$('#nav').affix({
      offset: {
        top: $('header').height()-$('#nav').height()
      }
}); 

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav' })

/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top;
  $('body,html').animate({scrollTop:posi},700);
});


/* copy loaded thumbnails into carousel */
$('.panel .img-responsive').on('load', function() {
  
}).each(function(i) {
  if(this.complete) {
    var item = $('<div class="item"></div>');
    var itemDiv = $(this).parent('a');
    var title = $(this).parent('a').attr("title");
    
    item.attr("title",title);
    $(itemDiv.html()).appendTo(item);
    item.appendTo('#modalCarousel .carousel-inner'); 
    if (i==0){ // set first item active
     item.addClass('active');
    }
  }
});

/* activate the carousel */
$('#modalCarousel').carousel({interval:false});

/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {
  $('.modal-title').html($(this).find('.active').attr("title"));
})

/* when clicking a thumbnail */
$('.panel-thumbnail>a').click(function(e){
  
    e.preventDefault();
    var idx = $(this).parents('.panel').parent().index();
    var id = parseInt(idx);
    
    $('#myModal').modal('show'); // show the modal
    $('#modalCarousel').carousel(id); // slide carousel to selected
    return false;
});





/* google maps */
google.maps.visualRefresh = true;

var map;
function initialize() {
    var geocoder = new google.maps.Geocoder();
    var address = $('#map-input').text(); /* change the map-input to your address */
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                {
                  content: address,
                  map: map,
                  position: results[0].geometry.location,
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title:address
            }); 

          } else {
            alert("No results found");
          }
        }
      });
    }
}
google.maps.event.addDomListener(window, 'load', initialize);

/* end google maps */


});

$(function() {

    $("input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            var email = $("input#email").val(); 
            if(email.substring(email.length-4)!='.com')
            {   
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Upss... Email anda salah.. Mohon ditulis kembali....");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    //$('#contactForm').trigger("reset"); 
            }
            else 
            {
                    var name=$("input#name").val();
                    var organization = $("input#organization").val();
                    var phone = $("input#phone").val();
                    var comments = $("textarea#comments").val();
                    if(name.length==0 || organization.length==0 || phone.length==0 || comments.length==0)
                    {
                           $('#success').html("<div class='alert alert-danger'>");
                            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-danger').append("<strong>Harap mengisi form dengan lengkap...");
                            $('#success > .alert-danger').append('</div>');
                            //clear all fields
                            //$('#contactForm').trigger("reset");  
                    }
                    else
                    {
                            $.ajax({
                                url: "/user/sendemail",
                                type: "POST",
                                data: {
                                    email: email,
                                    name : name,
                                    organization : organization,
                                    comments : comments,
                                    phone:phone
                                },
                                success: function() {
                                    // Success message
                                    $('#success').html("<div class='alert alert-success'>");
                                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                        .append("</button>");
                                    $('#success > .alert-success')
                                        .append("<strong>Pesan anda sudah dikirim... Terima kasih.....</strong>");
                                    $('#success > .alert-success')
                                        .append('</div>');

                                    //clear all fields
                                    $('#contactForm').trigger("reset");
                                },
                                error: function() {
                                    // Fail message
                                    $('#success').html("<div class='alert alert-danger'>");
                                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                        .append("</button>");
                                    $('#success > .alert-danger').append("<strong>Uppsss.... Kami tidak bisa mengirimkan pesan anda.. Server kami mungkin sedang dalam masalah....");
                                    $('#success > .alert-danger').append('</div>');
                                    //clear all fields
                                    $('#contactForm').trigger("reset");
                                },
                            });
                    }
           }
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*var clock;

      $(document).ready(function() {

        // Grab the current date
        var currentDate = new Date();

        var futureDate  = new Date(currentDate.getFullYear(), 2, 1);

        // Calculate the difference in seconds between the future and current date
        var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

        // Instantiate a coutdown FlipClock
        clock = $('.clock').FlipClock(diff, {
          clockFace: 'DailyCounter',
          countdown: true
        });
      });*/
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
                    $('#contactForm').trigger("reset"); 
            }
            else 
            {
                    $.ajax({
                        url: "/user/sendemail",
                        type: "POST",
                        data: {
                            email: email
                        },
                        success: function() {
                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>Terima Kasih sudah mendaftar....</strong>");
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
                    })
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

var clock;

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
      });
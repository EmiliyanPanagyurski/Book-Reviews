class Validator{validateSignIn(){$("#signin-form").validate({rules:{email:{required:!0,email:!0},password:{required:!0,minlength:6}},highlight:function(e){$(e).closest(".control-group").removeClass("success").addClass("error")}})}validateSignUp(){$("#signup-form").validate({rules:{email:{required:!0,email:!0},password:{required:!0,minlength:6},confirmedPassword:{equalTo:"#password"},username:{required:!0,minlength:3}},highlight:function(e){$(e).closest(".control-group").removeClass("success").addClass("error")}})}validateReview(){$("#review-form").validate({rules:{title:{required:!0,minlength:5},bookTitle:{required:!0,minlength:5},content:{required:!0,minlength:100}},highlight:function(e){$(e).closest(".control-group").removeClass("success").addClass("error")}})}}const validator=new Validator;export{validator};
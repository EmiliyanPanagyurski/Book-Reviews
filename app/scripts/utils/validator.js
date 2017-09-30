class Validator {
    validateSignIn() {
        $('#signin-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                }
            },
            highlight: function (element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
        });
    }

    validateSignUp() {
        $('#signup-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                },
                confirmedPassword: {
                    equalTo: '#password',
                },
                username: {
                    required: true,
                    minlength: 3,
                }
            },
            highlight: function (element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
        });
    }

    validateReview() {
        $('#review-form').validate({
            rules: {
                title: {
                    required: true,
                    minlength: 10,
                },
                content: {
                    required: true,
                    minlength: 100,
                },
            },
            highlight: function (element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
        });
    }
}

const validator = new Validator();

export { validator };
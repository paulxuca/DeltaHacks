if (Meteor.isServer){
	Meteor.startup(function() {
    reCAPTCHA.config({
        privatekey: '6LfalhUTAAAAAEZ-_avEJTTbY587a3JInKS0Gh3d'
    });
});

    Meteor.methods({
    formSubmissionMethod: function(formData, captchaData) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

        if (!verifyCaptchaResponse.success) {
            console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
            throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
        } else
            console.log('reCAPTCHA verification passed!');
        return true;
    }
});


}
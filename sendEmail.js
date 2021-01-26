function sendEmail(from,  subject, body) {

    var urlTemplate =  "https://sites/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': ["user4@tenant.onmicrosoft.com"] },
                'Body': body,
                'Subject': subject
            }
        }
        ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert('Send mail:success')
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
        
}

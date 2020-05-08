var place = document.getElementById('emails-input');
var emailsInput = EmailsInput(place, {
    initialEmails: [ 'mail@mail.ru', 'pibcandrey777@gmail.com' ],
    domains: ['mail.ru', 'yandex.ru', 'uvas.su'],
});

var addRandomButton = document.getElementById('addRandom');
addRandomButton.onclick = function() {
    emailsInput.addRandom();
};

var getCountButton = document.getElementById('getCount');
getCountButton.onclick = function() {
    emailsInput.getCount();
};

var getAllEmails = document.getElementById('getAllEmails');
getAllEmails.onclick = function() {
    emailsInput.getAllEmails();
};

var replaceAllEmail = document.getElementById('replaceAllEmail');
replaceAllEmail.onclick = function() {
    emailsInput.replaceAllEmail();
};

function subscribeFn(emails) {
    var emailList = emails.map(function(email) {
        return email.email
    });
    alert(emailList);
}

var subscribeBtn = document.getElementById('subscribe');
subscribeBtn.onclick = function() {
    emailsInput.subscribe(subscribeFn);
};
var unsubscribeBtn = document.getElementById('unsubscribe');
unsubscribeBtn.onclick = function() {
    emailsInput.unsubscribe(subscribeFn);
};

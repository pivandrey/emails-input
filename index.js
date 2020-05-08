const place = document.getElementById('emails-input');
const emailsInput = EmailsInput(place, {
    initialEmails: [ 'mail@mail.ru', 'pibcandrey777@gmail.com' ],
    domains: ['mail.ru', 'yandex.ru', 'uvas.su'],
});

const addRandomButton = document.getElementById('addRandom');
addRandomButton.onclick = () => {
    emailsInput.addRandom();
};

const getCountButton = document.getElementById('getCount');
getCountButton.onclick = () => {
    emailsInput.getCount();
};

const getAllEmails = document.getElementById('getAllEmails');
getAllEmails.onclick = () => {
    emailsInput.getAllEmails();
};

const replaceAllEmail = document.getElementById('replaceAllEmail');
replaceAllEmail.onclick = () => {
    emailsInput.replaceAllEmail();
};

const subscribeFn = emails => {
    const emailList = emails.map(email => email.email);
    alert(emailList);
};

const subscribeBtn = document.getElementById('subscribe');
subscribeBtn.onclick = () => {
    emailsInput.subscribe(subscribeFn);
};
const unsubscribeBtn = document.getElementById('unsubscribe');
unsubscribeBtn.onclick = () => {
    emailsInput.unsubscribe(subscribeFn);
};

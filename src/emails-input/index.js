import { checkValid, checkValueForEmptyAndFormat } from './utils';
import { fixedDomains } from './constants';

import styles from './emailsinput.css';

class EmailsInputImpl {
    constructor(node, options = {}) {
        this.id = '_' + Math.random().toString(36).substr(2, 9);
        this.emails = [];
        this.options = options;
        this.node = node;
        this.observers = [];

        this.render(node);

    }


    render(node) {
        const root = this.initEmailInput();
        this.setStyleForNode();
        node.appendChild(root);
    }

    setStyleForNode() {
        const { width, height } = this.options;
        if (width) {
            this.node.style.width = typeof width === 'number' ? width + 'px' : width;
        }

        if (height && typeof height === 'number') {
            this.node.style.height = typeof height === 'number' ? height + 'px' : height;
        }
    }

    initEmailInput() {
        const root = document.createElement('div');
        root.className = styles.root;

        const input = document.createElement('input');
        input.className = styles.input;
        input.setAttribute('id', this.id);
        input.setAttribute('placeholder', 'add more people...');
        input.setAttribute('type', 'text');
        this.addInputHandlers(input);

        root.appendChild(input);
        this.addSeveralEmails(this.options.initialEmails, input);

        return root;
    }

    addSeveralEmails(emails, input) {
        if (emails && emails.length > 0) {
            emails.forEach(email => {
                const isValidEmail = checkValid(email);

                const emailTag = document.createElement('div');
                emailTag.className = `${styles.emailTag} ${!isValidEmail ? styles.emailTagNotValid : ''}`;

                const emailTagText = document.createElement('span');
                emailTagText.className = styles.emailTagText;
                emailTagText.innerText = email;

                const removeBtn = document.createElement('button');
                removeBtn.className = styles.removeBtn;
                removeBtn.insertAdjacentHTML('afterbegin', '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/></svg>')
                removeBtn.onclick = () => { this.removeEmail(emailTag, email) };

                emailTag.appendChild(emailTagText);
                emailTag.appendChild(removeBtn);

                input.parentNode.insertBefore(emailTag, input);

                this.emails.push({ email, isValid: isValidEmail });
            });
            this.broadcast();
        }
    }

    addInputHandlers(input) {
        input.onpaste = e => { this.checkPasteValue(e, input) };
        input.onblur = e => { this.createTag(e, input) };
        input.onkeyup = e => {
            if (e.which === 13 || e.which === 188) {
                this.createTag(e, input);
            }
        };
    }

    checkPasteValue(e, input) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');

        const formatedValue = checkValueForEmptyAndFormat(paste);
        if (!formatedValue) {
            return;
        }

        const emails = formatedValue.split(',');

        this.addSeveralEmails(emails, input);
        setTimeout(() => {
            this.clearInputValue(input);
        }, 0);
    }

    createTag(e, input) {
        const value = input.value.replace(',', '');

        const formatedValue = checkValueForEmptyAndFormat(value);
        if (!formatedValue) {
            return;
        }

        this.addSeveralEmails([formatedValue], input);
        this.clearInputValue(input);
    }

    removeEmail(emailTag, emailForDelete) {
        emailTag.parentNode.removeChild(emailTag);
        this.emails = [...this.emails].filter(item => item.email !== emailForDelete);
        this.broadcast();
    }

    clearInputValue(input = document.getElementById(this.id)) {
        input.value = '';
    }

    getCount() {
        const count = this.emails.filter(email => email.isValid).length;
        alert(`Count of valid emails: ${count}`);
    }

    getAllEmails() {
        console.log(this.emails);
        return this.emails;
    }

    replaceAllEmail() {
        const currentEmails = this.emails;
        const newEmails = [];
        const emailNodes = this.node.getElementsByClassName(styles.emailTag);
        for (let i = 0; i < currentEmails.length; i++) {
            const newEmail = this.generateRandomEmail();
            newEmails.push({ email: newEmail, isValid: true });
            const emailTag = emailNodes[i];
            emailTag.className = styles.emailTag;
            const emailTagText = emailTag.getElementsByTagName('span')[0];
            emailTagText.innerText = newEmail;
        }
        this.emails = newEmails;
        this.broadcast();
    }

    broadcast() {
        this.observers.forEach(subscriber => subscriber(this.emails));
    }

    subscribe(cb) {
        this.observers.push(cb);
    }

    unsubscribe(cb) {
        this.observers = [...this.observers].filter(subscriber => subscriber !== cb);
    }

    addRandom() {
        const randomEmail = this.generateRandomEmail();
        const input = document.getElementById(this.id);
        this.addSeveralEmails([randomEmail], input);
        this.clearInputValue(input);
    }

    generateRandomEmail() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,Math.random() * 11);

        const userFilteredDomains = this.filterNegativeDomain();
        const domains = userFilteredDomains.length > 0 ? userFilteredDomains : fixedDomains;
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];

        return `${randomString}@${randomDomain}`;
    }

    filterNegativeDomain() {
        const domains = this.options.domains || [];
        return domains.filter(domain => {
            return domain.length > 0 && /^(([\w-]+\.)+[\w-]{2,4})?$/.test(domain.toLowerCase());
        })
    }
}

const EmailsInput = (node, options) => {
    const safeObj = {};
    const instance = new EmailsInputImpl(node, options);

    safeObj.addRandom = () => instance.addRandom();
    safeObj.getCount = () => instance.getCount();
    safeObj.getAllEmails = () => instance.getAllEmails();
    safeObj.replaceAllEmail = () => instance.replaceAllEmail();
    safeObj.subscribe = fn => instance.subscribe(fn);
    safeObj.unsubscribe = fn => instance.unsubscribe(fn);

    return safeObj;
};

if (!window.EmailsInput) {
    window.EmailsInput = EmailsInput;
}

export default EmailsInput;

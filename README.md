
## Installation


Simply include `emailsinput.min.css` and `Open Sans` font in the `<head>`...
```html
<head>
  ...
  <link rel="stylesheet" href="emailsinput.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
</head>
```

and include `emailsinput.min.js` just above your closing `</body>` tag...
```html
<body>
  ...
  <script src="emailsinput.min.js"></script>
</body>
```

If you downloaded the package via zip file from Github, these files are located in the `dist` folder. 

## Basic Usage

Use global variable `EmailsInput` in script:
```javascript
const EmailsInput = window.EmailsInput;

const parent = document.getElementById('emails-input');

const emailsInput = EmailsInput(parent);
````

or if you're using it in Node, importing from file:

```javascript
import EmailsInput from './emailsinput.min.js'
// or
const EmailsInput = require('./emailsinput.min.js')

const parent = document.getElementById('emails-input');

const emailsInput = EmailsInput(parent);
```

### Options

|        option        |             type              | default|              Description               |
| ------------------ | ------------------------------- |--------| --------------------------------------- |
| width              | `String` or `Number`            | `auto` |Configure width of EmailInput           |
| height             | `String` or `Number`            | `auto` |Configure height of EmailInput          |
| initialEmails      | `String[]`                      | `[]`   |Initialize emails for EmailsInput       |
| domains            | `String[]`                      |`['gmail.ru', 'icloud.com', 'yahoo.com', 'hotmail.com', 'msn.com', 'live.com', 'aol.com']`| Add available domains for generate random email|


### API

* addRandom()

```javascript
const emailsInput = EmailsInput(parent);
emailsInput.addRandom(); // generate Random email and insert it in EmailInput
```

* getCount()

```javascript
const emailsInput = EmailsInput(parent);
emailsInput.getCount(); // show alert with valid emails
```

* getAllEmails()

```javascript
const emailsInput = EmailsInput(parent);
emailsInput.getAllEmails(); // return array of all emails (valid and no valid)
```

* replaceAllEmail()

```javascript
const emailsInput = EmailsInput(parent);
emailsInput.replaceAllEmail(); // Replace all exist emails (valid and no valid), using var `domains` for generate domain
```

* subscribe() / unsubscribe()

```javascript
const subscribeFn = emails => {
    const emailList = emails.map(email => email.email);
    alert(emailList);
};

const emailsInput = EmailsInput(parent);
emailsInput.subscribe(subscribeFn); // Add subscriber function, reactive for all changes of emails' list

emailsInput.unsubscribe(subscribeFn); // Remove subscriber function
```

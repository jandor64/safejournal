## SafeJournal ##
test
SafeJournal is written from the ground up for security and peace of mind. This is a personal project made to satisfy a few key goals that no other platform was providing.

[Download](https://raw.githubusercontent.com/jandor64/safejournal/master/dist/index.html)

Project Principles
-----
 - Data must be under your control
 - No unencrypted data can ever be stored
 - Encryption must be non-proprietary and reversable
 - Software must be open source
 - Encrypted images must be possible

This project meets these goal by providing a **single html file** with inline JavaScript. This file can be placed anywhere - your own server, computer, or even phone.


How it works
-----
 1. A new entry is created using the safejournal.html file, and only exists in your current browser tab as a javascript variable
 2. The journal does not auto-save, you must export it and replace your old copy to save your entries.
 3. When you export, a unique password is used to AES encrypt all entries
 4. A simple text file with only encrypted data will be downloaded locally. You may save this anywhere - an encrypted disk, on Google Drive or your own ftp server... it's up to you.
 5. On returning to SafeJournal, you'll use that encrypted file and your password to unlock and edit your journal again.

Adding an entry
---------------

![](https://i.imgur.com/rFEoDiY.png)

List of entries
---------------

![](https://i.imgur.com/NYd4tUF.png)

Exported file
-------------

``{"ct":"c0xfta9OTtSrk+CzkyeJRTOqc1+camNxwmvzGoMSeifEWhsvK1M2MQCXS39tvugwOw/mwHfK8GpWNgF/CzQFBw9coyUsPe0C0uDPDYMRADj6tAjMAuDjBVLJlBtzfkQ3ox0+YsXWMj7nqgW3Io5lbpNFSJTWg1sxsR5Rdka6SGw=","iv":"671ec7444733279541ba08fba58f18ae","s":"807bca9dd9bad8c7"}``

Where CT is encrypted data, IV is initialization vector, and S is the salt.

Resources
---------

[CryptoJS](https://github.com/brix/crypto-js) for encryption

[DefiantJS](https://github.com/hbi99/defiant.js) for templating and data modeling

[jQuery](https://github.com/jquery/jquery)

[Skeleton](https://github.com/dhg/Skeleton) CSS

[FileSaver.js](https://github.com/eligrey/FileSaver.js) for ease of downloading

[moment](https://github.com/moment/moment/) for JavaScript date formatting

[cryptojs-aes-php](https://github.com/brainfoolong/cryptojs-aes-php) as proof of concept for decrypting in another language

[Trumbowyg](https://github.com/Alex-D/Trumbowyg) rich text editing with inline images

## Contributing ##
Please feel free to weigh in! This is a personal project in its infant stages, pull requests are welcome.

This project is built using gulp to create a single inline html file that holds all html, css and js from the app folder. If you're unfamiliar with gulp, you'll want to look that up and become familiar with the basics of a package managers and build system

**Requirements**

 1. Start a Fork of this project on your own GitHub profile
 2. [Gulp](http://gulpjs.com/) installed globally on your system
 3. Clone the project, and open a terminal in the new project folder
 4. Run ``npm install gulp``
 5. Run ``npm install``
 6. To build, use ``gulp inlinesource``
 7. Commit your work, push to your forked repo and then start a pull request. I'll get to it as soon as possible!

## Security Awareness ##
No system is completely secure, this is a best-effort project that weights security heavily in the balance against ease-of-use. To be completely secure, this file and the encrypted data should be stored on an air-gapped computer. If using on a personal computer, things like trojans, keyloggers, and people behind you can compromise the unencrypted data.

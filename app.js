// First node.js app - Info to remember:
//console log message
//console.log('Hello World');

//console log the document - wont work we need to access it
//console.log(document);

//console log process - data providing contect to where to app was executed
//console.log(process);

// write a message and add numbers together
//var message = 'Hello Node!';

//var sum = 5 + 3;

//console.log(message);
//console.log(sum);

// find the file path - returns an array
//var commandLineArgs = process.argv;
//console.log(commandLineArgs);

//require statement to allow app.js to access the fs module's functions through the fs assignment
const fs = require('fs');
// access generatePage function in page-template.js
const generatePage = require('./src/page-template.js');
// without manipulating previous array - create a brand-new array
// extract arguments and store them into distinct variables
const profileDataArgs = process.argv.slice(2, process.argv.length);
//console.log(profileDataArgs);
const [name, github] = profileDataArgs;


// Notice the lack of paratheses around the 'profileDataArr' parameter?
/* 
const printProfileData = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i += 1) {
        console.log(profileDataArr[i]);
    }

    console.log('================');

    // It is the same as this...
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);
*/


//console.log(name, github);
//console.log(generatePage(name, github));

fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
});
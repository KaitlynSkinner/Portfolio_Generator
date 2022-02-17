//const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;
// the below will return the same as above - but added carriage returns manually within the template literal(can view line breaks in code)
const generatePage = (name, github) => {
    return `
    <!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width-device-width, initial-scale=1.0">
    <meta http-equiz="X-UA-Compatible" content="ie-edge">
    <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1>
        <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};

module.exports = generatePage;
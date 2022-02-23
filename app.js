//require statement to allow app.js to access the fs module's functions through the fs assignment
const fs = require('fs');

// access inquirer
const inquirer = require('inquirer');

// access generatePage function in page-template.js
const generatePage = require('./src/page-template.js');

//Inquirer Questions Section
// Ask questions relating to the user
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            // type confirm - automatically turns "y" into true and "n" into false
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            // when method used to conditionally prompt a question based on the user's input
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

// Ask Questions relating to a new project
const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('You need to enter a project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('You need to enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this proect with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('You need to enter a project GitHub link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};

//Mock Data
// const mockData = {
//     {
//         name: 'kaitlyn',
//         github: 'kaitlynskinner',
//         confirmAbout: true,
//         about: 'I love to code!',
//         projects: [
//           {
//             name: 'Run_Buddy',
//             description: 'A website that offers fitness training services.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Run_Buddy/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Password_Generator',
//             description: 'An application an employee can use in order to generate a random password based on criteria they have selected.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Password_Generator/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Coding_Quiz',
//             description: 'An timed coding quiz made of multiple choice questions.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Coding_Quiz/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Robot_Gladiators',
//             description: 'A game created to battle numerous robots, view your score, and visit a shop.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Robot_Gladiators/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Taskinator',
//             description: 'A task tracking application',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Taskinator/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Work_Day_Scheduler',
//             description: 'A 9-5 work day scheduler with colour-coded time slots and areas users can save events to.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Work_Day_Scheduler/',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Weather_Dashboard',
//             description: 'A weather dashboard where travellers can see the weather outlook for multiple cities so they are able to plan a trip accordingly.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Weather_Dashboard/',
//             feature: false,
//             confirmAddProject: true
//           },
//           {
//             name: 'Personal_Portfolio',
//             description: 'Professional Portfolio.',
//             languages: [Array],
//             link: 'https://kaitlynskinner.github.io/Personal_Portfolio/',
//             feature: false,
//             confirmAddProject: false
//           }
//         ]
//       }
// };

// Call the function(s)
promptUser()
//.then(answers => console.log(answers))
.then(promptProject)
.then(portfolioData => {

    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);

        console.log('Page created! Check out index.html in this directory to see it!');
    });
});
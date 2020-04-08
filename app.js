const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = []
let answerSetTwo;
let again;

const questionSetOne = [{
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id",
    },
    {
        type: "list",
        message: "What is your role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
    },
    {
        type: "input",
        message: "What is your Email?",
        name: "email",
    }
];

const managerQuestions = [{
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    },
    {
        type: "confirm",
        name: "again",
        message: "Do you have any other Employees?" ["Y/N"]
    }
];

const engineerQuestions = [{
        type: "input",
        message: "What is your GitHub?",
        name: "github"
    },
    {
        type: "confirm",
        name: "again",
        message: "Do you have any other Employees?" ["Y/N"]
    }
];

const internQuestions = [{
        type: "input",
        message: "Where do you go to school?",
        name: "school"
    },
    {
        type: "confirm",
        name: "again",
        message: "Do you have any other Employees?" ["Y/N"]
    }
];

const main = async () => {
    do {
        const answerSetOne = await inquirer.prompt(questionSetOne);

        let answerSetTwo;
        const {
            name,
            id,
            email
        } = answerSetOne;
        let employee;

        switch (answerSetOne.role) {
            case "Manager":
                answerSetTwo = await inquirer.prompt(managerQuestions);
                const {
                    officeNumber
                } = answerSetTwo;
                employee = new Manager(name, id, email, officeNumber);
                break;
            case "Engineer":
                answerSetTwo = await inquirer.prompt(engineerQuestions);
                const {
                    github
                } = answerSetTwo;
                employee = new Engineer(name, id, email, github);
                break;
            case "Intern":
                answerSetTwo = await inquirer.prompt(internQuestions);
                const {
                    school
                } = answerSetTwo;
                employee = new Intern(name, id, email, school);
                break;
            default:
                throw new Error("Invalid role.");
        }

        employeeArray.push(employee);
        again = answerSetTwo.again;
    } while (again == true);
    const html = render(employeeArray);
    console.log(html);
    fs.writeFileSync(outputPath, html, "utf8");
};

main();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
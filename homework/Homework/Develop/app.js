const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
// for the provided `render` function to work! ```


// adding my prompt questions
const questions = [
    {
        type: "input",
        name: "name",
        message: "what is your name?"

    },
    {
        type: "input",
        name: "id",
        message: "whats your empployee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "what is you're email?"
    },
    {
        type: "list",
        name: "role",
        choices: [
            "Engineer",
            "Manger",
            "Intern"
        ]
    }
];
const EngineerQ = {
    type: "input",
    name: "githubUsername",
    message: "what is your github?"
};

const employeeArray = []
let employee = "";

//using async function 
async function userData() {
    try{
        await inquirer.prompt(questions).then(function(response) {
            return employeeData = response;
        });
        switch (employeeData.role){
            case "Engineeer":
                await inquirer.prompt(EngineerQ).then(function (response) {
                    employeeData.github = response.githubUsername;
                });
                employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github);

                break;
        };

        employeeArray.push(employee);
        console.log("empolyee added");

        await inquirer.prompt(employee).then(function (response) {
                        return decision = response.addEmployee;
                    });
            
                    if (decision === "Yes") {
                        await userData();
                    } else {
                        console.log(employeeArray);
            
                        let employees = render(employeeArray);
            
            //pushing the promts answers to the new genrated html
                        fs.writeFile(outputPath, employees, function (err) {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Data entered!");
                        })
                    }
            
                } catch (err) {
                    console.log(err);
                }
            }
            
            userData();
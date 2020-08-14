//elements selected
const list = document.getElementById("list");
const companyInput = document.getElementById("companyInput");
const jobInput = document.getElementById("jobInput");

//color randomizer
const listOfColors = ["list-group-item-primary", 
"list-group-item-success", 
"list-group-item-warning", 
"list-group-item-info", 
"list-group-item-danger"];

let randomNum = Math.floor(Math.random() * listOfColors.length);
let randomColor = listOfColors[randomNum];
// console.log(randomColor);

//toggle
const visible = "visible";
const hidden = "hidden";

//display number of jobs
let numOfJobs = document.getElementById("numOfJobs");

numOfJobs.innerHTML = 0;

//Variables
let listOfJobs, id;

    //get jobs from local storage
    let data = localStorage.getItem("job");

    //check if data is not empty
    if(data) {
        listOfJobs = JSON.parse(data);
        id = listOfJobs.length;
        loadList(listOfJobs);
    } else {
        listOfJobs = [];
        id = 0;
    }

//load jobs
function loadList(arr) {
    arr.forEach(function(job) {
        addJob(job.company, job.jobTitle, job.id, job.color, job.trash);
    });
};

//add a job function
function addJob(company, jobTitle, id, color, trash) {

    if(trash) {
        return;
    }

    const job = `
    <li class=" list-group-item ${color} id="${id}"">
        <button class="btn delete btn-outline-dark btn-sm" job="delete" id="${id}">Delete</button>
        <h5>${company}</h5>
        <p id="jobTitle">${jobTitle}</p>
        <small id="whenAdded"> added</small>
    </li>
    `;

    numOfJobs.innerHTML++;
    list.insertAdjacentHTML("beforeend", job);
}

//add a job to list
$("#addBtn").on("click", function() {
    const companyName = companyInput.value;
    const jobName = jobInput.value;
    if(companyName && jobName) {
        addJob(companyName, jobName, id, randomColor, false);

        listOfJobs.push({
            company : companyName,
            jobTitle : jobName,
            id : id,
            color : randomColor,
            trash : false
        });

        //add item to local storage
        localStorage.setItem("job", JSON.stringify(listOfJobs));

        id++;

    }
    companyInput.value = "";
    jobInput.value = "";
});

//on enter keyup
document.addEventListener("keyup", function(e) {
    if(e.keyCode == 13) {
        const companyName = companyInput.value;
        const jobName = jobInput.value;
        if(companyName && jobName) {
            addJob(companyName, jobName, id, randomColor, false);

            listOfJobs.push({
                company : companyName,
                jobTitle : jobName,
                id : id,
                color : randomColor,
                trash : false
            });

            //add item to local storage
            localStorage.setItem("job", JSON.stringify(listOfJobs));    

            id++;
        
        }
        companyInput.value = "";
        jobInput.value = "";
    }
});


//remove job
function removeJob(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listOfJobs[element.id].trash = true;
    localStorage.removeItem(id);
    numOfJobs.innerHTML--;
}



//removing on click
list.addEventListener("click", function(e) {
    const element = e.target
    const elementJob = element.attributes.job.value;

    if(elementJob == "delete") {
        removeJob(element);
        localStorage.removeItem(id);
    }

    localStorage.setItem("job", JSON.stringify(listOfJobs));
});

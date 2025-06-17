let tablesData;
let student;
let computer;
let loan;
let loanDetail;
// —————————————————————————————————————————————
// Event Listeners
// —————————————————————————————————————————————
document.addEventListener('DOMContentLoaded', async function()
{
    tablesData = 
    {
        student: await fetchData("student"),
        computer: await fetchData("computer"),
        loan: await fetchData("loan"),
        loanDetail: await fetchData("loan_detail")
    };
    
    

    console.log
    (
        '%c'+`[--- Tables ---]:`, 'font-size: 14px; font-weight: bold; color: blue;', tablesData
    );
    // console.log(Array.isArray(tablesData.loan))

    // Mapping and Joining
    for (let parsedComputerKey in tablesData.computer)
    {
        const parsedComputer = tablesData.computer[parsedComputerKey];
        parsedComputer.STUDENT = "None";
    }

    for (let parsedStudentKey in tablesData.student)
    {
        let conditionSuccess = false;
        const parsedStudent = tablesData.student[parsedStudentKey];
        // console.log(parsedStudent)
        Conditions:
        {
            const studentLoan = Object.values(tablesData.loan).find(
                studentLoan => studentLoan.STUDENT_ID === parsedStudent.STUDENT_ID);
            if (!studentLoan) break Conditions;
            parsedStudent.LOAN = studentLoan;

            const detailsOfLoan = Object.values(tablesData.loanDetail).find(
                detailsOfLoan => detailsOfLoan.LOAN_ID === studentLoan.LOAN_ID);
            if (!detailsOfLoan) break Conditions;
            parsedStudent.LOAN_DETAIL = detailsOfLoan;

            const loanedComputer = Object.values(tablesData.computer).find(
                loanedComputer => loanedComputer.COMPUTER_ID === detailsOfLoan.COMPUTER_ID);
            if (!loanedComputer) break Conditions;

            parsedStudent.COMPUTER = loanedComputer; // Set student to point at Computer
            loanedComputer.STUDENT = parsedStudent; // Set computer to point at Student
            conditionSuccess = true;
        };
        if (conditionSuccess == false)
        {
            parsedStudent.COMPUTER = "None";
        }
            
        
    };
    

    addToTab('student')
    addToTab('computer')

});


// —————————————————————————————————————————————
// Functions
// —————————————————————————————————————————————
async function fetchData(tableName) // fetches data from the backend via the app.get() code
{
    try
    {
        const response = await fetch (`http://localhost:3000/${tableName}`);
        if (!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }
};

// async function sendEmail(msg)
// {
//     fetch('/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'},
//         bod: JSON.stringify({msg: msg}),
//     });
// };

// Create html elements for the table to display the data.
async function addToTab(tableName)
{
    const tableDefinition = tableName
    const tableContainer = document.getElementById(`${tableName}_container`);
    const data = tablesData[tableName];
    data.forEach(tableName => 
    {
        const objectId = Object.values(tableName)[0];
        const objectName = Object.values(tableName)[1];
        const objectEntries = Object.entries(tableName).slice(2);
        const newTable = document.createElement("table");
        tableContainer.appendChild(newTable);
        newTable.className = "tables"; 
        newTable.id = `${tableDefinition}${objectId}`;
        newTable.setAttribute('navn', objectName);
        newTable.setAttribute(`${tableDefinition}_id`, objectId);
        newTable.innerHTML = `<h3>${objectName}</h3>`;

        if (tableName.LOAN)
        {
            const expirationDate = tableName.LOAN.EXPIRATION_DATE;
            const currentDate = new Date();
            if (new Date(expirationDate) < currentDate)
            {
                newTable.innerHTML = `${newTable.innerHTML} - Expired Loan`
                newTable.style.color = 'red';
                const newEmailButton = document.createElement("button");
                newTable.appendChild(newEmailButton)
                newEmailButton.className = 'emailButton'
                newEmailButton.innerHTML = 'Send Email'
                newEmailButton.onclick = async function(event)
                {
                    event.stopPropagation
                    await sendMail()
                }

            }

        }
        
        newTable.onclick = () => toggleDetails(newTable.id);
        objectEntries.forEach(([key, val]) => 
        {
            if (key == 'LOAN' || key == 'LOAN_DETAIL'){} // do not display these
            else
            {
                const newRow = document.createElement("tr");
                const newColumnKey = document.createElement("td");
                const newColumnValue = document.createElement("td");
                newTable.appendChild(newRow);
                newRow.className = "tableRows";
                newRow.id = key;
                
                newRow.appendChild(newColumnKey);
                newColumnKey.className = "tableKeyCell";
                newColumnKey.textContent = key;

                newRow.appendChild(newColumnValue);
                newColumnValue.className = "tableValueCell";
                if (key == 'COMPUTER')
                {
                    const computerInfo = tableName.COMPUTER.MODEL
                    newColumnValue.textContent = computerInfo;
                    // console.log(`Student ${objectName} has loaned ${computerInfo}`);

                }
                else if (key == 'STUDENT')
                {
                    const studentInfo = tableName.STUDENT.NAVN
                    newColumnValue.textContent = studentInfo;
                    // console.log(`Computer ${objectName} was loaned by ${studentInfo}`);

                }
                else
                {
                    newColumnValue.textContent = val;

                };
            }
        });
       
    });
    
};

// Updates displayed data of a "tables" element (such as "Jens Jensen")
async function updateTable(object)
{
    const table = document.getElementById(elementID);
    if(table.COMPUTER)
    {
        table.textContent = object.COMPUTER
    }
    if(table.STUDENT)
    {
        table.textContent = object.STUDENT
    }
    object.STUDENT
}

async function toggleDetails(tableId)
{
    const table = document.getElementById(tableId);
    const tableRows = Array.from(table.children).filter(child => child.tagName !== 'H3');
    tableRows.forEach(tableRow => 
    {
        if (tableRow.style.display === 'inherit')
        {
            tableRow.style.display = 'none';
        }
        else
        {
            tableRow.style.display = 'inherit';
        }
    });
    
};

// Changes displayed data when one of the html tab buttons are clicked.
async function tab(tableToDisplay)
{
    // Hide all containers.
    document.querySelectorAll('.table_container').forEach(container => {
        container.style.display = 'none';
    });
    const tableContainer = document.getElementById(`${tableToDisplay}_container`);
    tableContainer.style.display = 'flex';

    
};

async function sendMail()
{
    alert("Advarselsbesked var sendt.")
    // Add email function here when finished
}

async function registerLoan()
{
    var studentId = document.getElementById('registryInput_studentId').value
    var computerId = document.getElementById('registryInput_computerId').value
    alert("Udlån blev registreret!")
    const post = await fetch (`http://localhost:3000/POST`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ STUDENT_ID: studentId, COMPUTER_ID: computerId })

    });

    // Add post to database function here when finished


}

async function autoFillFields(v)
{
    console.log(v)
    const theStudent = Object.values(student).find(obj => obj.STUDENT_ID === v)

    // const theStudent = document.querySelector(`[student_id="${v}"]`)
    
    // console.log(theStudent)
    // if (theStudent)
    // {
    //     document.getElementById('registryInput_studentName').value = theStudent.NAVN;
    // }

}

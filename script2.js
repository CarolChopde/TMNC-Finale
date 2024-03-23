//STUDENT REGISTRATION 

document.getElementById("regform").addEventListener("submit", function(event)
 {
    event.preventDefault();
//retrieves the values entered by the user in the form fields 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const DOB = document.getElementById("DOB").value;
    const branch = document.getElementById("branch").value;
    const number = document.getElementById("number").value;

    
    // fetch is making a post request with the json formatted string 
    fetch("http://localhost:3000/submitstud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, DOB, branch, number})
        // converts the JavaScript object into a JSON string.
    })
    
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Student registered successfully!");
    })

    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while registering the student.");
    });
});
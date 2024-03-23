//STUDENT LOGIN
        document.getElementById("studlogin").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Retrieve the username and password from the form fields
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Perform any additional validation if needed

            // Example: Check if fields are not empty
            if ((!username.trim()) || (!password.trim())) {
                alert("Please fill in all fields.");
                event.preventDefault();
                return;
            }

            // If fields are valid, proceed with login process
            // You can use fetch or any other method to send the login data to your server
            fetch("http://localhost:3000/studlogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Student registered successfully!");// Display the response message
                // Redirect to student dashboard if login successful
                if (data.success) {
                    window.location.href = "student_dashboard.html";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while logging in.");
                event.preventDefault();
            });
           
        });

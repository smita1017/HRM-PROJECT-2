document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector(".savedata");
    const cancelButton = document.querySelector(".Cancel");
    const inputs = document.querySelectorAll("input:not(.serchimg)"); // Exclude search input
    const toggleBtn =document.querySelector(".expand_left_img");
    const leftSection=document.querySelector(".leftsection1")
         

    toggleBtn.addEventListener('click', () => {
        leftSection.classList.toggle('active');
    });

    // Optional: Close menu when clicking outside on mobile
    window.addEventListener('click', (e) => {
        if (window.innerWidth <= 600 && 
            !leftSection.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            leftSection.classList.remove('active');
        }
    });

    // Reset menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) {
            leftSection.classList.remove('active');
        }
    });
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        let isValid = true;
        
        inputs.forEach(input => {
            let errorMsg = input.parentNode.querySelector(".error-msg");
            
            if (!errorMsg) {
                errorMsg = document.createElement("span");
                errorMsg.classList.add("error-msg");
                errorMsg.style.color = "red";
                errorMsg.style.fontSize = "12px";
                input.parentNode.appendChild(errorMsg);
            }
            
            if (input.value.trim() === "") {
                isValid = false;
                errorMsg.textContent = "This field is required";
            } else {
                errorMsg.textContent = "";
            }
        });
        
        if (isValid) {
            const formData = {};
            inputs.forEach(input => {
                formData[input.getAttribute("class")] = input.value;
            });
            console.log("Form Data Submitted:", formData);
        }
    });
    
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let errorMsg = input.parentNode.querySelector(".error-msg");
            if (errorMsg) errorMsg.textContent = "";
        });
    });
    
    cancelButton.addEventListener("click", function () {
        inputs.forEach(input => {
            input.value = ""; // Clear input fields
            let errorMsg = input.parentNode.querySelector(".error-msg");
            if (errorMsg) errorMsg.textContent = "";
        });
    });
});

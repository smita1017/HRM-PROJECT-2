document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const saveButton = document.querySelector(".submitcancel button:last-child");
     {
        const hamburgur = document.querySelector(".handburgerimg"); // Ensure correct class selection
        const leftSection = document.querySelector(".leftsection1");
        const rightsection=document.querySelector(".rightsection2");
      const headerright=document.querySelector("headerright");
        function toggleHamburger() {
            console.log("Hamburger menu clicked"); // Debugging
            if (leftSection.style.display === "block")
               {
                leftSection.style.display = "none";
                hamburgur.style.display = "block";
                rightsection.style.display = "block";
                rightsection.style.width="100%";


            } else {
                leftSection.style.display = "block";
                leftSection.style.width="35%";
                rightsection.style.width="65%";
                hamburgur.style.display="block"
                headerright.style.display="block";
            }
        }
    
        // Attach the event listener properly
        hamburgur.addEventListener("click", toggleHamburger);
    }
    function showError(input, message) {
      let errorElement = input.nextElementSibling;
  
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("span");
        errorElement.classList.add("error-message");
        errorElement.style.color = "red";
        errorElement.style.fontSize = "0.8rem";
        input.parentNode.appendChild(errorElement);
      }
  
      errorElement.textContent = message;
    }
  
    // Function to remove the error message
    function clearError(input) {
      let errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
    }
  
    // Function to validate a field
    function validateInput(input) {
      const value = input.value.trim();
      const type = input.getAttribute("type");
  
      if (value === "") {
        showError(input, `${input.previousElementSibling.textContent} is required.`);
        return false;
      }
  
      // Date validation
      if (type === "date") {
        const startDate = document.querySelector('input[name="startDate"]')?.value;
        const endDate = document.querySelector('input[name="endDate"]')?.value;
        const deliveryDate = document.querySelector('input[name="deliveryDate"]')?.value;
  
        if (input.name === "endDate" && startDate && startDate > endDate) {
          showError(input, "End Date must be after Start Date.");
          return false;
        }
        if (input.name === "deliveryDate" && endDate && endDate > deliveryDate) {
          showError(input, "Delivery Date must be after End Date.");
          return false;
        }
      }
  
      clearError(input);
      return true;
    }
  
    // Attach input event listeners for live validation
    document.querySelectorAll("input").forEach((input) => {
      if (input.placeholder !== "Search anything here") {
        input.addEventListener("input", () => validateInput(input));
      }
    });
  
    // Handle form submission
    saveButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
  
      let isValid = true;
      const formData = {};
  
      document.querySelectorAll("input").forEach((input) => {
        if (input.placeholder !== "Search anything here") {
          if (!validateInput(input)) {
            isValid = false;
          }
          formData[input.previousElementSibling.textContent.trim()] = input.value.trim();
        }
      });
  
      if (isValid) {
        console.clear();
        console.log("✅ Form Data Submitted:", formData);


      }
    });
  });
  
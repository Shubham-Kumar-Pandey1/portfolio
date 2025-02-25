import { getHelpResponse } from "./help.js";
import { getAboutResponse } from "./about.js";
import { getProjectsResponse } from "./projects.js";
import { getContactResponse } from "./contact.js";

const inputField = document.getElementById("command-input");
const outputDiv = document.getElementById("terminal-output");
const terminalContent = document.getElementById("terminal-body");

// Store command functions dynamically
const commands = {
  help: () => getHelpResponse(),
  about: getAboutResponse,
  projects: getProjectsResponse,
  contact: getContactResponse,
  cls: () => {
    outputDiv.innerHTML = "";
    inputField.value = "";
    inputField.focus();
    return;
  },
};

// Listen for enter key to execute command
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleCommand(inputField.value.trim().toLowerCase());
  }
});

// Handle command execution
function handleCommand(command) {
  if (command === "cls") {
    commands.cls();
    return;
  }
  const commandClass = commands[command]
    ? "prev-command-correct"
    : "prev-command-incorrect";

  // Render entered command
  let response = `
    <div class="terminal-input-line">
        <span class="cmd-path">Developer:\\Shubham\\CLI-Portfolio\\></span> 
        <span class=${commandClass}>${command}</span>
    </div>
  `;

  // Execute command if exists, otherwise show error
  if (commands[command]) {
    response +=
      typeof commands[command] === "function"
        ? commands[command]()
        : `<p>${commands[command]}</p>`;

    if(command === "contact"){
      // 🚀 Attach event listener after rendering the contact form
      setTimeout(() => attachContactFormListener(), 50);
    }
  } else {
    response += `<p>Command not found. Type 'help' for a list of commands.</p>`;
  }

  outputDiv.innerHTML += response;
  inputField.value = "";
  scrollToBottom();
}

// Function to attach the event listener dynamically
function attachContactFormListener() {
  setTimeout(() => {
    // Get all forms
    const forms = document.querySelectorAll("#feedback-form");

    // Remove all previous forms, keep only the last one
    if (forms.length > 1) {
      forms.forEach((form, index) => {
        if (index !== forms.length - 1) {
          form.remove(); // Remove all previous forms
        }
      });
    }

    // Select the latest form
    const latestForm = document.querySelector("#feedback-form");

    if (latestForm) {
      // Remove existing event listeners by replacing the form with a clone
      const clonedForm = latestForm.cloneNode(true);
      latestForm.replaceWith(clonedForm);


      // Select elements
        const submitButton = clonedForm.querySelector("button[type='submit']");
        const responseText = document.getElementById("feedback-response");

      clonedForm.addEventListener("submit", async (e) => {
        e.preventDefault();
      // Changin ui while submiting
        submitButton.disabled = true;
        responseText.textContent = "Submitting...";
        try {
          const data = new FormData(e.target);

          const response = await fetch("https://portffolio-server.vercel.app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(data)), // Convert FormData to JSON
          });
          if(response.ok){
            clonedForm.reset();
            responseText.textContent = "✅ Thank you for your feedback!"; 
          }else{
            responseText.textContent = "❌ Something went wrong. Try again.";
          }
        } catch (error) {
          responseText.textContent = "❌ ❌ Error submitting form.";
          console.error("Error:", error);
        }finally{
          submitButton.disabled = false;
        }
      });
    } else {
      console.log("No form found to attach listener.");
    }
  }, 50); // Small delay to ensure form is rendered
}


// Function to scroll terminal to the latest output
function scrollToBottom() {
  setTimeout(() => {
    terminalContent.scrollTop = terminalContent.scrollHeight;
    inputField.focus();
  }, 30);
}

// Ensure focus on load
window.onload = () => inputField.focus();
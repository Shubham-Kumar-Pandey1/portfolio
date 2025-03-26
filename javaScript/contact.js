export function getContactResponse() {
  return `
    <div class="section">
        <div class="section-title">📧 Contact Me:</div>
        <div class="section-content">
            <p>Email: <strong>meetshubham1702kumar@gmail.com</strong></p>
            <p>GitHub: <a href="https://github.com/Shubham-Kumar-Pandey1/" target="_blank" class="link">github.com/shubham</a></p>
        </div>
    </div>

    <div class="section">
        <div class="section-title">💬 Leave a Message:</div></br>
        <div class="section-content">
            <form id="feedback-form" >
                <input type="email" id="email" name="useremail" placeholder="Enter your email" required></input>
                <input type="text" id="message" name="userfeedback" placeholder="Type your message..." required></input>
                <button type="submit" id="button">Send</button>
            </form>
            </br>
            <p id="feedback-response" class="hidden"></p>
        </div>
    </div>
    `;
}
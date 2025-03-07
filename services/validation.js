export default function validateForm(data) {
    
    const errors = [];

    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is requirerd");
    }

    if (!data.email || data.email.trim() === "" || 
        data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
        errors.push("Email is requirerd and must be valid");
    }

    // Validate meet
    const validMeetOptions = ["No option selected", "Work", "School", "Job fair", "Gym", "Soccer", "Social event", "Online", "Family member", "Mutual friend"];
    if (!validMeetOptions.includes(data.meet)) {
        errors.push("Go away, meet evildoer!")
    }

    // Validate email list
    const validListOptions = ["on", undefined];
    if (!validListOptions.includes(data.emaillist)) {
        errors.push("Go away, email-list evildoer!")
    }

    // Validate format
    const validFormatOptions = ["html", "text", undefined];
    if (!validFormatOptions.includes(data.format)) {
        errors.push("Go away, format evildoer!")
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}
// Initialize the time picker with the current time
window.onload = function() {
    const startTimeInput = document.getElementById('start-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    startTimeInput.value = `${hours}:${minutes}`;

    // Load the saved duration preference from localStorage
    const savedDuration = localStorage.getItem('selectedDuration');
    if (savedDuration) {
        document.querySelector(`input[name="duration"][value="${savedDuration}"]`).checked = true;
    } else {
        // Default to 8 hours if no preference is saved
        document.querySelector('input[name="duration"][value="8:00"]').checked = true;
    }

    // Add event listeners to radio buttons to save selection
    const radioButtons = document.querySelectorAll('input[name="duration"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            localStorage.setItem('selectedDuration', this.value);
        });
    });
};

function calculateEndTime() {
    const startTimeInput = document.getElementById('start-time').value;
    const duration = document.querySelector('input[name="duration"]:checked').value;

    if (!startTimeInput) {
        alert('Please select a start time.');
        return;
    }

    const [hours, minutes] = startTimeInput.split(':').map(Number);
    const [durationHours, durationMinutes] = duration.split(':').map(Number);

    let endHours = hours + durationHours;
    let endMinutes = minutes + durationMinutes;

    if (endMinutes >= 60) {
        endHours += 1;
        endMinutes -= 60;
    }

    if (endHours >= 24) {
        endHours -= 24;
    }

    // Convert to 12-hour format and determine AM/PM
    const period = endHours >= 12 ? 'PM' : 'AM';
    endHours = endHours % 12 || 12; // Convert hour '0' to '12'

    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')} ${period}`;
    document.getElementById('result').innerText = `End Time: ${endTime}`;
}

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

    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    document.getElementById('result').innerText = `End Time: ${endTime}`;
}

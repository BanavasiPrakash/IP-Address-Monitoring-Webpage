// (Same script.js content as before)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Add IP Form script loaded!');

    const addIpForm = document.getElementById('add-ip-form');
    const messageDiv = document.getElementById('message');

    function showMessage(msg, type = 'success') {
        messageDiv.textContent = msg;
        messageDiv.className = `message-${type}`;
        messageDiv.classList.remove('hidden');
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';

        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 500);
        }, 5000);
    }

    addIpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const ipAddress = document.getElementById('ipAddress').value.trim();
        const description = document.getElementById('description').value.trim();
        const location = document.getElementById('location').value.trim();

        if (!ipAddress || !location) {
            showMessage('IP Address and Location are required!', 'error');
            return;
        }

        console.log('Form Submitted!');
        console.log('IP Address:', ipAddress);
        console.log('Description:', description);
        console.log('Location:', location);

        showMessage(`Successfully collected data for: ${ipAddress} in ${location}`);

        addIpForm.reset();
    });
});
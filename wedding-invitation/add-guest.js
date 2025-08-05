document.getElementById('guestForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const guestName = document.getElementById('guestName').value.trim();
  if (!guestName) {
    document.getElementById('statusMessage').textContent = 'Please enter a valid name.';
    return;
  }

  const guestId = generateRandomId();
  const newGuest = { [guestId]: guestName };

  fetch('guests.json')
    .then(response => response.json())
    .then(data => {
      const updatedData = { ...data, ...newGuest };

      return fetch('guests.json', {
        method: 'PUT', // Use PUT or POST depending on your server setup
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    })
    .then(() => {
      document.getElementById('statusMessage').textContent = `Guest added successfully! ID: ${guestId}`;
      document.getElementById('guestForm').reset();
    })
    .catch(err => {
      document.getElementById('statusMessage').textContent = 'Error adding guest.';
      console.error(err);
    });
});

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}
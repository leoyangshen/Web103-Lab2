const renderGift = async () => {
  // Parse the ID as an integer from the URL.
  const requestedID = parseInt(window.location.href.split('/').pop());

  // Fetch all gift data from the server.
  const response = await fetch('/gifts');
  const data = await response.json();

  // Get the main content element.
  const giftContent = document.getElementById('gift-content');

  // Find the matching gift.
  let gift;
  if (data) {
    gift = data.find(gift => gift.id === requestedID);
  }

  // Conditionally render the gift details.
  if (gift) {
    document.getElementById('image').src = gift.image;
    document.getElementById('name').textContent = gift.name;
    document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy;
    document.getElementById('submittedOn').textContent = 'Submitted on: ' + gift.submittedOn;
    document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint;
    document.getElementById('audience').textContent = 'Great For: ' + gift.audience;
    document.getElementById('description').textContent = gift.description;
    document.title = `UnEarthed - ${gift.name}`;
  } else {
    const message = document.createElement('h2');
    message.textContent = 'No Gifts Available 😞';
    giftContent.appendChild(message);
  }
};

// Call the function to render the gift.
renderGift();

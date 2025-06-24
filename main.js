// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Hide the error modal immediately when script loads
const modal = document.getElementById('modal');
if (modal) {
  modal.classList.add('hidden');
}

// Also hide it when DOM is ready (backup)
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('hidden');
  }
});

// Add event listeners to all hearts
document.addEventListener('click', function(event) {
  // Check if clicked element is a heart
  if (event.target.classList.contains('like-glyph')) {
    const heart = event.target;
    
    // Check if heart is empty (not activated)
    if (!heart.classList.contains('activated-heart')) {
      // Empty heart clicked - make server request
      mimicServerCall()
        .then(function() {
          // Server success - activate the heart
          heart.innerText = '♥'; // Change to full heart
          heart.classList.add('activated-heart'); // Make it red
        })
        .catch(function(error) {
          // Server failure - show error modal
          const modal = document.getElementById('modal');
          const modalMessage = document.getElementById('modal-message');
          
          if (modal && modalMessage) {
            // Display error message
            modalMessage.innerText = error;
            
            // Show the modal
            modal.classList.remove('hidden');
            
            // Hide modal after 3 seconds
            setTimeout(function() {
              modal.classList.add('hidden');
            }, 3000);
          }
        });
    } else {
      // Full heart clicked - deactivate it
      heart.innerText = '♡'; // Change to empty heart
      heart.classList.remove('activated-heart'); // Remove red color
    }
  }
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

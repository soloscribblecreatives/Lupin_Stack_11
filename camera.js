    let currentStream = null;
    let currentDevice = 'user'; // Default to front camera (user-facing)
    let videoElement = document.getElementById('video');
    let canvasElement = document.getElementById('canvas');
    let captureButton = document.getElementById('captureButton');
    let screenshotButton = document.getElementById('screenshotButton');
    let resetButton = document.getElementById('resetButton');
    let switchButton = document.getElementById('switchButton');
    let screenshotCanvas = document.getElementById('screenshot-canvas');

    // Start the camera
    function startCamera() {
      // Stop any previous stream to prevent multiple streams running
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }

      navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentDevice }
      })
      .then(stream => {
        currentStream = stream;
        videoElement.srcObject = stream;
      })
      .catch(err => {
        console.error("Camera error: ", err);
        alert("Unable to access the camera.");
      });
    }

    // Capture the photo
    captureButton.addEventListener('click', function() {
      // Draw the current video frame to the canvas
      let context = canvasElement.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

      // Save the photo in local storage
      let photoData = canvasElement.toDataURL('image/png');
      localStorage.setItem('capturedPhoto', photoData);

      // Display the captured photo in the same circular window
      let photo = new Image();
      photo.src = photoData;
      photo.onload = function() {
        canvasElement.style.display = 'block';
        context.drawImage(photo, 0, 0, canvasElement.width, canvasElement.height);
      };
    });

    // Take screenshot of the screen
    screenshotButton.addEventListener('click', function() {
      let context = screenshotCanvas.getContext('2d');
      context.clearRect(0, 0, screenshotCanvas.width, screenshotCanvas.height);

      // Capture a screenshot of the device screen using HTML5 canvas
      context.drawImage(videoElement, 0, 0, screenshotCanvas.width, screenshotCanvas.height);

      // Save screenshot to localStorage
      let screenshotData = screenshotCanvas.toDataURL('image/png');
      localStorage.setItem('screenShot', screenshotData);
    });

    // Reset the camera view
    resetButton.addEventListener('click', function() {
      canvasElement.style.display = 'none';
      startCamera();
    });

    // Switch the camera between front and back
    switchButton.addEventListener('click', function() {
      currentDevice = (currentDevice === 'user') ? 'environment' : 'user';
      startCamera();
    });

    // Start the camera when the page loads
    window.onload = function() {
      startCamera();
    };

    // Security: Ensure access is only granted to trusted websites and apps
    if (!window.isSecureContext) {
      alert("For security reasons, this application must be served over HTTPS.");
    }
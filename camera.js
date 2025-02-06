        let video = document.getElementById('cameraFeed');
        let canvas = document.getElementById('captureCanvas');
        let context = canvas.getContext('2d');
        let stream;
        let usingFrontCamera = true;

        // Function to start the camera
        async function startCamera() {
            try {
                let constraints = {
                    video: {
                        width: 1280,
                        height: 720,
                        facingMode: usingFrontCamera ? 'user' : 'environment'
                    }
                };
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = stream;
            } catch (error) {
                alert('Error accessing the camera: ' + error.message);
            }
        }

        // Capture photo and store in localStorage
        document.getElementById('captureBtn').addEventListener('click', function() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Save image in local storage
            let imageData = canvas.toDataURL('image/png');
            localStorage.setItem('capturedPhoto', imageData);
            
            // Show captured image
            video.style.display = 'none';
            canvas.style.display = 'block';
        });

        // Reset to capture new photo
        document.getElementById('resetBtn').addEventListener('click', function() {
            video.style.display = 'block';
            canvas.style.display = 'none';
        });

        // Switch between front and back camera
        document.getElementById('switchBtn').addEventListener('click', function() {
            usingFrontCamera = !usingFrontCamera;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            startCamera();
        });

        // Capture full viewport screenshot
        document.getElementById('screenshotBtn').addEventListener('click', function() {
            html2canvas(document.body).then(canvas => {
                let screenshotData = canvas.toDataURL('image/png');
                localStorage.setItem('viewportScreenshot', screenshotData);
                alert('Screenshot saved to localStorage!');
            });
        });

        // Security: Stop camera when page unloads
        window.addEventListener('beforeunload', function() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        });

        // Initialize camera on page load
        startCamera();
let video = document.getElementById('cameraFeed');
        let canvas = document.getElementById('canvas');
        let captureBtn = document.getElementById('captureBtn');
        let resetBtn = document.getElementById('resetBtn');
        let switchCameraBtn = document.getElementById('switchCameraBtn');
        let stream = null;
        let currentFacingMode = 'user'; // 'user' for front, 'environment' for back

        async function startCamera() {
            try {
                // Stop any existing camera stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }

                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: currentFacingMode }
                });

                video.srcObject = stream;
            } catch (error) {
                console.error("Error accessing camera:", error);
                alert("Camera access denied. Please allow camera permissions.");
            }
        }

        captureBtn.addEventListener('click', () => {
            let ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            let imageData = canvas.toDataURL('image/png');

            // Save to local storage
            localStorage.setItem('capturedImage', imageData);

            alert("Photo saved successfully!");
        });

        resetBtn.addEventListener('click', () => {
            startCamera();
        });

        switchCameraBtn.addEventListener('click', () => {
            currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
            startCamera();
        });

        // Start the camera when the page loads
        startCamera();
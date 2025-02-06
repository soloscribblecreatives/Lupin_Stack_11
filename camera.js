let video = document.getElementById('camera');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let currentStream = null;
        let facingMode = "user"; // Default to front camera

        async function startCamera() {
            try {
                if (currentStream) {
                    currentStream.getTracks().forEach(track => track.stop());
                }
                let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
                video.srcObject = stream;
                currentStream = stream;
            } catch (error) {
                alert('Error accessing camera: ' + error.message);
            }
        }

        document.getElementById('capture').addEventListener('click', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.style.display = 'none';
            canvas.style.display = 'block';
        });

        document.getElementById('save').addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'captured_image.png';
            link.click();
            localStorage.setItem('capturedImage', imageData);
        });

        document.getElementById('reset').addEventListener('click', () => {
            video.style.display = 'block';
            canvas.style.display = 'none';
        });

        document.getElementById('switch').addEventListener('click', () => {
            facingMode = facingMode === "user" ? "environment" : "user";
            startCamera();
        });

        startCamera(); // Start camera on load
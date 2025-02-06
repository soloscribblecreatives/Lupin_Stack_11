

        const video = document.getElementById('cameraFeed');
        const canvas = document.getElementById('photoCanvas');
        const captureBtn = document.getElementById('captureBtn');
        const resetBtn = document.getElementById('resetBtn');
        let stream = null;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                    audio: false
                });

                video.srcObject = stream;
            } catch (error) {
                alert("Error accessing camera: " + error.message);
            }
        }

        captureBtn.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Stop the camera stream after capturing
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            video.style.display = "none";
            canvas.style.display = "block";

            saveImage(canvas);
        });

        resetBtn.addEventListener('click', () => {
            canvas.style.display = "none";
            video.style.display = "block";
            startCamera();
        });

        function saveImage(canvas) {
            const imageURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imageURL;
            link.download = "captured_image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        startCamera();
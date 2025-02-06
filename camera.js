

        const video = document.getElementById("camera");
        const canvas = document.getElementById("canvas");
        const captureButton = document.getElementById("capture");

        async function openCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" }, // Use front camera
                    audio: false
                });

                video.srcObject = stream;
            } catch (error) {
                alert("Camera access denied! Please allow camera access.");
                console.error("Error accessing the camera:", error);
            }
        }

        captureButton.addEventListener("click", () => {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.style.display = "none"; // Hide video preview
            canvas.hidden = false; // Show captured image
        });

        // Security: Stop video stream when page is closed
        window.addEventListener("beforeunload", () => {
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }
        });

        // Initialize camera on page load
        openCamera();
let video = document.getElementById('camera');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        let currentStream = null;
        let usingFrontCamera = true;

        async function startCamera() {
            try {
                const constraints = {
                    video: {
                        facingMode: usingFrontCamera ? 'user' : 'environment'
                    }
                };
                
                if (currentStream) {
                    currentStream.getTracks().forEach(track => track.stop());
                }
                
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                currentStream = stream;
                video.srcObject = stream;
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Camera access denied. Please enable permissions.');
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
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            canvas.style.display = 'none';
            video.style.display = 'block';
        });
        
        document.getElementById('switchCamera').addEventListener('click', () => {
            usingFrontCamera = !usingFrontCamera;
            startCamera();
        });
        
        startCamera();
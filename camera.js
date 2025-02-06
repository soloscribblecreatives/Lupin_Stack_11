let video = document.getElementById('camera');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let stream = null;
        let currentFacingMode = 'user'; // Front camera by default
        
        async function startCamera(facingMode = 'user') {
            try {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
                video.srcObject = stream;
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Camera access denied. Please allow camera permissions.');
            }
        }
        
        function capturePhoto() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.style.display = 'none';
            canvas.style.display = 'block';
        }
        
        function savePhoto() {
            let imageData = canvas.toDataURL('image/png');
            localStorage.setItem('capturedPhoto', imageData);
            alert('Photo saved successfully!');
        }
        
        function resetCamera() {
            canvas.style.display = 'none';
            video.style.display = 'block';
        }
        
        function switchCamera() {
            currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
            startCamera(currentFacingMode);
        }
        
        function takeScreenshot() {
            html2canvas(document.body).then(canvas => {
                let link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'screenshot.png';
                link.click();
            });
        }
        
        startCamera();
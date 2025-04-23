document.addEventListener('DOMContentLoaded', function() {
    // Function to add matrix video background to all sections
    function addMatrixBackgrounds() {
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        // Create matrix video element
        sections.forEach(function(section) {
            // Create video element
            const video = document.createElement('video');
            video.className = 'matrix-bg';
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            
            // Add source
            const source = document.createElement('source');
            source.src = 'assets/matrix-code.mp4'; // Path to the video file
            source.type = 'video/mp4';
            
            // Append source to video and video to section
            video.appendChild(source);
            
            // Check if the video is already present to avoid duplicate videos
            if (!section.querySelector('.matrix-bg')) {
                section.prepend(video);
            }
            
            // Start playing the video
            video.play().catch(error => {
                console.error('Error playing matrix background video:', error);
            });
        });
    }
    
    // Add matrix background videos
    addMatrixBackgrounds();
    
    // Fallback in case video doesn't load
    function handleVideoError() {
        const videos = document.querySelectorAll('.matrix-bg');
        videos.forEach(video => {
            video.addEventListener('error', function() {
                // Apply a matrix-like CSS animation background instead
                this.parentNode.classList.add('matrix-fallback');
                this.remove();
            });
        });
    }
    
    handleVideoError();
}); 
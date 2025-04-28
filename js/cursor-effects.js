document.addEventListener('DOMContentLoaded', function() {
    // Check if it's a touch device - don't apply cursor effects on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        return; // Exit early on touch devices
    }

    // Create cursor glow element
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    // Variables for tracking cursor movement and pulsation
    let lastMovement = Date.now();
    let isPulsating = false;
    let pulsateInterval;
    
    // Create an array to store trail elements
    const trails = [];
    const maxTrails = 15; // Maximum number of trail elements
    
    // Initialize trail elements
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 0;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            age: i * 2, // Stagger the initial age
            active: false
        });
    }
    
    // Function to create pulsating effect
    function startPulsatingEffect() {
        if (isPulsating) return;
        
        isPulsating = true;
        let growing = true;
        let size = 20;
        let intensity = 0.8;
        
        pulsateInterval = setInterval(() => {
            if (growing) {
                size += 0.5;
                intensity += 0.01;
                if (size >= 30) growing = false;
            } else {
                size -= 0.5;
                intensity -= 0.01;
                if (size <= 20) growing = true;
            }
            
            // Limit the max values
            size = Math.min(30, size);
            intensity = Math.min(0.95, intensity);
            
            // Apply the pulsating effect
            cursorGlow.style.width = size + 'px';
            cursorGlow.style.height = size + 'px';
            cursorGlow.style.backgroundColor = `rgba(57, 255, 20, ${intensity})`;
            cursorGlow.style.boxShadow = `0 0 ${size + 10}px ${size/2}px rgba(57, 255, 20, ${intensity - 0.1})`;
        }, 50);
    }
    
    function stopPulsatingEffect() {
        if (!isPulsating) return;
        
        clearInterval(pulsateInterval);
        isPulsating = false;
        
        // Reset to normal state
        cursorGlow.style.width = '20px';
        cursorGlow.style.height = '20px';
        cursorGlow.style.backgroundColor = 'rgba(57, 255, 20, 0.8)';
        cursorGlow.style.boxShadow = '0 0 25px 10px rgba(57, 255, 20, 0.7)';
    }
    
    // Position cursor glow at mouse position
    document.addEventListener('mousemove', function(e) {
        // Update time of last movement
        lastMovement = Date.now();
        
        // Stop pulsating when moving
        stopPulsatingEffect();
        
        // Update cursor glow position
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        
        // Add a new point to the trail
        for (let i = 0; i < trails.length; i++) {
            if (!trails[i].active) {
                // Add slight random offset for more organic feel
                const xOffset = (Math.random() - 0.5) * 6;
                const yOffset = (Math.random() - 0.5) * 6;
                
                trails[i].x = e.clientX + xOffset;
                trails[i].y = e.clientY + yOffset;
                trails[i].age = 0;
                trails[i].active = true;
                trails[i].size = Math.random() * 3 + 5; // Random variation in particle size
                trails[i].speed = Math.random() * 0.7 + 0.3; // Random variation in fade speed
                break;
            }
        }
    });
    
    // Interactive elements hover effect
    const interactiveElements = document.querySelectorAll('a, button, input, .skill-tag, .nav-links li, .logo');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorGlow.style.width = '35px';
            cursorGlow.style.height = '35px';
            cursorGlow.style.backgroundColor = 'rgba(57, 255, 20, 0.9)';
            cursorGlow.style.boxShadow = '0 0 35px 15px rgba(57, 255, 20, 0.8)';
            cursorGlow.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorGlow.style.width = '20px';
            cursorGlow.style.height = '20px';
            cursorGlow.style.backgroundColor = 'rgba(57, 255, 20, 0.8)';
            cursorGlow.style.boxShadow = '0 0 25px 10px rgba(57, 255, 20, 0.7)';
            cursorGlow.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
    
    // Animation loop for trail effect
    function animateTrail() {
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            
            if (trail.active) {
                // Use the particle's individual speed
                trail.age += trail.speed || 1;
                
                // Enhanced trail effect with more gradual fading
                const opacity = Math.max(0, 1 - (trail.age / 25));
                // Use the particle's individual base size
                const baseSize = trail.size || 8;
                const size = Math.max(2, baseSize - (trail.age / 6));
                
                trail.element.style.opacity = opacity;
                trail.element.style.width = size + 'px';
                trail.element.style.height = size + 'px';
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
                trail.element.style.boxShadow = `0 0 ${size * 1.5}px ${size/3}px rgba(57, 255, 20, ${opacity * 0.6})`;
                
                if (trail.age > 25) { // Increased lifespan for longer trails
                    trail.active = false;
                    trail.element.style.opacity = 0;
                }
            }
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Check for cursor stillness
    setInterval(() => {
        const now = Date.now();
        // If cursor hasn't moved for 2 seconds, start pulsating
        if (now - lastMovement > 2000 && !isPulsating) {
            startPulsatingEffect();
        }
    }, 500);
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements
    const body1Img = document.getElementById('body1-img');
    const body2Img = document.getElementById('body2-img');
    const arrowPath = document.getElementById('arrow-path');
    const curlyArrow = document.getElementById('curly-arrow');
    
    // Function to update arrow position based on image positions
    function updateArrowPosition() {
        // Get the positions of the images and content
        const body1Rect = body1Img.getBoundingClientRect();
        const body2Rect = body2Img.getBoundingClientRect();
        const contentElement = document.querySelector('.content');
        const contentRect = contentElement.getBoundingClientRect();
        const svgRect = curlyArrow.getBoundingClientRect();
        
        // Calculate start and end points for the arrow
        // Convert to SVG coordinate space
        const startX = (body1Rect.right - svgRect.left) * (1000 / svgRect.width);
        const startY = (body1Rect.bottom - svgRect.top) * (400 / svgRect.height);
        const endX = (body2Rect.left - svgRect.left) * (1000 / svgRect.width);
        const endY = (body2Rect.bottom - svgRect.top) * (400 / svgRect.height);
        
        // Calculate the bottom of the content section
        const contentBottom = (contentRect.bottom - svgRect.top) * (400 / svgRect.height);
        
        // Calculate control points for the curve to go below content
        const midX = (startX + endX) / 2;
        const peakY = Math.max(contentBottom, startY, endY) + 60; // 60 pixels below the content
        
        const controlX1 = startX + (midX - startX) * 0.5;
        const controlY1 = peakY;
        const controlX2 = midX + (endX - midX) * 0.5;
        const controlY2 = peakY;
        
        // Update the path
        const newPath = `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
        arrowPath.setAttribute('d', newPath);
        
        
        // Log positions for debugging
        console.log('Arrow positions updated:', { startX, startY, endX, endY, peakY });
    }
    
    // Add animation effects
    function animateArrow() {
        // Reset animations
        arrowPath.style.animation = 'none';
        arrowHead.style.animation = 'none';
        
        // Force reflow
        void arrowPath.offsetWidth;
        void arrowHead.offsetWidth;
        
        // Restart animations
        arrowPath.style.animation = 'dash 2s linear forwards';
        arrowHead.style.animation = 'fade-in 0.5s ease-in forwards';
        arrowHead.style.animationDelay = '1.5s';
    }
    
    // Initial positioning
    updateArrowPosition();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateArrowPosition();
        animateArrow();
    });
    
    // Add pulse effect every few seconds
    setInterval(() => {
        animateArrow();
    }, 5000);
    
    // Add hover effect on images
    body1Img.addEventListener('mouseenter', animateArrow);
    body2Img.addEventListener('mouseenter', animateArrow);
});
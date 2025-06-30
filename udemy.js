// Run this in browser console to create icon data URLs
function createIcon(size, color = '#667eea') {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    
    // Grid pattern
    ctx.fillStyle = '#ffffff';
    ctx.font = `${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('SG', size/2, size/2 + size/8);
    
    return canvas.toDataURL();
}

console.log('16x16:', createIcon(16));
console.log('48x48:', createIcon(48));
console.log('128x128:', createIcon(128));
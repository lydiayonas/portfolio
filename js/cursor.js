// CURSOR GLOW
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', function(e) {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});


document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('object');
    const gameContainer = document.getElementById('gameCanvas');
    let position = { x: 100, y: 100 };
    const moveSpeed = 2;
    let keysPressed = {};
    let facingRight = true;
  
    const backgroundMusic = document.getElementById('bgMusic');
    
    // Start the background music after user interaction
    const startMusic = () => {
      backgroundMusic.play().catch(error => {
        console.log("Audio autoplay blocked: ", error);
      });
      document.removeEventListener('keydown', startMusic);
      document.removeEventListener('click', startMusic);
    };
  
    document.addEventListener('keydown', startMusic);
    document.addEventListener('click', startMusic);
  
    document.addEventListener('keydown', (e) => {
      keysPressed[e.key] = true;
    });
  
    document.addEventListener('keyup', (e) => {
      keysPressed[e.key] = false;
    });
  
    // Function to create smoke effect
    function createSmoke() {
      const smoke = document.createElement('div');
      smoke.classList.add('smoke');
      smoke.style.left = `${position.x + 50}px`; 
      smoke.style.bottom = `${position.y + 50}px`; 
      gameContainer.appendChild(smoke);
  
      // Remove the smoke after animation completes
      setTimeout(() => {
        smoke.remove();
      }, 1500);
    }
  
    // Function to move the witch and create smoke while moving
    function movePlayer() {
      let isMoving = false;
      if (keysPressed['w'] || keysPressed['ArrowUp']) {
        position.y += moveSpeed;
        isMoving = true;
      }
      if (keysPressed['s'] || keysPressed['ArrowDown']) {
        position.y -= moveSpeed;
        isMoving = true;
      }
      if (keysPressed['a'] || keysPressed['ArrowLeft']) {
        position.x -= moveSpeed;
        isMoving = true;
        if (facingRight) {
          flipWitch(false);
          facingRight = false;
        }
      }
      if (keysPressed['d'] || keysPressed['ArrowRight']) {
        position.x += moveSpeed;
        isMoving = true;
        if (!facingRight) {
          flipWitch(true);
          facingRight = true;
        }
      }
  
      if (isMoving) {
        createSmoke(); // Create smoke when the witch is moving
      }
  
      updatePlayerPosition();
    }
  
    // Function to update the witch's position
    function updatePlayerPosition() {
      player.style.left = `${position.x}px`;
      player.style.bottom = `${position.y}px`;
    }
  
    // Function to flip the witch's direction
    function flipWitch(isFacingRight) {
      player.style.transform = isFacingRight ? 'scaleX(-1)' : 'scaleX(1)';
    }
  
    function gameLoop() {
      movePlayer();
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop();
  });
  
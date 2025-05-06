document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.style.display = 'none';
    });
  });

  document.querySelector('.window:nth-child(1)').addEventListener('click', (e) => {
    if (!e.target.classList.contains('close')) {
      const aboutSection = document.querySelector('.desktop');
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
// Smooth scroll to projects section when clicking on projects link
document.querySelector('.window:nth-child(2)').addEventListener('click', (e) => {
  if (!e.target.classList.contains('close')) {
    const projectsSection = document.querySelector('.projects-section');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelector('.window:nth-child(3)').addEventListener('click', (e) => {
  if (!e.target.classList.contains('close')) {
    const funFactsSection = document.querySelector('.fun-facts-section');
    funFactsSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Remove any hover-related JavaScript
document.querySelectorAll('.project-card').forEach(card => {
  // Remove any event listeners related to hover effects
  card.removeEventListener('mouseenter', () => {});
  card.removeEventListener('mouseleave', () => {});
});

// Identity rotator functionality
const identityRotator = document.querySelector('.identity-rotator');
const identityContainer = document.querySelector('.identity-container');
const identities = document.querySelectorAll('.identity');
const controlLever = document.querySelector('.control-lever');
let currentIdentity = 0;
let isSpinning = false;

// Set fixed height for container and all identities
const identityHeight = window.innerWidth <= 768 ? 36 : 40; // Responsive height
identityRotator.style.height = `${identityHeight}px`;

// Set all identities to same fixed height
identities.forEach(identity => {
  identity.style.height = `${identityHeight}px`;
});

// Simple rotation function
function rotateIdentity() {
  currentIdentity = (currentIdentity + 1) % identities.length;
  
  // Remove active class from all identities
  identities.forEach(identity => identity.classList.remove('active'));
  
  // Add active class to current identity
  identities[currentIdentity].classList.add('active');
  
  // Transform the container to show the current identity
  identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
}

// Spinning rotation effect
function spinIdentities() {
  if (isSpinning) return;
  isSpinning = true;
  
  // Save current transition
  const originalTransition = identityContainer.style.transition;
  
  // Change to fast transition
  identityContainer.style.transition = 'transform 0.1s linear';
  
  let spins = 0;
  const totalSpins = 8; // Number of rapid rotations
  const targetIdentity = (currentIdentity + 1) % identities.length;
  
  // Start spinning animation
  const spinInterval = setInterval(() => {
    spins++;
    
    // Rotate to next position
    currentIdentity = (currentIdentity + 1) % identities.length;
    identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
    
    // When approaching the end, slow down
    if (spins === totalSpins - 3) {
      identityContainer.style.transition = 'transform 0.3s ease-out';
    }
    
    // Stop at the target position
    if (spins >= totalSpins) {
      clearInterval(spinInterval);
      
      // Ensure we land on the target identity
      currentIdentity = targetIdentity;
      identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
      
      // Restore original transition
      identityContainer.style.transition = originalTransition;
      
      // Update active class
      identities.forEach(identity => identity.classList.remove('active'));
      identities[currentIdentity].classList.add('active');
      
      isSpinning = false;
    }
  }, 50);
}

// Add click event to control lever
controlLever.addEventListener('click', () => {
  spinIdentities();
});

// Remove automatic rotation
// setInterval(rotateIdentity, 3000);

// Update heights if window is resized
window.addEventListener('resize', () => {
  const newHeight = window.innerWidth <= 768 ? 36 : 40;
  identityRotator.style.height = `${newHeight}px`;
  
  identities.forEach(identity => {
    identity.style.height = `${newHeight}px`;
  });
  
  // Update transform to maintain correct position
  identityContainer.style.transform = `translateY(-${currentIdentity * newHeight}px)`;
});
  
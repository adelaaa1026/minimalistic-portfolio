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
  
// Smooth scroll  
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

 
document.querySelectorAll('.project-card').forEach(card => {
 
  card.removeEventListener('mouseenter', () => {});
  card.removeEventListener('mouseleave', () => {});
});

//   rotator  
const identityRotator = document.querySelector('.identity-rotator');
const identityContainer = document.querySelector('.identity-container');
const identities = document.querySelectorAll('.identity');
const controlLever = document.querySelector('.control-lever');
let currentIdentity = 0;
let isSpinning = false;

 
const identityHeight = window.innerWidth <= 768 ? 36 : 40; // Responsive height
identityRotator.style.height = `${identityHeight}px`;

//   all identities have same fixed height
identities.forEach(identity => {
  identity.style.height = `${identityHeight}px`;
});

 
function rotateIdentity() {
  currentIdentity = (currentIdentity + 1) % identities.length;
  
  
  identities.forEach(identity => identity.classList.remove('active'));
  
  
  identities[currentIdentity].classList.add('active');
  
   
  identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
}


function spinIdentities() {
  if (isSpinning) return;
  isSpinning = true;
  
 
  const originalTransition = identityContainer.style.transition;
  
 
  identityContainer.style.transition = 'transform 0.1s linear';
  
  let spins = 0;
  const totalSpins = 8; 
  const targetIdentity = (currentIdentity + 1) % identities.length;
  
  
  const spinInterval = setInterval(() => {
    spins++;
    
 
    currentIdentity = (currentIdentity + 1) % identities.length;
    identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
    
   
    if (spins === totalSpins - 3) {
      identityContainer.style.transition = 'transform 0.3s ease-out';
    }
    
    // stop at the target 
    if (spins >= totalSpins) {
      clearInterval(spinInterval);
      
   
      currentIdentity = targetIdentity;
      identityContainer.style.transform = `translateY(-${currentIdentity * identityHeight}px)`;
      
 
      identityContainer.style.transition = originalTransition;
      
     
      identities.forEach(identity => identity.classList.remove('active'));
      identities[currentIdentity].classList.add('active');
      
      isSpinning = false;
    }
  }, 50);
}
 
controlLever.addEventListener('click', () => {
  spinIdentities();
});

 
window.addEventListener('resize', () => {
  const newHeight = window.innerWidth <= 768 ? 36 : 40;
  identityRotator.style.height = `${newHeight}px`;
  
  identities.forEach(identity => {
    identity.style.height = `${newHeight}px`;
  });

  identityContainer.style.transform = `translateY(-${currentIdentity * newHeight}px)`;
});
  
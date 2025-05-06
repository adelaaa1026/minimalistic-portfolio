 
document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.querySelector('.progress-fill');
  
  const updateProgressBar = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressFill.style.width = `${progress}%`;
  };
  
  window.addEventListener('scroll', updateProgressBar);
  
 
  updateProgressBar();
  
 
  document.querySelector('.close').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}); 
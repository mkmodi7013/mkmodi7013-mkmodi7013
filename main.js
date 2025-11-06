// main.js - injects sample projects and handles contact form with fetch (AJAX)
document.addEventListener('DOMContentLoaded', function(){
  const projects = [
    {title: 'Portfolio Website', desc: 'This portfolio built with HTML/CSS/JS/PHP.'},
    {title: 'Todo App', desc: 'Simple JS todo app with localStorage.'},
    {title: 'Company Site', desc: 'Static responsive site for a small business.'}
  ];
  const grid = document.getElementById('projectsGrid');
  projects.forEach(p => {
    const el = document.createElement('div');
    el.className = 'project';
    el.innerHTML = '<h4>'+p.title+'</h4><p>'+p.desc+'</p>';
    grid.appendChild(el);
  });

  // Contact form - submit using fetch to contact.php and show status
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data
    }).then(r => r.json())
      .then(resp => {
        if(resp.success){
          status.textContent = 'Message sent. Thank you!';
          form.reset();
        } else {
          status.textContent = 'Failed to send: ' + (resp.error || 'Unknown error');
        }
      }).catch(err => {
        status.textContent = 'Network error';
      });
  });
});

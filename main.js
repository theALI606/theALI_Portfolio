
    // Theme toggle
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');
    if(stored) document.documentElement.setAttribute('data-theme', stored);
    btn.addEventListener('click',()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'light' ? '' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Simple canvas starry background in the aside
    const canvas = document.getElementById('bgCanvas');
    if(canvas){
      canvas.width = canvas.clientWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      // create moving stars
      const stars = [];
      for(let i=0;i<80;i++) stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.8,dx:(Math.random()-0.5)*0.2});
      function render(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for(const s of stars){
          ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='white';ctx.globalAlpha = 0.8*Math.random();ctx.fill();
          s.x += s.dx; if(s.x<0) s.x = canvas.width; if(s.x>canvas.width) s.x=0;
        }
        requestAnimationFrame(render);
      }
      render();
      // resize handling
      window.addEventListener('resize',()=>{canvas.width = canvas.clientWidth;canvas.height = 200});
    }

    // Form handler (placeholder)
    function handleSubmit(e){
      e.preventDefault();
      const f = e.target;
      const data = {name:f.name.value,email:f.email.value,message:f.message.value};
      alert('Xabaringiz qabul qilindi!\n' + JSON.stringify(data,null,2));
      f.reset();
    }

    // Small accessibility: smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'})}));


    
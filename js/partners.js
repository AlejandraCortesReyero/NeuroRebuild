// Add official local logo paths to the logo fields; empty values show names only.
const consortiumPartners = [
  {
    "name": "Universidad Politécnica de Madrid",
    "logo": "../assets/partners/upm.svg"
  },
  {
    "name": "UDIT",
    "logo": "../assets/partners/udit.png"
  },
  {
    "name": "La Palma Research Centre",
    "logo": "../assets/partners/la-palma.png"
  },
  {
    "name": "Thomas More University of Applied Sciences",
    "logo": "../assets/partners/thomas-more.svg"
  },
  {
    "name": "Queen’s University Belfast",
    "logo": "../assets/partners/queens-belfast.svg"
  },
  {
    "name": "Propeer Solutions",
    "logo": "../assets/partners/propeer.svg"
  },
  {
    "name": "Colin Neighbourhood Partnership",
    "logo": "../assets/partners/colin.png"
  },
  {
    "name": "National Academy of Fine Arts and Architecture",
    "logo": "../assets/partners/naoma.png"
  },
  {
    "name": "National Union of Architects of Ukraine",
    "logo": "../assets/partners/architects-ukraine.png"
  },
  {
    "name": "Lviv Regional State Administration",
    "logo": ""
  }
];
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-partner-rotation]').forEach(widget => {
    const pair = widget.querySelector('.partner-pair');
    let index = 0;
    function render() {
      pair.replaceChildren(...consortiumPartners.slice(index, index + 2).map(partner => {
        const item = document.createElement('div'); item.className = 'rotating-partner';
        if (partner.logo) {
          const image = document.createElement('img'); image.src = partner.logo; image.alt = '';
          image.addEventListener('error', () => image.remove(), {once:true}); item.append(image);
        }
        const name = document.createElement('span'); name.textContent = partner.name; item.append(name);
        return item;
      }));
      if (!motion.matches && pair.animate) pair.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'ease-out'});
    }
    function next() { index = (index + 2) % consortiumPartners.length; render(); }
    setInterval(() => {
      if (!motion.matches && !document.hidden && !widget.matches(':hover') && !widget.contains(document.activeElement)) next();
    }, 5000);
    render();
  });
})();

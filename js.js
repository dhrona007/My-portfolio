document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation buttons
    const navButtons = {
        b1: 'about',
        b2: 'experience',
        b3: 'skills',
        b4: 'projects',
        b5: 'contact'
    };

    // Add click listeners to all navigation buttons
    Object.keys(navButtons).forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', () => {
            const sectionId = navButtons[buttonId];
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for active section highlighting
    const sections = document.querySelectorAll('section');
    const navButtonsMap = {
        about: 'b1',
        experience: 'b2',
        skills: 'b3',
        projects: 'b4',
        contact: 'b5'
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeButtonId = navButtonsMap[entry.target.id];
                document.querySelectorAll('.btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                if (activeButtonId) {
                    document.getElementById(activeButtonId).classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}); 



particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    color: { value: '#00ff88' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  },
  retina_detect: true
});


window.addEventListener('scroll', reveal);

// Keep only this reveal function
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

//Theme toggle button 
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.getAttribute('data-theme') === 'light';
    htmlElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeToggle.textContent = isLight ? '🌒' : '🌞';
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

// Initialize theme from storage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌞' : '🌒';



const projects = [
    {
        title: "AI Mental Health Chatbot",
        image: "images/chatbotInterface.png",
        description: "NLP-powered chatbot for mental health support with 25% faster response time. Features include:\n- 24/7 availability\n- Emotion detection\n- Personalized guidance\n- Progress tracking",
        tech: ["Python", "Flask", "JavaScript", "AI/ML"],
        category: ["ai", "python", "web"],
        links: {
            github: "https://code.swecha.org/dhronachandra/mentalhealthcheckupbot",
            demo: "#"
        }
    },
    {
        title: "Body Type Assessment Tool",
        image: "images/AyurBotInterface.png",
        description: "Streamlit-based diagnostic tool with 85% accuracy rate. Features include:\n- Symptom analysis\n- Health recommendations\n- Report generation\n- User history tracking",
        tech: ["Python", "Streamlit", "AI/ML"],
        category: ["ai", "python"],
        links: {
            github: "https://github.com/dhrona007/ayurChatBot",
            demo: "#"
        }
    }
];

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initProjectGallery();
    // Keep other initialization code here
});

// Update the openModal function to handle line breaks
function openModal(project) {
    const modal = document.querySelector('.project-modal');
    modal.style.display = 'block';

    modal.querySelector('.modal-image').src = project.image;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').innerHTML = project.description.replace(/\n/g, '<br>');
    
    const techTags = modal.querySelector('.modal-tech');
    techTags.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const links = modal.querySelector('.modal-links');
    links.innerHTML = Object.entries(project.links).map(([type, url]) => 
        `<a href="${url}" class="btn" target="_blank">${type.charAt(0).toUpperCase() + type.slice(1)}</a>`
    ).join('');
}

// Initialize Project Gallery
// Update the initProjectGallery function in js.js
function initProjectGallery() {
    const grid = document.querySelector('.project-grid');
    grid.innerHTML = ''; // Clear existing content
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card reveal'; // Add reveal class
        card.dataset.category = project.category.join(' ');
        
        // Use placeholder image if none available
        const imgSrc = project.image || 'https://via.placeholder.com/300x200';
        
        card.innerHTML = `
            <img src="${imgSrc}" class="card-image" alt="${project.title}">
            <div class="card-content">
                <h4>${project.title}</h4>
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <p>${project.description}</p>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);
    });
    
    // Initialize reveal animations
    reveal();
}

// Filter Projects
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = filter === 'all' || card.dataset.category.includes(filter) 
                ? 'block' 
                : 'none';
        });
    });
});

// Modal Functionality
function openModal(project) {
    const modal = document.querySelector('.project-modal');
    modal.style.display = 'block';

    modal.querySelector('.modal-image').src = project.image;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').textContent = project.description;
    
    const techTags = modal.querySelector('.modal-tech');
    techTags.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const links = modal.querySelector('.modal-links');
    links.innerHTML = Object.entries(project.links).map(([type, url]) => 
        `<a href="${url}" class="btn" target="_blank">${type.charAt(0).toUpperCase() + type.slice(1)}</a>`
    ).join('');
}

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.querySelector('.project-modal').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.querySelector('.project-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

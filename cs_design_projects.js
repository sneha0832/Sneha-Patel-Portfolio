const grid = document.querySelector('.project-grid');
const btnDesign = document.getElementById('btn-design');
const btnCs = document.getElementById('btn-cs');

// Store projects globally so all functions can see them
let allProjects = [];

fetch('cs_design_projects.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        allProjects = data; // Save the data to our global variable
        renderProjects('design'); // Initial render
    })
    .catch(error => console.error('Error loading projects:', error));

    function renderProjects(filter) {
        grid.innerHTML = '';
        const filtered = allProjects.filter(p => p.category === filter);
        
        filtered.forEach(project => {
    
            // 2. NOW DEFINE THE CARD (using iconElements)
            const card = `
            <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                <div class="project-card">
                    <div class="card-content">
                        <div class="card-layout">
                            <img src="${project.image || 'images_1/placeholder.png'}"
                                class="project-image"
                                alt="${project.title}">
                            <div class="project-text">
                                <h2>${project.title}</h2>
                                <p>${project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
            
            grid.insertAdjacentHTML('beforeend', card);
        });
    }
// Event Listeners

btnDesign.addEventListener('click', () => {
    btnDesign.classList.add('active');
    btnCs.classList.remove('active');
    renderProjects('design');
});
btnCs.addEventListener('click', () => {
    btnCs.classList.add('active');
    btnDesign.classList.remove('active');
    renderProjects('cs');
});


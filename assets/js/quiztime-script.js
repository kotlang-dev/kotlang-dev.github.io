document.addEventListener('DOMContentLoaded', () => {
    // --- Tech Stack Tabs ---
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('active'));
                tab.classList.add('active');
                
                const target = document.getElementById(tab.dataset.tab);
                tabContents.forEach(content => content.classList.add('hidden'));
                
                if (target) {
                    target.classList.remove('hidden');
                }
            });
        });
    }

    // --- Architecture Info Box ---
    const archBoxes = document.querySelectorAll('.architecture-box');
    const infoBox = document.getElementById('architecture-info');
    
    if (archBoxes.length > 0 && infoBox) {
        const infoContent = {
            android: '<h3>🤖 Android Client</h3><p>The user-facing application built with 100% Kotlin and Jetpack Compose, following MVVM and Clean Architecture principles. It handles UI, state management, and offline caching.</p>',
            ktor: '<h3>🔧 Ktor Backend</h3><p>A lightweight, asynchronous backend server built with Kotlin. It provides the primary REST API for serving quiz questions from the database.</p>',
            spring: '<h3>⚙️ Spring Boot Backend</h3><p>An alternative backend built with Spring Boot and Kotlin. It serves the same REST API, demonstrating framework versatility.</p>',
            aws: '<h3>☁️ AWS Deployment</h3><p>The Ktor backend is deployed to AWS Elastic Beanstalk, making the API publicly accessible and scalable.</p>',
            mongodb: '<h3>🗄️ MongoDB</h3><p>A NoSQL database used to store all quiz questions, answers, and topics, providing flexible and scalable data persistence.</p>',
            default: '<p class="text-center text-indigo-800 dark:text-indigo-300 font-medium">Hover over an architecture component to see details here.</p>'
        };

        // Set default text initially
        infoBox.innerHTML = infoContent.default;

        archBoxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                const content = infoContent[box.dataset.id] || infoContent.default;
                infoBox.innerHTML = content;
            });
            box.addEventListener('mouseleave', () => {
                infoBox.innerHTML = infoContent.default;
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Dark Mode Toggle ---
    const themeToggleBtns = [
        document.getElementById('theme-toggle'),
        document.getElementById('mobile-theme-toggle')
    ].filter(Boolean); // Filter out nulls if an element doesn't exist on a page
    
    const sunIcons = document.querySelectorAll('.fa-sun');
    const moonIcons = document.querySelectorAll('.fa-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        } else {
            document.documentElement.classList.remove('dark');
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header .nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 70) { // 70px is approx header height
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Check if the link's href contains the current section's ID
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }


    // --- Scroll-to-Top Button Logic ---
    const toTopButton = document.getElementById('to-top-button');

    if (toTopButton) {
        window.addEventListener('scroll', () => {
            // Show button if user has scrolled down 300px
            if (window.scrollY > 300) {
                toTopButton.classList.add('show');
            } else {
                toTopButton.classList.remove('show');
            }
        });

        toTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // This creates the smooth scrolling effect
            });
        });
    }

    // --- Reusable Footer Injection ---
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {
        // The single source of truth for your footer content
        const footerHTML = `
            <div class="border-t border-slate-200 dark:border-slate-800">
                <div class="container mx-auto px-6 py-6 text-center text-slate-500 dark:text-slate-400">
                    <p>&copy; 2025 Mohammad Arif. All Rights Reserved.</p>
                </div>
            </div>
        `;
        // Inject the HTML into the placeholder
        footerPlaceholder.innerHTML = footerHTML;
    }
});
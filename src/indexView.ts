document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.topnav a');
    const pages: { [key: string]: HTMLElement | null } = {
        homeLink: document.getElementById('homePage'),
        createLink: document.getElementById('createGamePage'),
        viewLink: document.getElementById('viewGamesPage')
    };

    links.forEach(link => {
        link.addEventListener('click', function() {
            Object.values(pages).forEach(page => page!.style.display = 'none');
            const page = pages[link.id as keyof typeof pages];
            page!.style.display = 'block';
        });
    });

    pages.createLink!.style.display = 'block';
});
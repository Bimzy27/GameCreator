import { EventHandler } from "../eventHandler.js";

const pages: { [key: string]: string } = {
    loginPage: 'pages/loginPage.html',
    homeLink: 'pages/homePage.html',
    createLink: 'pages/createGamePage.html',
    viewLink: 'pages/ViewGamesPage.html'
};

const links = document.querySelectorAll('.topnav a');
links.forEach(link => {
    link.addEventListener('click', function() {
        EventHandler.getInstance().publish('activePageChanged', link.id);
    });
});

function setActivePageView(activePage: string)
{
    console.log('setActivePageView:', activePage);

    fetch(pages[activePage] as string)
        .then(response => response.text())
        .then(async data => {
            const container = document.getElementById('activePageContainer');
            if (container) {
                container.innerHTML = data;

                const scripts = container.querySelectorAll('script[type="module"]');
                await scripts.forEach(async script => {
                    const scriptSrc = (script as HTMLScriptElement).src;
                    if (scriptSrc) {
                        await import(scriptSrc);
                    }
                });

                EventHandler.getInstance().publish('activePageChangedComplete', 'activePage');
            } else {
                console.error('activePageContainer element not found');
            }
        })
        .catch(error => console.error('Error loading home page:', error));
}

EventHandler.getInstance().subscribe('activePageChanged', (activePage: string) => {
    setActivePageView(activePage);
});

EventHandler.getInstance().publish('activePageChanged', 'loginPage');


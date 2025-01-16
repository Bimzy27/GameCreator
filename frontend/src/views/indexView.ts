import { Resolver } from "../engine/resolver.js";
import { engineEvent, EventService } from "../engine/services/eventService.js";

const pages: { [key: string]: string } = {
    loginPage: 'pages/loginPage.html',
    homeLink: 'pages/homePage.html',
    createLink: 'pages/gameEditorPage.html',
    viewLink: 'pages/ViewGamesPage.html'
};

const links = document.querySelectorAll('.topnav a');
links.forEach(link => {
    link.addEventListener('click', function() {
        Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, link.id);
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

                Resolver.resolve(EventService).publish(engineEvent.ActivePageChangedCompleted, activePage);
            } else {
                console.error('activePageContainer element not found');
            }
        })
        .catch(error => console.error('Error loading home page:', error));
}

Resolver.resolve(EventService).subscribe(engineEvent.ActivePageChanged, (activePage: string) => {
    setActivePageView(activePage);
});

Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, 'loginPage');


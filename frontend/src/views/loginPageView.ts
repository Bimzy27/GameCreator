import { Resolver } from "../engine/resolver.js";
import { engineEvent, EventService } from "../engine/services/eventService.js";

const statusLbl = document.getElementById('statusLbl');
if (statusLbl) {
    statusLbl.textContent = 'TODO Implement Login';
    Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, 'homeLink');
}
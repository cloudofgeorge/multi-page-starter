import { serviceWorker } from './service-worker';
import './styles/main.scss';
import { initBootstrap } from './app/bootstrap';

serviceWorker.register();

initBootstrap();

// code here

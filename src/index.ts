import { serviceWorker } from './service-worker';
import './styles/main.scss';
import { initBootstrap, Bootstrap } from './app/bootstrap';

serviceWorker.register();

initBootstrap(new Bootstrap());

// code here

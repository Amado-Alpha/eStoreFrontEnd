import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

// prettier-ignore
createApp(App)
    .use(router)
    .use(store)
    .use(Toast)
    .mount('#app');

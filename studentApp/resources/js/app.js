import './bootstrap';
import { createApp } from 'vue';
import SpaApp from './SpaApp.vue';
import router from './router'

createApp(SpaApp)
    .use(router)
    .mount('#app');

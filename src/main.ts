import { createApp } from 'vue';
import App from './App.vue';
import router from './routes.ts';
import './style.css';
import './assets/styles.css';


createApp(App).use(router).mount('#app');

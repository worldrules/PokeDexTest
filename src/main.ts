import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './routes.ts';
import './assets/styles.css';
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css';


const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount('#app');

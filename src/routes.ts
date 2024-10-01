// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import PokemonDetail from './components/PokemonDetail.vue';
import Favorites from './components/Favorites.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetail,
        props: true,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        voltar: 'Back',
        favorites: 'Favorites',
        'nenhum': 'No favorites',
    },
    pt: {
        voltar: 'Voltar',
        favorites: 'Favoritos',
        'nenhum': 'Nenhum favorito',
    },

};

const i18n = createI18n({
    locale: 'pt',
    messages,
});

export default i18n;
import PokemonCard from '../../src/components/PokemonCard.vue';
import Favorites from '../../src/components/Favorites.vue';
import { mount } from '@vue/test-utils';
import i18n from './i18n.mock';

const mockPokemons = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
];

beforeEach(() => {
    localStorage.setItem('favoritePokemons', JSON.stringify(mockPokemons));
});

describe('Favorites.vue', () => {
    it('deve renderizar corretamente com os Pokémon favoritos', () => {
        const wrapper = mount(Favorites, {
            global: {
                components: { PokemonCard },
                plugins: [i18n],
            },
        });

        expect(wrapper.findAllComponents(PokemonCard)).toHaveLength(2);
    });

    it('deve exibir mensagem "Nenhum favorito" se não houver Pokémon', () => {
        localStorage.setItem('favoritePokemons', JSON.stringify([]));
        const wrapper = mount(Favorites, {
            global: {
                plugins: [i18n],
            },
        });

        expect(wrapper.text()).toContain('Nenhum favorito');
    });

    it('deve chamar a função goBack ao clicar no botão "Voltar"', async () => {
        const wrapper = mount(Favorites, {
            global: {
                plugins: [i18n],
            },
        });
        const goBackMock = jest.spyOn(wrapper.vm, 'goBack');

        const backButton = wrapper.find('.back-button');
        await backButton.trigger('click');

        expect(goBackMock).toHaveBeenCalled();
    });

    it('deve remover o Pokémon dos favoritos ao chamar toggleFavorite', async () => {
        const wrapper = mount(Favorites, {
            global: {
                plugins: [i18n],
            },
        });

        await wrapper.vm.toggleFavorite('25');

        const favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');
        expect(favoritePokemons).toHaveLength(1);
        expect(favoritePokemons[0].name).toBe('Charmander');
    });
});


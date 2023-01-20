import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemonList from '../data';

describe('Testes do componente <Pokemon.js />', () => {
  it('É renderizado um card com as informações de determinado Pokémon:', async () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ 25 } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getAllByRole('img');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImg[0].src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg[0].alt).toBe('Pikachu sprite');

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeInTheDocument();
  });

  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemonList[0] } isFavorite={ 25 } />,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails.href).toBe('http://localhost/pokemon/25');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ 25 } />);
    const img = screen.getAllByRole('img');

    expect(img[1].src).toBe('http://localhost/star-icon.svg');
    expect(img[1].alt).toBe('Pikachu is marked as favorite');
  });
});

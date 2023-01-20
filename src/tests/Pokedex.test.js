import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import { Pokedex } from '../pages';

const fetchPokemonTypes = () => [...new Set(data
  .reduce((types, { type }) => [...types, type], []))];

describe('Testes do componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);
    const title = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });

    expect(title).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();

    data.forEach(({ name }, index) => {
      if (index === 8) {
        userEvent.click(nextPokemonBtn);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      } else {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextPokemonBtn);
      }
    });
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);
    const pokemonList = screen.getAllByTestId('pokemon-name');

    expect(pokemonList).toHaveLength(1);
  });

  it('A Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const resetButton = screen.getByRole('button', { name: /all/i });

    expect(typeButtons).toHaveLength(7);
    expect(resetButton).toBeInTheDocument();
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);

    const types = fetchPokemonTypes();
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /all/i });

    types.forEach((type, index) => {
      expect(type).toBe(typeButtons[index].innerHTML);
      expect(allButton).toBeInTheDocument();
    });
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<Pokedex pokemonList={ data } isPokemonFavoriteById={ 25 } />);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const allPokemons = screen.getByRole('button', { name: /all/i });
    const pokemonsFireType = data.filter(({ type }) => type === 'Fire');

    expect(fireButton).toBeInTheDocument();
    userEvent.click(fireButton);

    pokemonsFireType.forEach(({ name }) => {
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(fireButton.innerHTML);
      userEvent.click(nextPokemon);
    });

    userEvent.click(allPokemons);

    data.forEach(({ name }, index) => {
      if (index === 8) {
        userEvent.click(nextPokemon);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      } else {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextPokemon);
      }
    });
  });
});

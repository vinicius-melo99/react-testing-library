import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <PokemonDetails.js />', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();

    const pokemonTitle = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();
    expect(pokemonTitle).toBeInTheDocument();

    const summaryText = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(summaryText).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();

    const locationTitle = screen.getByRole('heading', { level: 2, name: /Game Locations of pikachu/i });
    expect(locationTitle).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const mapImage1 = images[1];
    const mapImage2 = images[2];

    expect(mapImage1.src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImage2.src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapImage1.alt).toBe('Pikachu location');
    expect(mapImage2.alt).toBe('Pikachu location');

    const locationName1 = screen.getByText('Kanto Viridian Forest');
    const locationName2 = screen.getByText('Kanto Power Plant');

    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
  });

  it('O usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    let images = screen.getAllByRole('img');
    expect(images[1].src).toBe('http://localhost/star-icon.svg');

    userEvent.click(checkbox);
    images = screen.getAllByRole('img');
    expect(images[1].src).not.toBe('http://localhost/star-icon.svg');
  });
});

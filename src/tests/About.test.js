import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testes do componente <About.js />.', () => {
  it('A página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i;
    const p2 = /One can filter Pokémon by type, and see more details for each one of them/i;

    expect(screen.queryByText(p1)).toBeInTheDocument();
    expect(screen.queryByText(p2)).toBeInTheDocument();
  });

  it('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.queryByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i;
    const p2 = /One can filter Pokémon by type, and see more details for each one of them/i;
    const paragraphs = [];

    paragraphs.push(screen.getByText(p1));
    paragraphs.push(screen.getByText(p2));

    expect(paragraphs).toHaveLength(2);
  });

  it('A página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.queryByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

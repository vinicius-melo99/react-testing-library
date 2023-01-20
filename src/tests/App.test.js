import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);
    const linksName = ['Home', 'About', 'Favorite Pokémon'];
    const pageLinks = [];

    linksName.forEach((link) => {
      const pageLink = screen.queryByRole('link', { name: link });
      if (pageLink) {
        pageLinks.push(pageLink);
      }
    });
    expect(pageLinks).toHaveLength(3);

    pageLinks.forEach((pageLink, index) => {
      expect(pageLink.innerHTML).toBe(linksName[index]);
    });
  });

  it('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página de About, na URL /about ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(pokemonLink).toBeInTheDocument();
    userEvent.click(pokemonLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/url/invalida');
    });

    const errorMessage = screen.getByText(/Page requested not found/i);
    expect(errorMessage).toBeInTheDocument();
    // console.log('errorMessage');
  });
});

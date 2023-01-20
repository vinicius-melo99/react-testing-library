import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes do componente <NotFound.js />', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const NFTitle = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(NFTitle).toBeInTheDocument();
  });

  it('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

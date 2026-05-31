import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Fixture() {
  useScrollReveal();
  return <div className="r" data-testid="el">content</div>;
}

describe('useScrollReveal', () => {
  it('adds in class to hero elements immediately', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <section id="hero">
          <Fixture />
        </section>
      </MemoryRouter>
    );
    expect(getByTestId('el')).toHaveClass('in');
  });

  it('observes non-hero .r elements via IntersectionObserver', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Fixture />
      </MemoryRouter>
    );
    // jsdom IntersectionObserver mock doesn't fire, so element stays without 'in'
    expect(getByTestId('el')).not.toHaveClass('in');
  });
});

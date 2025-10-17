import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button (web)', () => {
  it('renders default (primary) variant', () => {
    render(<Button>Schedule a call</Button>);
    const btn = screen.getByRole('button', { name: /schedule a call/i });
    expect(btn).toBeInTheDocument();
  });

  it('applies secondary gradient class', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button', { name: /secondary/i });
    expect(btn.className).toContain('bg-gradient-secondary');
  });

  it('supports disabled/loading state', () => {
    render(
      <Button disabled loading>
        Loading
      </Button>
    );
    const btn = screen.getByRole('button', { name: /loading/i });
    expect(btn).toBeDisabled();
  });
});



import { render, screen } from '@testing-library/react';
import About from './containers/About';

test('renders the About page', () => {
  render(<About />);
  const hdEl = screen.getByText(/about my iot solution/i);
  expect(hdEl).toBeInTheDocument();
});

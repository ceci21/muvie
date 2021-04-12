import { render } from '@testing-library/react';
import mockEntry from '../../mocks/entry.json';
import MovieCard from '.';

test('It should have a title', () => {
  const { getByText } = render(<MovieCard entry={mockEntry} />);
  expect(getByText(/Deadpool/i)).toBeInTheDocument()
});

test('It should have a description', () => {
  const { getByText }  = render(<MovieCard entry={mockEntry} />);
  expect(getByText(/Lorem ipsum interestingus movius/i)).toBeInTheDocument();
});

test('It Should have alt text', () => {
  render(<MovieCard entry={mockEntry} />);
  expect(document.querySelector('[alt="Deadpool - The Movie Database"]')).toBeInTheDocument('')
});

import { render } from '@testing-library/react';

import ScrollToTopBtn from '.';

test('It should show the input entered by the user', () => {
  const { getByText } = render(<ScrollToTopBtn />);
  expect(getByText(/up to top/i)).toBeInTheDocument();
});

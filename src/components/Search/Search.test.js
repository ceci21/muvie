import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import Search from '.';

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const input = utils.getByPlaceholderText('Search for your favorite movies');
  return {
    input,
    ...utils,
  }
}

test('It should show the input entered by the user', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'Deadpool' } });
  expect(input.value).toBe('Deadpool');
})

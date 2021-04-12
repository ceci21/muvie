import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import MovieSection from '.';


test('It should show the input entered by the user', () => {
  render(
    <Provider store={store}>
      <MovieSection />
    </Provider>
  );
  expect(document.querySelector('#movie-section')).toBeInTheDocument();
})

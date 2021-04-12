import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import App from '../App';


test('renders title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Muvie/i)).toBeInTheDocument();
  expect(getByText(/The Movie Database/i)).toBeInTheDocument();
});

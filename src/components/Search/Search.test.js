import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import Search from '../Search';
const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
)

const setup = () => {
  const utils = render(<Search />)
  const input = utils.getByPlaceholderText('Search for your favorite movies');
  return {
    input,
    ...utils,
  }
}

test('It should keep a $ in front of the input', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'Deadpool' } })
  expect(input.value).toBe('Deadpool')
})

test("...", () => {
  const store = configureStore();
  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );
  const { result } = renderHook(() => {
    useSaveAuthenticationDataToStorages(useDispatch());
  }, { wrapper });
  // ... Rest of the logic
});

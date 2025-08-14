
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For better assertions
import App from '../App';
import { AuthProvider } from '../Authentication/AuthContext';
import { render, screen } from '../../testutils';
import WorldLedger from './WorldLedger';

beforeEach(() => {
});

test('above break', () => {

  render(<WorldLedger/>);
});


test('below break', () => {
  render(<WorldLedger/>);
});


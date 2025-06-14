import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MailingForm } from './MailingForm';


describe('MailingForm', () => {
  it('is labeled "mailing" in text', () => {
    render(<MailingForm />);
    expect(screen.getByText(/mailing/i)).toBeInTheDocument();
  });

  it('rejects non-emails with message', async () => {
    render(<MailingForm />);

    fireEvent.input(screen.getByTestId('mailing-form-email-input'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByTestId('mailing-form-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('mailing-form-email-error')).toHaveTextContent(/Please enter a valid email address./i);
    });

  //  userEvent.type(inputElement, 'Hello World');
  //  userEvent.keyboard('{Enter}')
  });
});

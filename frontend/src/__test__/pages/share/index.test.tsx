import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Share from '.';

describe('Share Component', () => {
  it('renders without crashing', () => {
    const shareVideo = jest.fn();
    const { getByText } = render(
      <Router>
        <Share isLoggedIn={true} user={{ id: 1 }} shareVideo={shareVideo} loading={false} />
      </Router>,
    );
    expect(getByText('Share a Youtube movie')).toBeInTheDocument();
  });

  it('redirects if user is not logged in', () => {
    const shareVideo = jest.fn();
    const { queryByText } = render(
      <Router>
        <Share isLoggedIn={false} user={{ id: 1 }} shareVideo={shareVideo} loading={false} />
      </Router>,
    );
    expect(queryByText('Share a Youtube movie')).not.toBeInTheDocument();
  });

  it('disables the input and button while loading', () => {
    const shareVideo = jest.fn();
    const { getByText, getByLabelText } = render(
      <Router>
        <Share isLoggedIn={true} user={{ id: 1 }} shareVideo={shareVideo} loading={true} />
      </Router>,
    );
    expect(getByLabelText('Youtube URL')).toBeDisabled();
    expect(getByText('Share')).toBeDisabled();
  });

  it('calls shareVideo on form submission', async () => {
    const shareVideo = jest.fn();
    const { getByText, getByLabelText } = render(
      <Router>
        <Share isLoggedIn={true} user={{ id: 1 }} shareVideo={shareVideo} loading={false} />
      </Router>,
    );
    fireEvent.change(getByLabelText('Youtube URL'), {
      target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    });
    fireEvent.click(getByText('Share'));
    await waitFor(() => expect(shareVideo).toHaveBeenCalled());
  });

  it('shows error message when URL is invalid', async () => {
    const shareVideo = jest.fn();
    const { getByText, getByLabelText, findByText } = render(
      <Router>
        <Share isLoggedIn={true} user={{ id: 1 }} shareVideo={shareVideo} loading={false} />
      </Router>,
    );
    fireEvent.change(getByLabelText('Youtube URL'), { target: { value: 'invalid url' } });
    fireEvent.click(getByText('Share'));
    expect(await findByText('Youtube URL invalid')).toBeInTheDocument();
  });
});

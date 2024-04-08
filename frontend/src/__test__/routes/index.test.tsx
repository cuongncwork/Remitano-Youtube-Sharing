import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Routing from '.';

describe('Routing Component', () => {
  it('calls checkLoggedIn and getVideos on render', () => {
    const checkLoggedIn = jest.fn();
    const getVideos = jest.fn();

    render(
      <Router>
        <Routing checkLoggedIn={checkLoggedIn} getVideos={getVideos} />
      </Router>,
    );

    expect(checkLoggedIn).toHaveBeenCalled();
    expect(getVideos).toHaveBeenCalled();
  });

  it('renders Home component on "/" route', () => {
    const checkLoggedIn = jest.fn();
    const getVideos = jest.fn();
    const { getByText } = render(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routing checkLoggedIn={checkLoggedIn} getVideos={getVideos} />
      </Router>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('renders Share component on "/share" route', () => {
    const checkLoggedIn = jest.fn();
    const getVideos = jest.fn();
    const { getByText } = render(
      <Router>
        <Routes>
          <Route path="/share" element={<Share />} />
        </Routes>
        <Routing checkLoggedIn={checkLoggedIn} getVideos={getVideos} />
      </Router>,
    );

    expect(getByText('Share')).toBeInTheDocument();
  });
});

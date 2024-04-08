import { render, fireEvent } from '@testing-library/react';
import { Vote } from '../../types';
import Home from '.';

describe('Home', () => {
  const mockVoteVideo = jest.fn();
  const mockRemoveVoteVideo = jest.fn();

  const videos = [
    {
      id: '1',
      title: 'Test Video 1',
      description: 'Test Description 1',
      embed_html: '<iframe></iframe>',
      user: { id: '1', email: 'test1@example.com' },
      votes: [],
    },
    {
      id: '2',
      title: 'Test Video 2',
      description: 'Test Description 2',
      embed_html: '<iframe></iframe>',
      user: { id: '2', email: 'test2@example.com' },
      votes: [],
    },
  ];

  const user = { id: '3', email: 'test3@example.com' };

  it('renders correctly', () => {
    const { getByText } = render(
      <Home
        videos={videos}
        user={user}
        voteVideo={mockVoteVideo}
        removeVoteVideo={mockRemoveVoteVideo}
      />,
    );

    expect(getByText('Test Video 1')).toBeInTheDocument();
    expect(getByText('Test Video 2')).toBeInTheDocument();
  });

  it('handles voting correctly', () => {
    const { getAllByRole } = render(
      <Home
        videos={videos}
        user={user}
        voteVideo={mockVoteVideo}
        removeVoteVideo={mockRemoveVoteVideo}
      />,
    );

    const voteButtons = getAllByRole('button');
    fireEvent.click(voteButtons[0]);

    expect(mockVoteVideo).toHaveBeenCalledWith({
      vote: { user_id: user.id, video_id: videos[0].id, vote_type: 1 },
    });
  });

  it('handles vote removal correctly', () => {
    const votedVideos = [
      {
        ...videos[0],
        votes: [{ user_id: user.id, vote_type: 1 } as Vote],
      },
      ...videos.slice(1),
    ];

    const { getAllByRole } = render(
      <Home
        videos={votedVideos}
        user={user}
        voteVideo={mockVoteVideo}
        removeVoteVideo={mockRemoveVoteVideo}
      />,
    );

    const voteButtons = getAllByRole('button');
    fireEvent.click(voteButtons[0]);

    expect(mockRemoveVoteVideo).toHaveBeenCalledWith(votedVideos[0].votes[0]);
  });
});

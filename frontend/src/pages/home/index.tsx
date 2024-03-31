import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { StateProp, User, Video, Vote, VoteParams } from '../../types';
import { Col, Container, Row } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpFill } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faThumbsDownFill } from '@fortawesome/free-solid-svg-icons';
import { HomeActions } from '../../core/adapters/redux/reducer/home';

type HomeProps = {
  videos: Video[];
  user: User;
  voteVideo: (params: VoteParams) => void;
  removeVoteVideo: (vote: Vote) => void;
};

const Home: FunctionComponent<HomeProps> = (props) => {
  const { videos, user, voteVideo, removeVoteVideo } = props;

  return (
    <Container>
      {videos.map((video) => {
        const { id, title, description, embed_html, user: videoUser, votes } = video;
        const voted: Vote | undefined = votes.find((vote) => vote.user_id === user?.id);
        const totalLike: number = votes.filter((vote) => vote.vote_type === 1)?.length || 0;
        const totalUnLike: number = votes.filter((vote) => vote.vote_type === -1)?.length || 0;

        return (
          <Row key={id} className="mt-3 movie-item-container">
            <Col sm={12} md={5} className="movie-video">
              <div dangerouslySetInnerHTML={{ __html: embed_html }} />
            </Col>
            <Col sm={12} md={7}>
              <div className="d-flex">
                <div className="left">
                  <div className="movie-title">{title}</div>
                  <div className="movie-shared-by mt-2">
                    <strong>Shared by:</strong> {videoUser.email}
                  </div>
                  <div className="movie-vote mt-2">
                    <span className="me-3">
                      {totalLike}&nbsp;
                      <FontAwesomeIcon icon={faThumbsUp} size="1x" />
                    </span>
                    <span>
                      {totalUnLike}&nbsp;
                      <FontAwesomeIcon icon={faThumbsDown} size="1x" />
                    </span>
                  </div>
                </div>
                {user && videoUser.id !== user.id && (
                  <>
                    {voted ? (
                      <span
                        className="cursor-pointer d-flex align-items-center"
                        onClick={() => removeVoteVideo(voted)}
                      >
                        {voted.vote_type === 1 ? (
                          <FontAwesomeIcon icon={faThumbsUpFill} size="2x" />
                        ) : (
                          <FontAwesomeIcon icon={faThumbsDownFill} size="2x" />
                        )}
                      </span>
                    ) : (
                      <div className="d-flex align-items-center">
                        <span
                          className="me-3 cursor-pointer d-flex align-items-center"
                          onClick={() =>
                            voteVideo({
                              vote: { user_id: user.id, video_id: video.id, vote_type: 1 },
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faThumbsUp} size="2x" />
                        </span>
                        <span
                          className="cursor-pointer d-flex align-items-center"
                          onClick={() =>
                            voteVideo({
                              vote: { user_id: user.id, video_id: video.id, vote_type: -1 },
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faThumbsDown} size="2x" />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="movie-description-title mt-2">Description:</div>
              <div className="movie-description-content">{description}</div>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

const mapStateToProps = (state: StateProp) => ({
  videos: state.home.videos,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  voteVideo: (params: VoteParams) => dispatch(HomeActions.voteVideo(params)),
  removeVoteVideo: (vote: Vote) => dispatch(HomeActions.removeVoteVideo(vote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

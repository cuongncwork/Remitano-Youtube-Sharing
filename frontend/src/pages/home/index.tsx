import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { StateProp, User, Video } from '../../types';
import { Col, Container, Row } from 'react-bootstrap';
import { Dispatch } from 'redux';

import './style.scss';

type HomeProps = {
  videos: Video[];
  user: User;
};

const Home: FunctionComponent<HomeProps> = (props) => {
  const { videos, user } = props;

  return (
    <Container>
      {videos.map((video) => {
        const { id, title, description, embed_html, user: videoUser, votes } = video;

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
                </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

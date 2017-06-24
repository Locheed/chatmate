import React from 'react';
import PropTypes from 'prop-types';

const YouTubeEmbed = ({ queryID }) => {
  return (
    <div className="youtube-container">
      <iframe
        className="youtube-player"
        width="640"
        height="360"
        title={queryID}
        id="ytplayer"
        type="text/html"
        src={`https://www.youtube.com/embed/${queryID}?autoplay=0&origin=http://example.com`}
        frameBorder="0"
      />
    </div>
  );
};

YouTubeEmbed.propTypes = {
  queryID: PropTypes.string.isRequired,
};

export default YouTubeEmbed;

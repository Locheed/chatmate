import React from 'react';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';
import linkifyHtml from 'linkifyjs/html';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import Remarkable from 'remarkable';
import hljs from 'highlightjs';
import YouTubeEmbed from './YouTubeEmbed';

// ************** Remarkable config block ***************
const md = new Remarkable({
  linkify: false,
  langPrefix: 'language-',
  typographer: true,
  breaks: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        // Empty
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {
      // Empty
    }
    return ''; // use external default escaping
  },
});
// Twitter hashtag support for links
hashtag(linkify);

// ************** YouTube Embed config block ****************
function youtubeParser(text) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?\s]*)/;
  const match = text.match(regExp);
  // Return an YouTube ID string
  return match && match[2].length === 11 ? match[2] : false;
}

const Message = props => {
  const { message, sendTime, author, error, errorMsg, email } = props.message;
  const { themeSelected } = props;
  const options = {
    className: `linkified ${themeSelected}`,
    formatHref: {
      hashtag: val => `https://twitter.com/hashtag/${val.substr(1)}?src=hash`,
    },
  };
  const mdMessage = md.render(message); // Convert text to markdown if needed

  const regEx = /[^]*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  return (
    <div className="message-container">
      <div className="nick-time">
        <div className="message-pic-nick-container">
          <Gravatar
            className="message-pic"
            md5={email}
            default="wavatar"
            size={40}
          />
          <p className="message-nick">{author}</p>
        </div>
        <p className="message-time">{sendTime}</p>
      </div>
      <div className="message-wrapper">
        <p
          className="message"
          dangerouslySetInnerHTML={{ __html: linkifyHtml(mdMessage, options) }}
        />
        {message.match(regEx)
          ? <YouTubeEmbed queryID={youtubeParser(message)} />
          : null}
      </div>
      {error
        ? <div className="message-error">
          <p>
            {error}<br />
            <span className="message-error-msg">{errorMsg}</span>
          </p>
        </div>
        : null}
      <hr className="message-divider" />
    </div>
  );
};

Message.propTypes = {
  themeSelected: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
};

Message.defaultProps = {};

export default Message;

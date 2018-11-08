import { Component } from 'react';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';

/**
 * WebfontLoader class
 */
class WebfontLoader extends Component {
  static isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  componentDidMount() {
    const config = this.getConfig();

    if (!config.custom && !config.google) {
      return;
    }

    WebFont.load(config);
  }

  getConfig() {
    const { classes, events, timeout, google, custom } = this.props;

    const WebFontConfig = {
      classes,
      events,
      timeout,
      google,
      custom,
    };

    if (WebfontLoader.isEmpty(custom)) {
      delete WebFontConfig.custom;
    }

    if (WebfontLoader.isEmpty(google)) {
      delete WebFontConfig.google;
    }

    return WebFontConfig;
  }

  render() {
    return this.props.children;
  }
}

WebfontLoader.defaultProps = {
  classes: true,
  custom: {},
  events: true,
  google: {},
  timeout: 3000,
};

WebfontLoader.propTypes = {
  /** Contents that need to be rendered under font loading callback status */
  children: PropTypes.element.isRequired,
  /** Setting this to false disables html classes */
  classes: PropTypes.bool,
  /** @see https://github.com/typekit/webfontloader#custom */
  custom: PropTypes.shape({
    families: PropTypes.arrayOf(PropTypes.string),
    urls: PropTypes.arrayOf(PropTypes.string),
    testStrings: PropTypes.shape({}),
  }),
  /** Setting this to false will disable callbacks/events */
  events: PropTypes.bool,
  /** @see https://github.com/typekit/webfontloader#google */
  google: PropTypes.shape({
    families: PropTypes.arrayOf(PropTypes.string),
    /** Character subsetting */
    text: PropTypes.string,
  }),
  /** Fontinactive callback will be triggered after specified amount of ms */
  timeout: PropTypes.number,
};

export default WebfontLoader;

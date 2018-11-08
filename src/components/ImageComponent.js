import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer';
import styled, { css } from 'styled-components';
import { getMediaQuery, getBreakPoints, getSourcePath, findSource, formatWidth, supportsWebP } from '../utils';
import * as layouts from '../config/layouts';
import classNames from "classnames";

import './style.css';
import preloaderDefault from '../images/loader.gif';

const defaultTag = 'div';

const Wrapper = styled.div`
  &, ${defaultTag} {
    display: block;
    position: relative;
  }
`;

const StyledPreloader = styled.img`{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px; 
}`;

const StyledThumb = styled.img`{
  position: static;
  transition: opacity 700ms ease-in-out;
  filter: blur(4px);
  
  ${({responsive, imgWidth}) => {
    if (typeof imgWidth === 'object') {
      return Object.keys(layouts).map((id) => {
        const layoutWidth = imgWidth[id];
        
        return layoutWidth !== undefined && css`
          @media ${getMediaQuery(id)} {
            width: ${formatWidth(layoutWidth)};
          }
        `;
      });
    }
  
    if (imgWidth) {
      return css`
        width: ${formatWidth(imgWidth)};
      `;
    }
    
    return css`
      width: ${responsive ? '100%' : 'auto'};
    `;
  }}
`;

const StyledImg = styled(StyledThumb)`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  transition: none;
  filter: none;
`;

/**
 * Image component:
 * - lazy-loaded,
 * - checks for webp support with fallback to jpg,
 * - supports:
 *    - multiple sources with breakpoints,
 * - for the better user experience could be optionally added:
 *    - progressive image loading
 *    - preloader
 */
class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateSrc = this.updateSrc.bind(this);
    this.state = {
      src: null,
      supportsWebP: undefined,
      sizes: this.props.sources ? getBreakPoints(this.props.sources) : [],
      visible: false,
    };
  }

  componentDidMount() {
    supportsWebP(supports => this.setState({ supportsWebP: supports }));

    if (this.props.sources) {
      window.addEventListener('resize', this.updateSrc, false);
    }
  }

  componentWillUnmount() {
    if (this.props.sources) {
      window.removeEventListener('resize', this.updateSrc, false);
    }
  }

  handleChange(inView) {
    inView && this.updateSrc();
  };

  getWrapperWidth() {
    return this.wrapper ? this.wrapper.clientWidth : 0;
  }

  updateSrc() {
    const width = this.props.checkWrapperWidth ? this.getWrapperWidth() : document.body.clientWidth;
    const src = findSource(width, { sources: this.props.sources, fallbackSrc: this.props.src });
    const srcPath = getSourcePath(src, { hasWebPSupport: this.state.supportsWebP });

    if (!this.props.progressive && !this.props.withPreloader) {
      this.setState({src: srcPath, visible: true});
      return;
    }

    const buffer = new Image();
    buffer.src = srcPath;
    buffer.onload = () => this.setState({
      src: srcPath,
      visible: true
    });
  }

  render() {
    const { sources, width, progressive, placeholderImage, preloader = preloaderDefault, withPreloader, alt, className} = this.props;
    const { src, visible } = this.state;

    return (
      <Wrapper innerRef={(element) => { this.wrapper = element; }} className={className}>
        <Observer triggerOnce onChange={this.handleChange} tag={defaultTag}>
          {visible &&
            <StyledImg
              src={src}
              alt={alt}
              imgWidth={width}
              responsive={!!sources}
              isVisible={visible}
            />}
          {progressive &&
            <StyledThumb imgWidth={width} src={`${placeholderImage}`} className={classNames("thumb", { hide: visible})}
            />}
        </Observer>
        {withPreloader &&
          <StyledPreloader
            src={`${preloader}`} className={classNames({ hide: visible})}
          />}
      </Wrapper>
    );
  }
}

ImageComponent.defaultProps = {
  className: '',
  width: undefined,
  sources: undefined,
  progressive: false,
  withPreloader: false,
  checkWrapperWidth: false,
};

ImageComponent.propTypes = {
  /** source path */
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  /** Object with sources for corresponding breakpoints
   *  Each key value pair should be presented with: { size{Number}: src{String|Object} }
   */
  sources: PropTypes.object,
  /**
   * image's width, it can be:
   * - a number (is converted to pixels),
   * - a percentage string
   * - an object in which each key value should be presented with specific layout and corresponding value
   *   Like so `{ small: '100%', medium: 50%, large: 300 }`
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
  /** true if we go for progressive image loading */
  progressive: PropTypes.bool,
  /** source path */
  withPreloader: PropTypes.bool,
  /** set to true if image responsive in respect to wrapper (not a screen) */
  checkWrapperWidth: PropTypes.bool,
  /** alternate text */
  alt: PropTypes.string.isRequired,
  /**class name for custom styling */
  className: PropTypes.string,
};

export default ImageComponent;

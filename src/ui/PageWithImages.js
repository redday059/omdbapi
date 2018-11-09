import React from 'react';
import styled, { css } from 'styled-components';
import ImageComponent  from '../components/ImageComponent';

import { placeholderImage, placeholderImage2 } from '../constants';

import sImage from '../images/converted/books1-540.jpg';
import sImageWebP from '../images/converted/books1-540.webp';
import mImage from '../images/converted/books1-720.jpg';
import mImageWebP from '../images/converted/books1-720.webp';
import lImage from '../images/converted/books1-960.jpg';
import lImageWebP from '../images/converted/books1-960.webp';
import xlImage from '../images/converted/books1-1200.jpg';
import xlImageWebP from '../images/converted/books1-1200.webp';
import retina2ImageWebP from '../images/converted/books1-2400.webp';
import retina3ImageWebP from '../images/converted/books1-3600.webp';

import sImage2 from '../images/converted/books2-540.jpg';
import sImageWebP2 from '../images/converted/books2-540.webp';
import mImage2 from '../images/converted/books2-720.jpg';
import mImageWebP2 from '../images/converted/books2-720.webp';
import lImage2 from '../images/converted/books2-960.jpg';
import lImageWebP2 from '../images/converted/books2-960.webp';
import xlImage2 from '../images/converted/books2-1200.jpg';
import xlImageWebP2 from '../images/converted/books2-1200.webp';
import retina2ImageWebP2 from '../images/converted/books2-2400.webp';
import retina3ImageWebP2 from '../images/converted/books2-3600.webp';

import '../components/style.css';

const Wrapper = styled.div`
  display: block;
  margin-bottom: 30px;
  @media (min-width: 1200px) {
    display: flex;
  }
`;

const Half = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: ${props => (props.displayLarge && 'none')};
  @media (min-width: 1200px) {
    display: ${props => (props.displayLarge && 'block')};
    width: 50%;
    padding: ${props => (props.withRightPadding && '0 20px 0 0')
      || (props.withLeftPadding && '0 0 0 20px')
    };
  }
`;

const PageWithImages = () => <React.Fragment>
  <div className="jumbotron jumbotron-fluid">
    <h1 className="display-6">Lazy-loaded Image component</h1>
    <ul className="lead list-group list-group-flush">
      <li className="list-group-item">Checks for webp support, with fallback to jpg</li>
      <li className="list-group-item">Supports multiple sources with breakpoints</li>
      <li className="list-group-item">Supports retina displays</li>
      <li className="list-group-item">
        UX: optionally could be loaded progressively (uses base64 inlined thumb) or with pre-loader
      </li>
      <li className="list-group-item">
        Source files: run 'yarn images' and with a help of 'sharp' images are converted to multiple
        sizes (configurable via the corresponding constant) in two formats: jpg and webP
      </li>
    </ul>
  </div>
  <Wrapper>
    <Half withRightPadding displayLarge>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Half>
    <Half withLeftPadding withHeight>
      <ImageComponent
        alt="alt text"
        progressive={true}
        placeholderImage={placeholderImage}
        src={{default: sImage, webp: sImageWebP}}
        sources={{
          576: {default: mImage, webp: mImageWebP},
          768: {default: lImage, webp: lImageWebP},
          992: {default: mImage, webp: mImageWebP},
          // retina responsive images:
          1200: {default: xlImage, webp: xlImageWebP, '2x': retina2ImageWebP, '3x': retina3ImageWebP},
        }}
        width={{
          xsmall: '200',
          small: '250',
          medium: '400',
          large: '250',
          xlarge: '100%',
        }}
        className="image-content"
      />
    </Half>
  </Wrapper>
  <Wrapper>
    <ImageComponent
      alt="alt text"
      progressive={true}
      placeholderImage={placeholderImage2}
      src={{default: sImage2, webp: sImageWebP2}}
      sources={{
        576: {default: mImage2, webp: mImageWebP2},
        768: {default: lImage2, webp: lImageWebP2},
        992: {default: mImage2, webp: mImageWebP2},
        // retina responsive images:
        1200:{default: xlImage2, webp: xlImageWebP2, '2x': retina2ImageWebP2, '3x': retina3ImageWebP2},
      }}
      width={{
        xsmall: '200',
        small: '30%',
        medium: '50%',
        large: '25%',
        xlarge: '100%',
      }}
      className="image-content"
    />
  </Wrapper>
  <Wrapper>
    <Half withRightPadding>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Half>
    <Half withLeftPadding>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Half>
  </Wrapper>
</React.Fragment>;

export default PageWithImages;

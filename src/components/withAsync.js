import React, { Component } from 'react';
import PropTypes from "prop-types";

/**
 * HOC that will lazy load a component with its dependencies.
 *
 * @param {function} importFunc     Parameterless function which returns an import statement
 * @param {string}   moduleName     Named export for the module that is going to be imported
 * @returns {class}                 React component
 */
export default (importFunc, moduleName = 'default') => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null
    };
  }

  async componentWillMount() {
    const ImportedComponent = await importFunc();

    this.setState({
      component: ImportedComponent[moduleName]
    });
  }

  render() {
    if (this.state.component) {
      const AsyncComponent = this.state.component;
      return <AsyncComponent {...this.props} />;
    }

    return null;
  }
};

import React from 'react';
import { Field, reduxForm } from 'redux-form';

const FormInput = (field) => {
  const { meta } = field;
  const inputClassName = meta.touched ?
    `form-control ${meta.invalid ? 'is-invalid' : 'is-valid'}` :
    'form-control';

  return (
    <div className="form-group ">
      <label>{field.label}</label>
      <input className={inputClassName} {...field.input} />
      <div className="text-help">
        {meta.touched ? meta.error : ''}
      </div>
    </div>
  );
};

class MoviesSearchForm extends React.Component {
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {error && <strong className="text-danger">{error}</strong>}
        <Field
          name='s'
          placeholder='title'
          type='text'
          label='Search by title'
          component={FormInput}
        />
        <Field
          name='y'
          placeholder='1'
          type='number'
          label='Year'
          component={FormInput}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.s) {
    errors.s ='Fill in the search string';
  }

  if ((values.y && isNaN(Number(values.y))) || values.y < 1897 || values.y > new Date().getFullYear()) {
    errors.y ='Fill in the year between 1897 and the current year';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'MoviesSearch'
})(MoviesSearchForm);

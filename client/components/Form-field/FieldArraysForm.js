import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import './FieldArraysForm.less';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul className="listOfSkills">
    {fields.map((member, index) => (
      <div>
        <div key={index} className="listElement">
          <Field
            className="singleSkillInput"
            name={`${member}.skill`}
            type="text"
            component={renderField}
          />
          <button
            className="removeSkillBtn"
            type="button"
            title="Remove Skill"
            onClick={() => fields.remove(index)}
          >
            x
          </button>
        </div>
      </div>
    ))}
    <div>
      <button className="addSkillBtn" type="button" onClick={() => fields.push({})}>
        Add Skill
      </button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </div>
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="skills" component={renderMembers} />

      <div>
        <button type="submit" onClick={handleSubmit} disabled={submitting}>
          Get Vacancies
        </button>
        <button
          type="button"
          className="clearSkillsBtn"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Skills
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);

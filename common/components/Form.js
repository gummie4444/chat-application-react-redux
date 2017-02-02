import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import LinearProgress from 'material-ui/LinearProgress';


class Form extends React.Component {

  componentDidMount() {
    this.refs.name
      .getRenderedComponent()
      .getRenderedComponent()
      .focus()
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, submitText, error } = this.props
    return (
      <form onSubmit={handleSubmit}>
			<div>
				<Field name="name"
					component={TextField} 
					hintText="Name Field"
	    			floatingLabelText="Name"
	    			type="text"
					fullWidth={true}
					ref="name"
					withRef
					/>
			</div>
			<div>
				<Field name="password"
					component={TextField} 
					hintText="Password Field"
					floatingLabelText="Password"
	    			type="password"
					fullWidth={true}
					/>
			</div>
			<RaisedButton
				className='testButton'
				label={submitText}
				type="submit"
				primary={true}
				fullWidth={true}
				disabled={submitting}/> 

				{error && <div style = {{textAlign:"center", color:"red"}}> <strong>{error}</strong> </div>}

				{submitting && <LinearProgress mode="indeterminate" /> }
		</form>

    );
  }
}

Form = reduxForm({
  form: 'myForm'
})(Form)

export default Form;

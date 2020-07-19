import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const change = () => {
    console.log('SwitchLabels/change');
    props.onChange(state.checkedA);
  }

  const handleChange = (event) => {
    console.log('SwitchLabels/handleChange: ', event)
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  change();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            color="primary"
          />
        }
        label="Keys"
      />
    </FormGroup>
  );
}

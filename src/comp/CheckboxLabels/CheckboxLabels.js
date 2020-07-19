import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './CheckboxLabels.scss'
//import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
//import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import Favorite from '@material-ui/icons/Favorite';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const debugLevel = 3;

const useStyles = makeStyles((theme) => ({
  root: {
    //margin: theme.spacing(1),
    width: 'calc(90% - 16px)',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
}));

export default function CheckboxLabels(props) {

  if (debugLevel === 2) { console.log('CheckboxLabels/props: ', props); };

  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });

  // choose right set of labels
  let labels;
  let selected = props.selections.selectSelected;
  selected === '' ? labels = props.propsCheckbox.labels[0] : labels = props.propsCheckbox.labels[selected];

  // return update of checks on checkboxes to main application
  props.selections.checkboxChecks = [state.checkedA, state.checkedB, state.checkedC, state.checkedD];

  // handle changes on checkboxes
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    if (debugLevel === 3) { console.log('CheckboxLabels/changes: ',props, state); };
    /// STATES WERDEN ERST UM EINS VERZÖGERT ÜBERGEBEN
    props.onChange([state.checkedA, state.checkedB, state.checkedC, state.checkedD]);
  };

  const handleButtonClick = (event) => {
    if (debugLevel === 3) { console.log('CheckboxLabels / buttonclick'); };
    props.onClick  ();
  }

  return (
    <FormGroup className={classes.root} row>
      <p>Such Dir die Aufgabe aus, welche Du üben möchtests!</p>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label={labels[0]} />
      <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label={labels[1]} />
      <FormControlLabel
        control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
        label={labels[2]} />
      <FormControlLabel
        control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
        label={labels[3]} />
      <div className="button" onClick={handleButtonClick}></div>
    </FormGroup>
  );
}

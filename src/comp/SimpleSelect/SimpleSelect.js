import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Checkbox from '@material-ui/core/Checkbox';
import './SimpleSelect.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 420,
    textAlign: 'left',
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  helperTxt: {
    color: 'rgba(227, 39, 40, 1)',
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const change = () => {
    //console.log('SimpleSelect/changes: ',props, age);
    props.onChange(age);
    //props.selections.selectSelected = age;
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  change();

  const renderList = (labels) => {
      return labels.map((label, i) => {
        //console.log('renderList: ', item.calcStr, item.result);
        return i === 0 ? <MenuItem value='' key={i}><em>{props.props.labels[i]}</em></MenuItem>:<MenuItem value={i} key={i}>{props.props.labels[i]}</MenuItem>;
      });
  };

  return (
    <div >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-label-placeholder">Was willst Du üben?</InputLabel>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Was willst Du üben?' }}>
          {renderList(props.props.labels)}
        </Select>
      </FormControl>
    </div>
  );
}

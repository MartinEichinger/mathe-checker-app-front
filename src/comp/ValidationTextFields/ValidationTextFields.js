import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
  },
  helperText: {
    backgroundColor: 'white',
    '& .MuiFormHelperText-root': {
      marginLeft: '0px',
      marginRight: '-60px'
    }
  }
}));


function handleFocus(props) {
  console.log('calcAreaRational / handleFocus: ', props);
  return props.onFocus(props.name);
}

export default function ValidationTextFields(props) {
  const classes = useStyles();

  //let entry = props.valid;
  return (
    <form className={props.class} noValidate autoComplete="off" onKeyPress={props.onKeyPress}>
      <div>
        <TextField
          className={classes.helperText}
          error={props.error}
          id="filled-error-helper-text"
          label=""
          defaultValue=""
          helperText={props.helperText}
          variant="standard"
          onChange={props.onChange}
          onFocus={() => handleFocus(props)}
          inputProps={{'inputMode': "none"}}
          value={props.input[props.name]}
        />
      </div>
    </form>
  );
}

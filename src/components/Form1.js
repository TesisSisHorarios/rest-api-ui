import {
  TextField,
  Button
} from '@mui/material'
import { useContext } from 'react';
import {UserContext} from '../App';
import useFormStyles from '../styles/useFormFields'

const Form1 = () => {
  const {user, setUser, setStep,edit,setChangeEdit} = useContext(UserContext);
  const classes = useFormStyles();

  const onSubmit = (event) => {
    event.preventDefault()
    setStep(1)
  }

  const handleInputChange = ({ target }) => {

    const { value } = target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)|| value === '') {
      setUser({
        ...user,
        [target.name]: target.value
      });
      if(edit){
        setChangeEdit(true);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <TextField
        className={classes.formField}
        fullWidth
        required
        type="text"
        id="name"
        label="Nombre"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="name"
        label="Apellido"
        name="lastName"
        value={user.lastName}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        type="submit"
      >
        Siguiente
      </Button>
    </form>
  )
}

export default Form1

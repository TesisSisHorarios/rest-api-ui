import {
  TextField,
  Button
} from '@mui/material'
import Box from '@mui/material/Box';
import { useState, useContext, useEffect } from 'react';

import { UserContext } from '../App';
import useFormStyles from '../styles/useFormFields'
import validator from 'validator';
import { saveUser, editUser } from '../hooks/useCrudUser';
import { mensajeAlerta } from "../utils/Mensajes";

const [showAlert] = mensajeAlerta();

const Form2 = () => {

  const { user, setUser, setStep, resetUser, edit, setEdit, changeEdit, setChangeEdit, setloading, setresponse } = useContext(UserContext);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [onBlur, setonBlur] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [onBlurPhone, setonBlurPhone] = useState(false);
  const [isValidId, setIsValidId] = useState(false);
  const [onBlurId, setonBlurId] = useState(false);

  const classes = useFormStyles()

  const onSubmit = (event) => {
    event.preventDefault()

    if (edit) {
      saveEditUser();
      setEdit(false);
    } else {
      saveNewUser();
    }
  }

  const saveNewUser = () => {
    if (isValidEmail && isValidPhone && isValidId) {
      setloading(true);
      saveUser(user).then((valor) => {
        setresponse(valor);
        setloading(false);
        resetUser();
        setStep(0);
      });
    }
  }

  const saveEditUser = () => {
    if (!changeEdit) {
      showAlert("Error", false, "No existen cambios");
    } else {
      if (isValidEmail && isValidPhone && isValidId) {
        setloading(true);
        editUser(user._id, user).then((valor) => {
          setresponse(valor);
          setloading(false);
          resetUser();
          setStep(0);
        });
      }
    }
  }

  const validateValues = () => {
    if (validator.isEmail(user.email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    if (validator.isMobilePhone(user.phoneNumber.toString(), 'es-EC')) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
    validateId(user.cc);
    setonBlurId(true);
    setonBlur(true);
    setonBlurPhone(true);
  }

  useEffect(() => {
    if (edit) {
      validateValues();
    }
  }, []);

  const setValuePersona = (target) => {
    setUser({
      ...user,
      [target.name]: target.value
    });
    if (edit) {
      setChangeEdit(true);
    }

  }

  const handleInputChangeEmail = ({ target }) => {
    const { value } = target;
    if (validator.isEmail(value)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    if (value === '') {
      setIsValidEmail(true);
      setonBlur(false);
    }
    setValuePersona(target);

  };

  const handleInputChangePhone = ({ target }) => {
    const { value } = target;
    if (validator.isMobilePhone(value.toString(), 'es-EC')) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
    if (value === '') {
      setIsValidPhone(true);
      setonBlurPhone(false);
    }
    setValuePersona(target);
  };

  const validateId = (cedula) => {

    if (cedula.length === 10) {

      let digito_region = cedula.substring(0, 2);

      if (digito_region >= 1 && digito_region <= 24) {

        let ultimo_digito = cedula.substring(9, 10);

        let pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

        var numero1 = cedula.substring(0, 1);
        numero1 = (numero1 * 2);
        if (numero1 > 9) { numero1 = (numero1 - 9); }

        let numero3 = cedula.substring(2, 3);
        numero3 = (numero3 * 2);
        if (numero3 > 9) { numero3 = (numero3 - 9); }

        let numero5 = cedula.substring(4, 5);
        numero5 = (numero5 * 2);
        if (numero5 > 9) { numero5 = (numero5 - 9); }

        let numero7 = cedula.substring(6, 7);
        numero7 = (numero7 * 2);
        if (numero7 > 9) { numero7 = (numero7 - 9); }

        let numero9 = cedula.substring(8, 9);
        numero9 = (numero9 * 2);
        if (numero9 > 9) { numero9 = (numero9 - 9); }

        let impares = numero1 + numero3 + numero5 + numero7 + numero9;

        var suma_total = (pares + impares);

        var primer_digito_suma = String(suma_total).substring(0, 1);

        var decena = (parseInt(primer_digito_suma) + 1) * 10;

        var digito_validador = decena - suma_total;

        if (digito_validador === 10)
          digito_validador = 0;

        let digito_validadorStr = digito_validador.toString();
        if (digito_validadorStr === ultimo_digito) {
          setIsValidId(true);
        } else {
          setIsValidId(false);
        }

      } else {
        setIsValidId(false);
      }
    } else {
      setIsValidId(false);
    }
  }

  const handleInputChangeCC = ({ target }) => {
    const { value } = target;

    validateId(value);
    if (value === '') {
      setIsValidId(true);
      setonBlurId(false);
    }
    setValuePersona(target);

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form
        onSubmit={onSubmit}
      >
        <TextField
          className={classes.formField}
          error={onBlur && !isValidEmail}
          onBlur={() => setonBlur(true)}
          helperText={onBlur && !isValidEmail ? "Email Inválido" : ""}
          fullWidth
          required
          type="email"
          id="email"
          label="E-mail"
          name="email"
          value={user.email}
          onChange={handleInputChangeEmail}
        />
        <TextField
          className={classes.formField}
          error={onBlurPhone && !isValidPhone}
          onBlur={() => setonBlurPhone(true)}
          helperText={onBlurPhone && !isValidPhone ? "Teléfono Inválido" : ""}
          fullWidth
          required
          id="phoneNumber"
          label="Teléfono"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleInputChangePhone}
        />
        <TextField
          className={classes.formField}
          error={onBlurId && !isValidId}
          onBlur={() => setonBlurId(true)}
          helperText={onBlurId && !isValidId ? "Documento de Identidad inválido" : ""}
          fullWidth
          required
          type="number"
          id="cc"
          onInput={(e) => { e.target.value = e.target.value.substring(0, 10) }}
          label="Documento de identidad"
          name="cc"
          value={user.cc}
          onChange={handleInputChangeCC}
        />
        <Button
          className={classes.formButtons}
          variant="outlined"
          onClick={() => setStep(0)}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Box>

  )
}

export default Form2

import React, { useState, createContext } from "react";

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid,
  Button
} from '@mui/material'


import Form1 from './components/Form1'
import Form2 from './components/Form2'
import TableData from './components/Table'
import CircularProgress from '@mui/material/CircularProgress';

export const UserContext = createContext();

const steps = [
  {
    label: 'Paso 1',
    componente: <Form1 />
  },
  {
    label: 'Paso 2',
    componente: <Form2 />
  }
]

const userobj = {
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  cc: ''
};

const App = () => {

  const [step, setStep] = useState(0);
  const [user, setUser] = useState(userobj);
  const [changeEdit, setChangeEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setloading] = useState(false);
  const [response, setresponse] = useState({});

  const resetUser = () => {
    setUser(userobj);
  }

  const cancelEdit = () => {
    setEdit(false);
    resetUser();
    setStep(0);
  }

  return (

    <UserContext.Provider value={{ user, setUser, setStep, resetUser, edit, setEdit, changeEdit, setChangeEdit, loading, setloading, response, setresponse }}>
      <Container
        fixed
        style={{
          padding: '3em'
        }}
      >

        <Grid
          container
          spacing={6}
        >
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
          >
            <Stepper
              activeStep={step}
            >
              {steps.map((step, key) => (
                <Step
                  key={key}
                >
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {edit && <Box
              style={{
                marginTop: '2em'
              }}>
              <Button size="small" onClick={cancelEdit} >
                Cancelar Edición
              </Button>
            </Box>}

            <Box
              style={{
                marginTop: '4em'
              }}
            >
              {steps[step].componente}
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            sm={12}
            xs={12}
          >
            <TableData />
          </Grid>
        </Grid>
      </Container>
      {loading && <div align="center" >
        <CircularProgress />
      </div>}

    </UserContext.Provider>
  )
}

export default App

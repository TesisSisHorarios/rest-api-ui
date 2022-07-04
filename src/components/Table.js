import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { deleteUser } from '../hooks/useCrudUser';
import { UserContext } from '../App';
import { getUser } from '../hooks/useCrudUser';
import { getUserTotal } from '../hooks/useCrudUser';

const TableData = () => {

  const { setUser, setStep, setEdit, setChangeEdit, setloading, response, setresponse } = useContext(UserContext);
  const [usersTotal, setusersTotal] = useState([]);
  const [users, getUsers] = useState([]);
  const [userSelection, setUserSelection] = useState();
  const [dialogDelete, setDialogDelete] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const getListuser = () => {
    setloading(true);

    getUserTotal(function (resp) {
      setusersTotal(resp.data);
    });

    getUser(page*rowsPerPage, rowsPerPage, function (resp) {
      getUsers(resp.data);
      setloading(false);
    });
  };

  useEffect(() => {
    getListuser();
  }, [page, rowsPerPage]);

  useEffect(() => {
      getListuser();
  }, [response]);

  const selectionDeleteUserRow = () => {
    setDialogDelete(true);
  }

  const selectionEditUserRow = (u) => {
    setUser(u);
    setChangeEdit(false);
    setStep(0);
    setEdit(true);
  }

  const deleteUserRow = () => {
    deleteUser(userSelection._id).then((valor) => {
      setloading(false);
      setresponse(valor);
      setStep(0);
      setDialogDelete(false);
    });
  }

  const getData = (u) => {
    setUserSelection(u);
  }

  const deleteRow = (
    <React.Fragment>
      <IconButton >
        <DeleteIcon color="error" />
      </IconButton>
    </React.Fragment>
  );

  const editRow = (
    <React.Fragment>
      <IconButton >
        <EditIcon color="primary" />
      </IconButton>
    </React.Fragment>
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Apellido</strong>
              </TableCell>
              <TableCell>
                <strong>E-mail</strong>
              </TableCell>
              <TableCell>
                <strong>Teléfono</strong>
              </TableCell>
              <TableCell>
                <strong>C.C.</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {users.map((user, key) => (
              <TableRow
                key={key}
                onClick={() => getData(user)}
              >
                <TableCell>
                  {user.name}
                </TableCell>
                <TableCell>
                  {user.lastName}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.phoneNumber}
                </TableCell>
                <TableCell>
                  {user.cc}
                </TableCell>
                <TableCell onClick={() => selectionDeleteUserRow()}>
                  {deleteRow}
                </TableCell>
                <TableCell onClick={() => selectionEditUserRow(user)}>
                  {editRow}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={usersTotal.length} // This is what your request should be returning in addition to the current page of rows.
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={dialogDelete}
      >
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent dividers>
          ¿Esta seguro de eliminar el usuario?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDialogDelete(false)}>
            Cancelar
          </Button>
          <Button onClick={deleteUserRow}>Si</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TableData

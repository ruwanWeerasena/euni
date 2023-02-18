import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveStaffs, deleteStaff } from "./staffSlice";
import { useMsal } from "@azure/msal-react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Staffs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  const [selectedDeleteId, setSelectedDeleteId] = useState(undefined);

  const [open, setOpen] = useState(false);

  const onDelete = (id) => {
    setSelectedDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConfirm = async () => {
    console.log('delete confirmation', selectedDeleteId)
    dispatch(deleteStaff({id:selectedDeleteId}));
    setOpen(false);
  };

  const staffs = useSelector((state) => state.staffs);
  const loadingStatus = useSelector((state) => state.staffs.status);

  useEffect(() => {
    dispatch(retrieveStaffs());
  }, []);

  console.log("loading state", loadingStatus);

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  const edit = (id) => {
    navigate(`/staffs/${id}`);
  };

  return (
    <div>
      <p>Staffs</p>
      {/* {staffs.map((staff) => (
        <div key={staff.staffId}>{staff.name}</div>
      ))} */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff) => (
              <StyledTableRow key={staff.staffId}>
                <StyledTableCell component="th" scope="row">
                  {staff.name}
                </StyledTableCell>
                <StyledTableCell>{staff.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{staff.email}</StyledTableCell>
                <StyledTableCell>{staff.mobile}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => onDelete(staff.staffId)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => edit(staff.staffId)}
                    aria-label="delete"
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Button onClick={() => edit(null)}>New Staff</Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Staff"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete Staff?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Staffs;
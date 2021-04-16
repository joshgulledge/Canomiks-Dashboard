import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
    maxWidth: '80%'
  },
  table: {
    minWidth: 650,
  },
});

function LabDashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_ORDERS'
    })
  }, [])

  const orders = useSelector(store => store.orders);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom style={{ marginLeft: '10%', fontWeight: 900 }}>Current Orders</Typography>
      <div>
        <TextField style={{ margin: 25, marginLeft: '10%' }} onChange={(event) => { setFilter(event.target.value) }} label="Search..." variant="standard" />
      </div>
      <center>
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell label="Lot Number" style={{ fontWeight: 900 }}>Lot Number</TableCell>
                <TableCell label="Company Name" align="right" style={{ fontWeight: 900 }}>Company Name</TableCell>
                <TableCell label="Date Received" align="right" style={{ fontWeight: 900 }}>Date Received</TableCell>
                <TableCell label="Test Phase" align="right" style={{ fontWeight: 900 }}>Test Phase</TableCell>
                <TableCell label="Action Button" align="right" style={{ fontWeight: 900 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  if (order.lotNumber.toLowerCase().includes(filter.toLowerCase())) {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                        <TableCell component="th" scope="row">
                          {order.lotNumber}
                        </TableCell>
                        <TableCell align="right">{order.companyID}</TableCell>
                        {order.receivedDate ?
                          <TableCell align="right">{moment(order.receivedDate).format('MMMM DD YYYY')}</TableCell> :
                          <TableCell align="right">Not Shipped</TableCell>
                        }
                        <TableCell align="right">{order.testingStatus}</TableCell>
                        <TableCell align="right">
                          <Button variant="contained" style={{ backgroundColor: '#1e565c', color: 'white' }}>View Details</Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.container}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </center>
    </>
  );
}

export default LabDashboard;

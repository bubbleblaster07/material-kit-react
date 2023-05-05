import { Helmet } from 'react-helmet-async';
import { useState,useEffect } from 'react';
import { Route,Routes,useNavigate } from 'react-router-dom'

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { getAllEvent } from '../services/eventAdd';

import fireDb from '../firebase';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';




// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'title', label: 'title', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: 'date', label: 'date', alignRight: false },
  { id: 'weekly', label: 'weekly', alignRight: false },
  { id: 'description', label: 'description', alignRight: false },
  { id: '' },
  
];
export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const navigate=useNavigate();
  
  const navigateToNewEvent=()=>{
    const path = `/newEvent`; 
    navigate(path);
  }

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [data,setData] =useState({});
  useEffect(()=>{
    getEvent();
  },[]);
  const getEvent= async()=> {
    const info= await getAllEvent();
    console.log(info.docs);
    setData(info.docs.map((doc)=>({...doc.data(),id:doc.id})))
  }
  // useEffect(()=>{
  //   fireDb.child("New user").on("value",(snapshot)=>{
  //       if(snapshot.val() !== null){
  //           setData({...snapshot.val()});
  //       }
  //       else{
  //           setData({})
  //       }
  //   });
  //   return ()=>{
  //       setData({});
  //   };
  // },[]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Events | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Events Scheduled
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={navigateToNewEvent} >
              Add Event
            </Button>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Card>
        <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                
                  headLabel={TABLE_HEAD}
                  
                />
                <TableBody>
                  {Object.keys(data).map((id,index)=>{
                    return(
                        <TableRow key={id}>
                          <TableCell padding="checkbox">
                          <Checkbox  />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {data[id].title}
                            </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{data[id].status}</TableCell>

                          <TableCell align="left">{data[id].date}</TableCell>

                          <TableCell align="left">{data[id].weekly}</TableCell>

                          <TableCell align="left">{data[id].description}</TableCell>
                        </TableRow>  
                      );
                    }) }
                </TableBody > 
                {/* <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;
                  
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody> */}

                {/* {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>


        {/* <ProductList products={PRODUCTS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}

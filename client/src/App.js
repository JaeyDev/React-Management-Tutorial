import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { withStyles } from '@material-ui/core/styles'; //신버전 안되서 구버전 설치함
//import { makeStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress'

const styles = theme => ({
  root: {width: '100%', marginTop: theme.spacing.unit * 3, overflowX: "auto"},
  table: {minWidth: 1080},
  process: { margin: theme.spacing.unit * 2 }
})

class App extends Component {

  state = {
    customers: "",
    completed: 0
  }
  
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed : completed >= 200 ? 0 : completed + 1 });
  }

  render(){
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>사진</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.customers ? this.state.customers.map(c => { 
                return( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ); 
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.process} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd/>
      </div>
    );
  }
}

export default withStyles(styles)(App);

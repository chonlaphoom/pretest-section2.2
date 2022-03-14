
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Form, Row, Table } from 'react-bootstrap';

const Header = () => {
  const [data,setData] = useState([]);
  const [filterSearch, setFilterSearch] = useState<string>('');

  const conditionFilter = (input:any) => { 
    return input.name.toLowerCase().includes(filterSearch.toLowerCase()) 
    || input.username.toLowerCase().includes(filterSearch.toLowerCase())
  }

  useEffect(()=>{
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      setData(res.data);
    })
  },[])
    return (
      <Container className="test-container">
        <Row>
          <Form.Label>search by name and username (ignore case sensitive)</Form.Label>
          <Form.Control type="text" value={filterSearch} onChange={(e)=>setFilterSearch(e.currentTarget.value)}/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th>company</th>
              <th>phone</th>
              <th>city</th>
              <th>website</th>
            </tr>
          </thead>
          <tbody>
            <>
            {
               data?.filter(value=>conditionFilter(value))?.map((value,index)=><tr key={index}>
               <td>{value.id}</td>
               <td>{value.name}</td>
               <td>{value.username}</td>
               <td>{value.email}</td>
               <td>{value.company.name}</td>
               <td>{value.phone}</td>
               <td>{value.address.city}</td>
               <td>{value.website}</td>
             </tr>)
            }</>
          </tbody>
      </Table>
    </Row></Container>)
}

export default Header;
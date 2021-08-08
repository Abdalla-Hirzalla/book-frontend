import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (

      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={user.picture} alt={user.name}/>
  <Card.Body>
    <Card.Title>{user.name}</Card.Title>
    <Card.Text>
    {user.email}
    </Card.Text>
  </Card.Body>
</Card>
     
     
       
    )
  );
};

export default Profile;
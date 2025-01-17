import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const ProfileContainer = styled.div`
  max-width: 950px;
  margin-left: 5%;
  padding: 20px;
  background: linear-gradient(to bottom right, #62c6e1, #59a3ec);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10%;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const UserDetails = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const UserField = styled.div`
  flex: 1 1 45%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EditIcon = styled.div`
  cursor: pointer;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const QuizzesSection = styled.div`
  background-color: #f1f3f5;
  padding: 20px;
  border-radius: 10px;
`;

const QuizzesHeader = styled.h3`
  margin-bottom: 20px;
  color: #495057;
`;

const QuizzesGrid = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const QuizCard = styled(MDBCard)`
  width: 150px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const ProfilePage = () => {
  const location = useLocation();
  const userData = location.state || {}; // Get user data from state

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={userData.thumbnail || "https://via.placeholder.com/100"} alt="Profile" />
        <UserDetails>
          <UserField>Username: {userData.username || 'N/A'}</UserField>
          <UserField>Email: {userData.email || 'N/A'}</UserField>
          <UserField>Role: {userData.role || 'N/A'}</UserField>
        </UserDetails>
        <EditIcon>✏️</EditIcon>
      </ProfileHeader>

      <Divider />

      <QuizzesSection>
        <QuizzesHeader>Quizzes Participated</QuizzesHeader>
        <QuizzesGrid>
          <QuizCard>
            <MDBCardBody>
              <MDBCardTitle>Quiz 1</MDBCardTitle>
              <MDBCardText>Details about Quiz 1</MDBCardText>
            </MDBCardBody>
          </QuizCard>
          <QuizCard>
            <MDBCardBody>
              <MDBCardTitle>Quiz 2</MDBCardTitle>
              <MDBCardText>Details about Quiz 2</MDBCardText>
            </MDBCardBody>
          </QuizCard>
          {/* Add more QuizCard components as needed */}
        </QuizzesGrid>
      </QuizzesSection>
    </ProfileContainer>
  );
};

export default ProfilePage;

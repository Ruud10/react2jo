import React, { useRef, useState } from 'react';
import '../MyPage/My_Page.css';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { getAuth, updateProfile } from 'firebase/auth';
import app, { db, storage } from '../../firebase';
import { setPhotoUrl } from '../../reducers/userSlice';
import { ref as dbRef, update } from 'firebase/database';
import { getDownloadURL, ref as strRef, uploadBytesResumable } from 'firebase/storage';

const MyPage = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState('userInfo');
    const auth = getAuth(app);
    const inputOpenImageRef = useRef(null);
    const dispatch = useDispatch();

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleOpenImage = () =>{
      inputOpenImageRef.current.click();
    }
  
    const handleUploadImage =(event) => {
  
      const file = event.target.files[0];
      const user = auth.currentUser;

      if (!file) {
        return; // 파일이 선택되지 않은 경우 아무 작업도 하지 않음
      }
  
  
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: file.type
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = strRef(storage, 'user_image/' + user.uid);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
  
        //프로필 이미지 수정
        updateProfile(user,{
          photoURL:downloadURL
        })
  
        //리덕스 이미지 수정
        dispatch(setPhotoUrl(downloadURL));
        //데이터베이스 유저 이미지 수정
        update(dbRef(db,`users/${user.uid}`),{image:downloadURL});
  
      });
    }
  );
    }
  
    return (
        <>
            <Container className='myPageContainer'>
                <Row className='myPageInfoContainer'>
                    <div className='myPageUserImageBox'>
                        <img className='myPageUserImage' src={currentUser.photoURL} alt="User"/>
                    </div>
                    <div className='ImageEditBox'>
                      <button className='ImageEditBtn' onClick={handleOpenImage} >이미지 수정</button>
                    </div>
                </Row>
            </Container>
            <Container className='myPageUserInfoContainer'>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <Nav variant="tabs" defaultActiveKey="userInfo" className="justify-content-center">
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="userInfo" 
                                    onClick={() => handleTabChange('userInfo')} 
                                    className={activeTab === 'userInfo' ? 'activeTab' : 'inactiveTab'}>
                                    회원 정보
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link 
                                    eventKey="favoriteCamping" 
                                    onClick={() => handleTabChange('favoriteCamping')} 
                                    className={activeTab === 'favoriteCamping' ? 'activeTab' : 'inactiveTab'}>
                                    찜한 캠핑장
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="userInfo">
                                {/* 회원 정보*/}
                            </Tab.Pane>
                            <Tab.Pane eventKey="favoriteCamping">
                                {/* 찜한 캠핑장 컴포넌트 */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Container>
            <input onChange = {handleUploadImage} type='file' ref={inputOpenImageRef} style={{display:'none'}} accept='image/jpeg, image/png'/>
        </>
    );
};

export default MyPage;

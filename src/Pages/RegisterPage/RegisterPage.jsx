import React, { useState } from 'react'
import {Row} from 'react-bootstrap'
// import '../Login/LoginPage.css'
import {useForm} from 'react-hook-form';
import '../RegisterPage/Register_Page.css';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import app, { db } from '../../firebase';
import md5 from 'md5'
import {Link, useNavigate} from 'react-router-dom'
import { ref, set } from 'firebase/database';
import {useDispatch} from 'react-redux'
import { setUser } from '../../reducers/userSlice';

const RegisterPage = () => {
    const Auth = getAuth(app);

    const navigate = useNavigate();
    const {register, formState:{errors}, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages,setErrorMessages] = useState('');
    const dispatch = useDispatch();

    const MoveToLogin = () =>{
        navigate('/')
    }


    const RegisterCheck = async(data) =>{
        try {
            setIsLoading(true);
            const createdUser = await createUserWithEmailAndPassword(Auth,data.email,data.password);
            await updateProfile(Auth.currentUser,{
                displayName: data.name,
                photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })
            const userData = {
                uid: createdUser.user.uid,
                displayName : createdUser.user.displayName,
                email : createdUser.user.email,
                photoURL : createdUser.user.photoURL
            }
            dispatch(setUser(userData));

            set(ref(db,`users/${createdUser.user.uid}`),{
                name: createdUser.user.displayName,
                email: createdUser.user.email,
                image: createdUser.user.photoURL
            })

            alert('회원가입 완료');
            MoveToLogin();           
        } catch (error) {
            setErrorMessages(error.message);
            setTimeout(()=>{
                setErrorMessages('');
            },3000);
        }finally{
            setIsLoading(false);
        }
 
    }

  return (
        <form className='LoginForm' onSubmit={handleSubmit(RegisterCheck)}>
            <Row className='LoginContainer'>
                <h1>회원가입</h1>
                <div className='inputContainer'>
                    <label htmlFor='email' >이메일</label>
                    <input type='email' name='email' id='email' placeholder='이메일을 입력해주세요.'
                    {...register("email", {required:true , pattern:/^\S+@\S+$/i})}
                    ></input>
                    {errors.email && <p className='warningText'>이메일 형식이 아닙니다.</p>}
                </div> 
                <div className='inputContainer'>
                    <label htmlFor='password'>비밀번호</label>
                    <input type='password' name='password' id='password' placeholder='비밀번호를 입력해주세요.'
                    {...register("password",{required:true, minLength:6})}
                    ></input>
                    {errors.password && errors.password.type === 'required' &&  (<p className='warningText'>비밀번호를 잘못입력하셨습니다.</p>)}
                    {errors.password && errors.password.type === 'minLength' && (<p className='warningText'>비밀번호는 최소 6자리 이상 입력해주세요.</p>)}
                </div>
                <div className='inputContainer'>
                    <label htmlFor='name'>닉네임</label>
                    <input type='name' name='name' id='name' placeholder='사용하실 닉네임을 입력해주세요.'
                    {...register("name",{required:true, maxLength:10})}
                    ></input>
                    {errors.name && errors.name.type === 'required' && <p className='warningText'>닉네임을 입력해주세요.</p>}
                    {errors.name && errors.name.type === 'maxLength' && <p className='warningText'>닉네임을 10자 입력해주세요.</p>}
                </div>
                {errorMessages && <p className='warningText' variant='danger'>{errorMessages}</p>}
                <div className='LoginBtnContainer'>
                    <button className='LoginBtn'>{isLoading? 'Loading' :'회원가입' }</button>
                </div>
                    <Link to={'/auth/login'} className='YesIdText'>이미 아이디가 있다면..</Link>
             

            </Row>
        </form>
  )
}

export default RegisterPage
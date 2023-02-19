import './LoginSignUp.scss';
import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';
import React, { useState, useRef, useContext } from 'react';
import axios from 'axios'
//import * as EmailValidator from 'email-validator';
import zxcvbn from 'zxcvbn';
import treepadIcon from '../assets/icons/treepadcloud-icon.svg';

//import * as socketIo from '../utils/resourceServerEmit';

//import monitor from '../utils/eventMonitor';

// TODO: Add confirmation password to registration and only send if the two passwords match

const LoginSignUp = () => {
    const [mode, setMode] = useState('login');
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    const [toast, setToast] = useState('');

    const changeMode = (mode) => {
        setMode(mode);
    }

    const handlePassword = (e) => {
       setPassword(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
     }

    const handleUserName = (e) => {
        setUserName(e.target.value);
     }
 
    const registerUser = () => {
        const strength = zxcvbn(password).score;

        if (strength < 3) {
            return setToast('Password is too weak.');
        }
        
        return;
        
        const request = {
            url: `https://authentication.treepadcloud.com:6200/register`,
            method: 'post',
            data: {
                userName,
                email,
                password
            }
        }
        axios(request)
        .then(res => {
            setToast(res.data);
            return;

        })
        .catch(err => {
            console.log(err.response.data);
            if (!err.response.data) {
                setToast(err.message);
                return;
            } else {
                setToast(err.response.data);
                return;
            }
        })

        return;
    }

    const loginUser = (user, password) => {
        return;
       
    }


    return (
        <div className="login">
            <div className='login__center-box'>
                <div className='login__intro'>
                    <img className='login__logo' src={treepadIcon} />
                    <h1 className='login__product-name'>TreePad Cloud</h1>
                </div>
                <h2 className='login__title'>
                    { mode === 'login' ? 'Login' : 'Register'}
                </h2>
                <div className='login__container'>
                    <IonItem>
                        <IonLabel position="floating">User Name</IonLabel>
                        <IonInput 
                            type="text"
                            value={userName}
                            onIonChange={handleUserName} 
                        />
                    </IonItem>
                    { mode === 'register' && 
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput 
                                type="email" 
                                value={email}
                                onIonChange={handleEmail}
                            />
                        </IonItem>
                    }
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput 
                            type="password" 
                            //ref={passRef} 
                            value={password} 
                            onIonChange={handlePassword}
                        />
                    </IonItem>
                    { mode === 'register' &&
                        // <PasswordStrengthMeter password={password}/> 
                    true }
                        
                      
                        { mode === 'login' && 
                            <div className='login__button-container'>
                                <IonButton 
                                
                                className='login__button'
                                onClick={loginUser}>Login</IonButton> 

                                <IonButton 
                                fill='outline'
                                className='login__button'
                                onClick={() => setMode('register')}>Register</IonButton>
                            </div>
                        }
                        { mode === 'register' &&
                            <div className='login__button-container'>
                                <IonButton 
                                
                                className='login__button'
                                onClick={registerUser}>Submit</IonButton> 

                                <IonButton 
                                fill='outline'
                                className='login__button'
                                onClick={() => setMode('login')}>Login</IonButton>
                            </div>
                        }   

                    
                </div>
            </div>
        
            <IonToast 
                color="secondary"
                position='middle'
                message={toast}
                isOpen={!!toast}
                duration={2500}
                onDidDismiss={() => setToast('')}
            />
            {/* { mode === 'login' && appCtx.windowDimensions.height >= 600 &&
                <IonButton className="login__recovery" fill="outline">Password Recovery</IonButton>
            } */}
    </div>
    )
}

export default LoginSignUp;
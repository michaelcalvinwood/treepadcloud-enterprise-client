import './LoginSignUp.scss';


import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';
import React, { useState, useRef, useContext } from 'react';
import axios from 'axios'
import * as EmailValidator from 'email-validator';
import zxcvbn from 'zxcvbn';
import treepadIcon from '../assets/icons/treepadcloud-icon.svg';

//import * as socketIo from '../utils/resourceServerEmit';

const LoginSignUp = ({updateToken}) => {
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

    const isValidHostName = name => {
        if (!name) return false;
        
        if (name.startsWith('-')) return false;
        if (name.endsWith('-')) return false;
    
        let test = name.indexOf('--');
        if (test !== -1) return false;
    
        return (/^[a-zA-Z0-9-]{1,63}$/.test(name))
    }
    
 
    const registerUser = () => {
        const strength = zxcvbn(password).score;

        if (strength < 3) return setToast('Password is too weak.');

        if (!isValidHostName(userName)) return setToast("Allowed user name characters: a-z 0-9 and -");
        
        if (!EmailValidator.validate(email)) return setToast("Invalid email address.");
        
        const request = {
            url: `https://authentication.treepadcloud.com:6200/register`,
            method: 'post',
            data: {
                userName: userName.toLowerCase(),
                email,
                password
            }
        }
        axios(request)
        .then(res => {
            return setToast(`Success: Email verification sent to ${email}`);
        })
        .catch(err => {
            console.log(err.response.data);
            
            setToast(`Error: ${err.response.data.msg}`);
            
        })

        return;
    }

    const loginUser = () => {
        console.log(userName, password)
        const strength = zxcvbn(password).score;

        if (strength < 3) return setToast('Password is too weak.');

        if (!isValidHostName(userName)) return setToast("Allowed user name characters: a-z 0-9 and -");
        
        const request = {
            url: `https://authentication.treepadcloud.com:6200/login`,
            method: 'post',
            data: {
                userName,
                password
            }
        }
        axios(request)
        .then(res => {
            updateToken(res.data);
        })
        .catch(err => {
            console.log(err.response.data);
            
            setToast(`Error: ${err.response.data.msg}`);
            
        })

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
                duration={3500}
                onDidDismiss={() => setToast('')}
            />
            {/* { mode === 'login' && appCtx.windowDimensions.height >= 600 &&
                <IonButton className="login__recovery" fill="outline">Password Recovery</IonButton>
            } */}
    </div>
    )
}

export default LoginSignUp;
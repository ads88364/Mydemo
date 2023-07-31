import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../product-item/AlertBox';



const Googlehayaku = () => {
  const history = useNavigate();

  const [googleuser, setgoogleuser] = useState([])
  const [alertshow, setalertshow] = useState(0)


  const googlefetch = async () => {
    const googleuserdata = {
      account: googleuser.email.split("@")[0],
      name: googleuser.name,
      nickname: googleuser.family_name ? googleuser.family_name : googleuser.given_name,
      email: googleuser.email
    }
    await axios.post('http://localhost:8000/api/google-account', { googleuserdata })
  }

  useEffect(() => {
    if (Object.keys(googleuser).length > 0) {
      console.log(googleuser)
      const userEmail = googleuser.email.split("@")[0];
      const googlesub = googleuser.sub
      googlefetch()

      localStorage.setItem('userInfo', JSON.stringify(userEmail));
      localStorage.setItem('googleSub', googlesub);

      setalertshow(1)
      setTimeout(() => {
        setalertshow(0)
        // history("/")
        window.location.href = '/';
      }, 1500)

    } else {
      console.log('使用者未登入');
    }
  }, [googleuser])


  useEffect(() => {

    window.onGoogleSuccess = async (response) => {
      const { credential } = response;
      const res = await axios.post('http://localhost:8000/api/google-login', { credential })
      const googleuser = res.data
      setgoogleuser(googleuser)
    }

    // Inject the google provided script 
    // (an importable module would be nicer here)
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // clean up for react lifecycle
      window.onGoogleSuccess = undefined;
      document.body.removeChild(script)
    }
  }, [googleuser]);





  const obgb = {
    g: 'google登入成功',
    b: '1秒後回首頁...'
  }
  const mass = Object.values(obgb).join('\n')


  return (

    <>
      {alertshow === 1 && <AlertBox message={'google登入成功 \n 1秒後回首頁...'} type={'success'} />}
      <div id="g_id_onload"
        data-client_id={"570382147021-8fsv658iibb1p1va1malkt5ppq7ll8v3.apps.googleusercontent.com"}
        data-callback="onGoogleSuccess" // as defined above
        data-context="signin"
        data-ux_mode="popup"
        data-auto_prompt="false"
        data-login_uri="http://localhost:3000/login">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
      </div>
    </>


  );
};

export default Googlehayaku;

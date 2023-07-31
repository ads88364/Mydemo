import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Personaldata.scss"
import { Avatar, Row, Col } from 'antd';
import Prconly from './Prconly';
import ChangePassword from './changePassword';
import AlertBox from '../product-item/AlertBox';

const Personal = () => {
  // setTradeItems(response.data);


  const [editMode2, setEditMode2] = useState(false);

  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identityCard, setIdentityCard] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profilePictureSrc, setProfilePictureSrc] = useState('');//個人照片顯示
  const [showAlertprc, setShowAlertprc] = useState(false);//照片
  const [showChange, setShowChange] = useState(false);//修改密碼
  const [showAlert, setShowAlert] = useState(0);//顧問組件

  const isLoggedIn = localStorage.getItem('userInfo').slice(1, -1);

  useEffect(() => {

    const fetchData = async () => {

      const response = await axios.get(`http://localhost:8000/api/members/${name, isLoggedIn}`);
      const birthdayDate = new Date(response.data[0].birthday);
      birthdayDate.setHours(birthdayDate.getHours() + 8);
      setBirthday(birthdayDate.toISOString().substring(0, 10));


      console.log(response.data[0]);
      setAccount(response.data[0].account)
      setName(response.data[0].name)
      setEmail(response.data[0].email)
      setIdentityCard(response.data[0].identityCard)
      setGender((response.data[0].gender === '1' ? '男' : '女'))
      setNickname(response.data[0].nickname)
      setPhoneNumber(response.data[0].phoneNumber)
      setProfilePictureSrc(response.data[0].profilePictureSrc)


    };
    if (isLoggedIn) {
      setLoggedIn(isLoggedIn);
      fetchData();
    }
  }, []);
  //先取得資料庫的值

  const updatedData = {
    name,
    nickname,
    birthday,
    gender,
    identityCard,
    phoneNumber,
    email,
    account
  };


  useEffect(() => {
    const fetchMemberData = () => {
      // console.log(updatedData)
      axios.put(`http://localhost:8000/api/members/account`, [updatedData])
        .then((response) => {
          setAccount(response.data[0].account)
          setName(response.data[0].name)
          setNickname(response.data[0].email)
          setNickname(response.data[0].identityCard)
          setNickname(response.data[0].gender)
          setNickname(response.data[0].nickname)
          // setBirthday(response.data[0].birthday.substring(0, 10))
        })
        .catch((error) => {
          // console.error('错误??', error);


        });
    };
    fetchMemberData();
  }, [editMode2])

  const handleEditClick2 = () => {
    if (loggedIn) {
      setEditMode2(true);
    }
  };

  const save = () => {
    setShowAlert(1)
    setTimeout(() => {
      setShowAlert(0);
    }, 1000)
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setEditMode2(false);
  };

  const changeimg = () => {
    setShowAlertprc(true)
  }
  const closePrconly = () => {
    setShowAlertprc(false)
  }
  const changePassword = () => {
    setShowChange(true)
  }
  const closechange = () => {
    setShowChange(false)
  }
  return (
    <div id='memberout'>
      {showAlert === 1 && <AlertBox message="資訊已修改" type="error" />}
      <div className='t1' >| 會員中心 |</div>
      <div className='t2' >個人資料</div>
      <div className='member'>
        <div className='member1'>
          <Row>
            <Col >
              <div className='memberprc'>
                <Avatar src={`http://localhost:8000/img/${profilePictureSrc}`} alt="avatar" size={200} />

                <div className='memberwelcome'>
                  <div className='welcome'>Welcome！</div>
                  <div className='membername' >
                    <p className='membername1'>{name}</p>
                    <p className='membername2'>({account})</p>
                  </div>
                </div>
                <div className='memberBtn'>
                  <button onClick={() => changeimg()}>修改頭像</button>
                  {showAlertprc && <Prconly account={account} onClose={closePrconly} />}
                  <button onClick={() => changePassword()}>修改密碼</button>
                  {showChange && <ChangePassword account={account} onClose={closechange} />}
                </div>
              </div>
            </Col>
            <Col >
              <div className='membertitleline'>
                {editMode2 ? (
                  <form className='memberform' onSubmit={handleSubmit2}>
                    <fieldset>
                      <legend>基本資料</legend>
                      <div>
                        <div className='displaybtn' >
                          <button type="submit" onClick={save}>儲存</button><br />
                        </div>
                        {/* Form 2 inputs */}
                        <label>
                          姓名：
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </label>
                        <br />
                        <label>
                          暱稱：
                          <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                          />
                        </label>
                        <div>
                          生日：{birthday}
                        </div>
                        <label>
                          性別：{gender}
                        </label>
                        <br />
                        <label>
                          身分證：{identityCard}
                        </label>
                        <br />
                        <label>
                          手機：
                          <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </label>
                        <br />
                        <label>
                          電子信箱：
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </label>
                        <br />
                      </div>
                    </fieldset>
                  </form>
                ) : (
                  <form className='memberformdiv'>
                    <fieldset>
                      <legend>基本資料</legend>
                      {/* Form 2 data */}
                      <div className='displaybtn'>
                        <button onClick={handleEditClick2}>編輯資料</button>
                      </div>
                      <div>姓名： {name}</div>
                      <div>暱稱： {nickname}</div>
                      <div>生日： {birthday}</div>
                      <div>性別： {gender}</div>
                      <div>身分證： {identityCard}</div>
                      <div>手機： {phoneNumber}</div>
                      <div>電子信箱： {email}</div>
                    </fieldset>
                  </form>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Personal;
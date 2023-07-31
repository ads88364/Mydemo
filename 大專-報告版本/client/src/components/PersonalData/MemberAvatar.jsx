import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const prc = async () => {
      const response = await axios.get(`http://localhost:8000/api/members/MemberAvatar${avatarUrl}`) 
      console.log(response.data.avatarUrl)
     
    };
    prc();
  }, [])


  return <Avatar src={avatarUrl} alt="avatar" />;
};

export default MemberAvatar;

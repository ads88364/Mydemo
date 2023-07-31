import React, { useState, useEffect } from 'react';


// import Navbar from '../components/Home/navbar/navbar';
// import Navbar2 from '../components/Home/navbar2/navbar2';
import Outdoor from '../components/Home/outdoor/outdoor';
import Outdoor2 from '../components/Home/outdoor2/outdoor2';
import Outdoor3 from '../components/Home/outdoor3/outdoor3';
import Outdoor4 from '../components/Home/outdoor4/outdoor4';
import TutorialGuide from '../components/login/TutorialGuide';

const Home = () => {
    const [show, setShow] = useState(0);
    const [show1, setShow1] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShow(1);
            setTimeout(() => {
                setShow1(1);
            }, 200);
        }, 200);

        return () => {
            clearTimeout(timer1);
        };
    }, []);

    return (
        <>
            <TutorialGuide />
            {/* <Navbar2/> */}
            {/* <Navbar/> */}
            {show === 1 && <Outdoor />}
            {show1 === 1 && (<><Outdoor2 /><Outdoor3 /> <Outdoor4 /></>)}
        </>
    );
};

export default Home;
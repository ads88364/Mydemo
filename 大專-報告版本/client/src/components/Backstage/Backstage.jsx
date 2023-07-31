import React, { useState, useEffect } from 'react';
import { Space, Table, ConfigProvider, Button, Modal } from 'antd';
import axios from 'axios';
import "./Backstage.css";


const Backstage = () => {


    // 資料庫取出會員資訊
    const [user, setuser] = useState("")

    useEffect(() => {
        const userApi = async () => {
            const res = await axios.get(`http://localhost:8000/BSuser`)
            const user = await res.data;
            const usersWithIndex = user.map((user, index) => ({
                ...user,
                index: index + 1,
                key: index,
                birthday: user.birthday.split('T')[0]
                // birthday: user.birthday,
            }));

            setuser(usersWithIndex)
        }
        userApi();
    }, [])
    console.log(user)


    if (user) {
        const aaa = user.map((users) => {
            return {
                birthday: users.birthday,
                account: users.account
            };
        });
        console.log(aaa)
    }






    // ========================================================================


    // 表單頁面資訊 會員資料
    const { Column, ColumnGroup } = Table;


    // 表單頁面資訊 問題回報
    // const { Column1, ColumnGroup1 } = Table;
    // const data1 = [
    //     {
    //         key: '1',
    //         MemberID: '12345',
    //         MemberAt: 'AAA',
    //         name: "買不到",
    //         email: '1/1',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         MemberID: '8888',
    //         MemberAt: 'BBB',
    //         name: "賣光了",
    //         phone: "0911111111",
    //         email: '1/2',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         MemberID: '12345',
    //         MemberAt: 'CCC',
    //         name: "太便宜",
    //         email: '1/3',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];


    // ========================================================================
    //修改&刪除
    const [CGDLaccount, setCGDLaccount] = useState("")


    // 修改
    const changeData = (CGdata) => {
        setCGDLaccount(CGdata)
        console.log(CGdata);
        setOpenCG(true);
    }

    // 停權
    const stopData = (DLid) => {
        setCGDLaccount(DLid)
        console.log(DLid);
        setOpenDL(true);
    }

    // 復權
    const backData = (BKid) => {
        setCGDLaccount(BKid)
        console.log(BKid);
        setOpenBK(true);
    }

    // 點擊OK=>修改
    const [openCG, setOpenCG] = useState(false);
    const [genderIP, setgender] = useState("")
    const [birthdayIP, setbirthday] = useState("")
    const [identityCardIP, setidentityCardIP] = useState("")

    // console.log(nameIP)
    // console.log(typeof birthdayIP)
    // console.log(emailIP)



    // // 會員修改正規表達式
    // const handleGenderChange = (e) => {
    //     // 使用正規表達式判斷是否為合法的性別輸入（1 或 2）
    //     const genderRegex = /^[12]$/;
    //     if (genderRegex.test(e.target.value)) {
    //         setgender(e.target.value);
    //         console.log("gender YES")
    //     }else{
    //         console.log("gender NO")
    //     }
    // };
    // const handleBirthdayChange = (e) => {
    //     // 使用正規表達式判斷是否為合法的生日輸入（8位數字）
    //     const birthdayRegex = /^\d{8}$/;
    //     if (birthdayRegex.test(e.target.value)) {
    //         setbirthday(e.target.value);
    //         console.log("birthday YES")
    //     }else{
    //         console.log("birthday NO")        }
    // };
    // const handleIdentityCardChange = (e) => {
    //     // 使用正規表達式判斷是否為合法的身分證字號輸入（F後接 9 個數字）
    //     const identityCardRegex = /^[A-Z][12]\d{8}$/;
    //     if (identityCardRegex.test(e.target.value)) {
    //         setidentityCardIP(e.target.value);
    //         console.log("identityCard YES")

    //     }else{
    //         console.log("identityCard NO")
    //     }
    // };


    //生日天數+1 規避時區問題
    const birthdayNumber = (e) => {
        const Numbercg = Number(e.target.value) + 1
        console.log(Numbercg)
        setbirthday(Numbercg)
    }


    // 點擊ok => 更新
    const handleOk = () => {
        // 傳送更新資料
        setOpenCG(false);
        axios.put(`http://localhost:8000/CGuser?account=${CGDLaccount}`, {
            gender: genderIP,
            birthday: birthdayIP,   // 2001-09-02T16:00:00.000Z
            identityCard: identityCardIP,
        })
        // alert("更新成功")
    };
    const handleCancel = () => {
        // 取消
        setOpenCG(false);
    };


    // 點擊OK=>停權
    const [openDL, setOpenDL] = useState(false);
    // 點擊按鈕時
    const handleOk2 = () => {
        // 處理
        setOpenDL(false);
        axios.put(`http://localhost:8000/BSuser?account=${CGDLaccount}`, { isDelete: 1 })
    };
    const handleCancel2 = () => {
        // 取消
        setOpenDL(false);
    };

    // 點擊OK=>復權
    const [openBK, setOpenBK] = useState(false);
    // 點擊按鈕時
    const handleOk3 = () => {
        // 處理
        setOpenBK(false);
        axios.put(`http://localhost:8000/BSuser?account=${CGDLaccount}`, { isDelete: 0 })
    };
    const handleCancel3 = () => {
        // 取消
        setOpenBK(false);
    };


    // ========================================================================
    // 會員&問題回報 切換
    const [open, setOpen] = useState(false);

    const controlBtn = () => {
        setOpen((prev) => { return !prev })
    }


    // ========================================================================

    const account = localStorage.getItem('userInfo').slice(1, -1)


    return (
        <>
            {account === "qaz12345" ? (<>
                <div className='BS_BtnStyle'>
                    <Space className='BS_BtnStyle_space'>
                        <Button type="primary" className='BS_BtnStyle_Button' onClick={controlBtn} >會員資料</Button>
                        {/* <Button type="primary" className='BS_BtnStyle_Button' onClick={controlBtn} >問題回報</Button> */}
                    </Space>
                </div>


                {/* 第一個部分-會員資料 */}
                {!open && <ConfigProvider
                    // Token全部CSS 
                    theme={{ token: { fontSize: '1.2rem' } }} >

                    <Table dataSource={user} >
                        <ColumnGroup title="會員資料">
                            <Column title="會員編號" dataIndex="index" key="index" />
                            <Column title="帳號名稱" dataIndex="account" key="account" />
                        </ColumnGroup>
                        <Column title="性別" dataIndex="gender" key="gender" />
                        <Column title="生日" dataIndex="birthday" key="birthday" />
                        <Column title="身分證字號" dataIndex="identityCard" key="identityCard" />
                        <Column
                            title="操作"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <button style={{ fontSize: '1.3rem' }} onClick={() => changeData(record.account)}>修改</button>
                                    <button style={{ fontSize: '1.3rem' }} onClick={() => stopData(record.account)}>停權</button>
                                    <button style={{ fontSize: '1.3rem' }} onClick={() => backData(record.account)}>復權</button>
                                </Space>
                            )}
                        />
                    </Table>

                </ConfigProvider>}



                {/* 第一個部分-問題回報 */}
                {/* {open && <ConfigProvider
                // Token全部CSS 
                theme={{ token: { fontSize: '1.2rem' } }} >

                <Table dataSource={data1}>
                    <ColumnGroup1 title="問題回報">
                        <Column1 title="申訴編號" dataIndex="MemberID" key="MemberID" />
                        <Column1 title="申訴帳號" dataIndex="MemberAt" key="MemberAt" />
                    </ColumnGroup1>
                    <Column1 title="問題" dataIndex="name" key="name" />
                    <Column1 title="日期" dataIndex="email" key="email" />
                    <Column1
                        title="狀態"
                        dataIndex="tags"
                        key="tags"
                        render={(tags) => (
                            <>
                                {tags.map((tag) => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column1
                        title="操作"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <p >修改 {record.lastName}</p>
                                <a href='#'>刪除</a>
                            </Space>
                        )}
                    />
                </Table>

            </ConfigProvider>} */}

                <div>
                    <Modal
                        title="修改會員資料"
                        open={openCG}
                        onOk={handleOk}
                        onCancel={handleCancel}


                    >
                        <div style={{ fontSize: '1.5rem' }}>
                            <p style={{ fontSize: '1.5rem' }}>修改完成請按OK送出!</p>
                            {/* 性別:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="男生填入1/女生填入2" onChange={(e) => { setgender(e.target.value); handleGenderChange(e) }} /> */}
                            性別:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="男生填入1/女生填入2" onChange={(e) => { setgender(e.target.value) }} />
                            <br />
                            {/* 生日:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="19910711" onChange={(e) => { birthdayNumber(); handleBirthdayChange(e) }} /> */}
                            生日:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="19910711" onChange={birthdayNumber} />
                            <br />
                            {/* 身分證字號:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="Fxxxxxxxxx" onChange={(e) => { setidentityCardIP(e.target.value); handleIdentityCardChange(e) }} /> */}
                            身分證字號:<input type="text" style={{ fontSize: '1.3rem' }} placeholder="Fxxxxxxxxx" onChange={(e) => { setidentityCardIP(e.target.value) }} />
                        </div>

                    </Modal>
                </div>
                <div>
                    <Modal
                        title="是否停權該筆帳號"
                        open={openDL}
                        onOk={handleOk2}
                        onCancel={handleCancel2}
                    >
                        <p style={{ fontSize: '1.5rem' }}>確定停權嗎?</p>
                    </Modal>
                </div>
                <div>
                    <Modal
                        title="是否恢復該筆帳號"
                        open={openBK}
                        onOk={handleOk3}
                        onCancel={handleCancel3}
                    >
                        <p style={{ fontSize: '1.5rem' }}>確定復權嗎?</p>
                    </Modal>
                </div>


            </>) : (<div>你不是管理者 無法進入後台</div>)}

        </>
    );

}


export default Backstage
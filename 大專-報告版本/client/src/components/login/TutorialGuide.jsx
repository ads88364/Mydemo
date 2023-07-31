import React, { useEffect, useState } from 'react';
import './TutorialGuide.scss'
const TutorialGuide = () => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        const tutorialShown = localStorage.getItem('tutorialShown');
        if (!tutorialShown) {
            setStep(1);
            localStorage.setItem('tutorialShown', 'true');
        }else{
            setStep(0);
        }
    }, []);

    const nextStep = () => {
        switch (step) {
            case 1:
                setStep(2);
                break;

            case 2:
                setStep(3);
                break;

            case 3:
                setStep(4);
                break;

            case 4:
                setStep(0);
                break;
        }
    };

    return (
        <div>
            {step !== 0 && (
                <>
                    {/* 教學導覽的遮罩 */}
                    <div
                        id="tutorial-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9999,
                        }}
                    ></div>

                    {/*提示框 */}
                    <div
                        id="tutorial-tip"className={`step-${step}`}
                    >
                        {step === 1 ? (
                            <>
                                <p>這裡查看租借列表</p>
                                <button onClick={nextStep}>下一步</button>
                            </>
                        ) : step === 2 ? (
                            <>
                                <p>這裡上傳想出租的物品</p>
                                <button onClick={nextStep}>下一步</button>
                            </>
                        ) : step === 3 ? (
                            <>
                                <p>加入我們！</p>
                                <button onClick={nextStep}>下一步</button>
                            </>
                        ) : (
                            <>
                                <p>有問題在這裡聯繫我們！</p>
                                <button onClick={nextStep}>完成</button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default TutorialGuide;

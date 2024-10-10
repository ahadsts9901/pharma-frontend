import "./SplashScreen.css"
import logo from "/logo.webp"
import * as React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const SplashScreen = () => {

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <div className="splashCont">
                <img src={logo} alt="logo" />
                <LinearProgress variant="determinate" value={progress} sx={{ width: "300px" }} />
            </div>
        </>
    )
}

export default SplashScreen
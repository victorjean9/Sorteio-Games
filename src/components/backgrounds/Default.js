import { useEffect, useRef } from "react";

const Default = () => {

    let canvasRef = useRef();

    const Animate = () => {
    }

    useEffect(() => {
        Animate();
    }, []);
      

    return(
        <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}}></canvas>
    );
}

export default Default;
import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt>
            <div className='Tilt br2 shadow-2 pa3' options={{max : 10}} style={{height: 150, width:150}}>
                <img style={{paddingTop:'5px', width: '100px', height: 'auto'}} alt='logo' src={brain}/>
            </div>
            </Tilt>
        </div>
    ); 
}
export default Logo;
import React from 'react'
import './footer.css'
import mobileImage from '../Images/app.png'
import Play from '../Images/play.png'
import app from '../Images/app-store.png'
import logo from '../Images/logo.png'


export default function Footer(){
    return(
        <div>
                <div style={{paddingLeft: 75,paddingRight: 75,color: 'white',backgroundColor: '#e8500e', display: 'flex', justifyContent: 'space-around'}}>
                {/* <h1>asd</h1> */}
                <img src={mobileImage} alt='mobile' style={{marginTop: -50}} />
                <div style={{textAlign: 'left', marginTop: 50}}>
                    <h2>
                    The Best Food Delivery App
                    </h2>
                    <p>
                    Now you can make food happen pretty much wherever you are <br /> thanks to the free easy-to-use Food Delivery & Takeout App.
                    </p>
                    <div>
                    <img src={Play} alt='play' style={{float: 'left'}} />
                    <img src={app} alt='app' style={{float: 'left', marginLeft: 5}} />
                    </div>
                </div>
                </div>
                
            <div className='footer' style={{display: 'flex', justifyContent: 'space-around', color: '#efedde'}}>
                <div>
                    <h2>
                    <img src={logo} alt='logo' style={{height: 40, width: 120}} />
                    </h2>
                </div>
                <div>
                    <h2>Adress</h2>
                    <p>Concept design of oline food order and deliveye,planned <br /> as restaurant directory</p>
                    <h2>Phone: <span style={{color: '#e8500e'}}> + 92 *** ******* </span></h2>
                </div>
                <div>
                    <h2>Addition informations</h2>
                    <p>Join the thousands of other restaurants who benefit from having their <br /> menus on TakeOff</p>
                </div>
            </div>
        </div>
    )
}
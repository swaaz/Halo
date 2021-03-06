import React from 'react';
import './About.css';
import swaaz from '../../assets/creators/swaaz.jpeg';
import suhan from '../../assets/creators/suhan.jpeg';
import rachitha from '../../assets/creators/rachitha.jpg';

const About = () => {
    return (
        <div className="about">
        <div className="AboutSection">
            <div className="about-headings"> 
                <h1 className="AboutTitle">Halo</h1>
                <h4 className="AboutHeading">Creators</h4>
            </div>
            <div className="AboutRow">
                <div className="AboutColumn">
                <div className="AboutProfile">
                        <img className="AboutImage" src={suhan} alt="suhan" />
                    </div>
                    <div className="AboutButton">
                        <a rel="noreferrer" target="_blank" href='https://github.com/suhanacharya' ><p className="AboutButtonText">Suhan</p></a>
                    </div>
                </div>
                <div className="AboutColumn">
                    <div className="AboutProfile">
                        <img className="AboutImage" src={swaaz} alt="Swaaz" />
                    </div>
                    <div className="AboutButton">
                        <a rel="noreferrer" target="_blank"  href='https://www.linkedin.com/in/swasthik-shetty-b50928174/' ><p className="AboutButtonText">Swasthik</p></a>
                    </div>
                </div>
                <div className="AboutColumn">
                <div className="AboutProfile">
                        <img className="AboutImage" src={rachitha} alt="rachitha" />
                    </div>
                    <div className="AboutButton">
                        <a rel="noreferrer" target="_blank" href='https://github.com/RachithaRai' ><p className="AboutButtonText">Rachitha</p></a>
                    </div>
                </div>
            </div>
            <div className="AboutFooter">
                A game we community folks built in a Hackathon.
            </div>
        </div>
        </div>
    )
}

export default About

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
            <footer className="footer">
                <nav className="icons">
                    <FontAwesomeIcon icon={faYoutube} size="1x"/>
                    <FontAwesomeIcon icon={faFacebook} size="1x"/>
                    <FontAwesomeIcon icon={faTwitter} size="1x"/>
                    <FontAwesomeIcon icon={faInstagram} size="1x"/>
                </nav>
            </footer>
    )
};

export default Footer;
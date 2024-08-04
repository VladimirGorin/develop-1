import React, { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaChange = ({ onChange }) => {
    const recaptchaRef = createRef();

    const handleRecaptchaChange = (value) => {
        if (onChange && typeof onChange === "function") {
            onChange(value); 
        }
    };

    return (
        <div className="captcha-wrapper">
            <ReCAPTCHA
                style={{width: '100%;'}}
                ref={recaptchaRef}
                sitekey="6LfxumopAAAAABYuPuN5dLOGUiyMOhGZFQdE4P18"
                onChange={handleRecaptchaChange}
            />
        </div>
    );
};

export default RecaptchaChange;

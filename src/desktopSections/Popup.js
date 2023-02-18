import './Popup.scss';
import { useState } from "react";

const Popup = ({msg}) => {
    const [popupMsg, setPopupMsg] = useState('');

    useEffect(() => {
        setPopupMsg(msg);
    }, []);

    return (
        <div className="modal-container">
            <div className="modal-content">
                <p>{popupMsg}</p>
                <div className="modal-button">Close</div>
            </div>
        </div>
    )
}

export default Popup;


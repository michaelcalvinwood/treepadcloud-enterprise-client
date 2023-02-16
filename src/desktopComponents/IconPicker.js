import './IconPicker.scss';
import React, { useState, useEffect } from 'react';
import { IonButton, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import iconList from '../data/svg-filenames.json';
import iconSets from '../data/iconSets.json';
import axios from 'axios';

const IconPicker = props => {
    const maxIconsAllowed = 1000;

    let iconsStr = localStorage.getItem('icons');
    let iconsArray = iconsStr ? JSON.parse(iconsStr) : [];
    
    const [icons, setIcons] = useState(iconsArray);
    const [searchValue, setSearchValue] = useState('');

    const {setIconName, setShowIconPicker} = props;

    const setTheIcons = icons => setIcons(icons);

    function getIcons() {
        const request = {
            url: "https://static.treepadcloud.com/images/svg/icons.json",
            method: 'get'
        }
        axios(request)
        .then(response => {
            setTheIcons(response.data);
            console.log('typeof response.data', response.data);
            localStorage.setItem('icons', JSON.stringify(response.data));
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (!icons.length) getIcons();
      });

    let filteredIcons = icons.filter(icon => icon.n.indexOf(searchValue) !== -1);

    return (
        <div className='icon-picker'>
            <div className='icon-picker__choice-container'>
                <IonSearchbar 
                    onIonChange={(e) => setSearchValue(e.detail.value)}
                    className='icon-picker__search'/>
            </div>
             
            <div className='icon-picker__list-container'>
                <div className='icon-picker__icon-list'>
                    { filteredIcons.length <= 2500 && filteredIcons.map(icon => {
                        return (
                            <p 
                                onClick={() => setIconName(`/svg/${icon.t}/${icon.n}`)}
                                className='icon-picker__icon'
                                key={`${icon.t}-${icon.n}`}>{icon.n}</p>
                        )
                    })
                    }
                    {
                        filteredIcons.length > 2500 && `${filteredIcons.length} icons`
                    }
                </div>
            </div>
            <IonButton onClick={() => setShowIconPicker(false)}>Close</IonButton>
            
        </div>
    )
}

export default IconPicker;
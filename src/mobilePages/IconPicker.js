import { IonBackButton, IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import './IconPicker.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// import iconList from '../data/svg-filenames.json';
// import iconSets from '../data/iconSets.json';
import axios from "axios";
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const IconPicker = (props) => {
    const maxIconsAllowed = 1000;

    let iconsStr = localStorage.getItem('icons');
    let iconsArray = iconsStr ? JSON.parse(iconsStr) : [];
    
    const [icons, setIcons] = useState(iconsArray);
    const [searchValue, setSearchValue] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);

    const {setIconName, setShowIconPicker} = props;

    const setTheIcons = icons => setIcons(icons);
    const selectIcon = icon => {
        setSelectedIcon(icon)
    }
    const chooseIcon = icon => {
        setIconName(`/svg/${selectedIcon.t}/${selectedIcon.n}.svg`)
    }

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

    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/trees" color="light"/>
                    </IonButtons>
                    <IonTitle>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <IonImg src={treePadIcon} style={{height: "1.5rem", display: "inline-block"}} />
                            <div style={{display: "inline-block", fontSize: "1.25rem", marginLeft: '.15rem'}}>TreePad Cloud</div>
                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonImg 
                className="add-tree__icon"
                style={{marginTop: '.5rem'}}
                src={selectedIcon ? 
                    `https://static.treepadcloud.com/images/svg/${selectedIcon.t}/${selectedIcon.n}.svg` : 
                    'https://static.treepadcloud.com/images/svg/tree.svg'} 
                />
            <div className='icon-picker-mobile__choice-container'>
                <IonSearchbar 
                    onIonChange={(e) => setSearchValue(e.detail.value)}
                    className='icon-picker-mobile__search'/>
                <IonButton 
                    onClick={() => {
                        if (selectedIcon) chooseIcon();
                        history.push('/add-tree');
                    }}
                    style={{display: 'block', margin: 'auto', width: '4.5rem'}}
                >
                    Select
            </IonButton>
            </div>
             
            <div className='icon-picker__list-container'>
                <div className='icon-picker__icon-list'>
                { filteredIcons.length <= 2500 && filteredIcons.map(icon => {
                        return (
                            <p 
                                onClick={() => selectIcon(icon)}
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
            
            
        
            </IonContent>
        </IonPage>
       
    )
}

export default IconPicker;
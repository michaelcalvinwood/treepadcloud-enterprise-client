import { IonBackButton, IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import './IconPicker.scss';
import React, { useState } from 'react';
import iconList from '../data/svg-filenames.json';
import iconSets from '../data/iconSets.json';

import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const IconPicker = (props) => {
    const maxIconsAllowed = 1000;

    const [iconSet, setIconSet] = useState('regular');
    const [searchValue, setSearchValue] = useState('');

    const {setIconName, setShowIconPicker} = props;

    const getIconName = icon => {
        let loc = 5;
        let end = icon.indexOf('/', loc);
        const set = icon.substring(loc, end);
        let name = icon.substring(end + 1);
        loc = name.indexOf('.');
        name = name.substring(0, loc);
        return name;
    }

    const filteredList = iconList.filter(item => {
        const test1 = iconSet === 'all' || item.indexOf(`/svg/${iconSet}/`) !== -1;

        if (!searchValue) return test1;
        if (!test1) return false;

        const test2 = item.indexOf(searchValue, iconSet.length + 6) !== -1;

        return test2;
    });

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
           
            <div className='icon-picker__choice-container'>
                <IonSearchbar 
                    onIonChange={(e) => setSearchValue(e.detail.value)}
                    className='icon-picker__search'/>
                <IonSelect 
                    className='icon-picker__select' 
                    value={iconSet} 
                    placeholder={iconSet} 
                    onIonChange={e => setIconSet(e.detail.value)}
                    >
                    {iconSets.map(set => {
                        return (
                            <IonSelectOption key={set} value={set}>{set}</IonSelectOption>
                        )
                    })}
                </IonSelect>
            </div>
             
            <div className='icon-picker__list-container'>
                <div className='icon-picker__icon-list'>
                    {filteredList.length <= maxIconsAllowed && filteredList
                    .sort((a, b) => {
                        if (getIconName(a) > getIconName(b)) return 1;
                        if (getIconName(a) < getIconName(b)) return -1;
                        return 0;
                    })
                    .map(iconName => {
                        return (
                            <p 
                                onClick={() => setIconName(iconName)}
                                className='icon-picker-mobile__icon'
                                key={iconName}>{getIconName(iconName)}</p>
                        )
                    })}
                    {filteredList.length > maxIconsAllowed && <div><span style={ {color: "black", fontWeight: 700}}>{filteredList.length}</span> icons</div>}
                </div>
            </div>
            <IonButton onClick={() => setShowIconPicker(false)}>Close</IonButton>
            
        
            </IonContent>
        </IonPage>
       
    )
}

export default IconPicker;
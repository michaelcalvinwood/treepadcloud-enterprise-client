import './IconPicker.scss';
import React, { useState } from 'react';
import { IonButton, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import iconList from '../data/svg-filenames.json';
import iconSets from '../data/iconSets.json';

const IconPicker = props => {
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
        <div className='icon-picker'>
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
                    {filteredList
                    .sort((a, b) => {return getIconName(a) - getIconName(b)})
                    .map(iconName => {
                        return (
                            <p 
                                onClick={() => setIconName(iconName)}
                                className='icon-picker__icon'
                                key={iconName}>{getIconName(iconName)}</p>
                        )
                    })}
                </div>
            </div>
            <IonButton onClick={() => setShowIconPicker(false)}>Close</IonButton>
            
        </div>
    )
}

export default IconPicker;
import './TreeCard.scss';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToast } from "@ionic/react";
import React, { useContext } from "react";
import deleteIcon from '../assets/icons/delete.svg';
import editIcon from '../assets/icons/edit.svg';
import downIcon from '../assets/icons/down.svg';
import upIcon from '../assets/icons/up.svg';
//import { deleteTree } from '../utils/api-axios';
//import AppContext from '../data/AppContext';

const TreeCard = props => {
    const debug = true;

    const {treeName, treeId, ownerName, icon, activeTree, subscribeToTree} = props;

    if (debug) console.log('TreeCard props', props);

    const deleteTree = () => {
        if (debug) console.log('TreeCard deleteTree', treeId);
        window.socket.forrestEmit('deleteTree', {treeId});
    }

    return (
        <div className={activeTree && activeTree._id === treeId ? 'tree-card tree-card--active' : 'tree-card'}>
            <div 
                onClick={() => subscribeToTree(treeId)}
                className='tree-card__click-area'>
                <img 
                    className='tree-card__image'
                    src={`https://static.treepadcloud.com/images/${icon}`} 
            /> 
                <h2 className='tree-card__title'>{treeName}</h2>
                <p className='tree-card__subtitle'>{ownerName}</p>
            </div>
            { activeTree && activeTree._id === treeId &&
                <div className='tree-card__actions'>
                     <img
                        // onClick={() => appCtx.setModals(prev => {
                          
                        //     prev.addTree.active = true;
                        //     prev.addTree.type = 'edit';
                        //     prev.addTree.treeId = treeId
                        //     return {...prev}
                        // })} 
                        className='tree-card__edit'
                        src={editIcon} />
                    <img 
                        onClick={deleteTree}
                        className='tree-card__delete' 
                        src={deleteIcon} />
                    {/* <img className='tree-card__up' src={upIcon} />
                    <img className='tree-card__down' src={downIcon} /> */}
                   
                </div> 
            }
    </div>
    )
}

export default TreeCard;
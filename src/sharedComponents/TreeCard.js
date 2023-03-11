import './TreeCard.scss';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToast } from "@ionic/react";
import React, { useContext } from "react";
import deleteIcon from '../assets/icons/delete.svg';
import editIcon from '../assets/icons/edit.svg';
import downIcon from '../assets/icons/down.svg';
import upIcon from '../assets/icons/up.svg';
import socketUtils from '../utils/socket-utils';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTree } from '../store/sliceActiveTree';
const TreeCard = ({deleteTree, tree, ownerName, toggleAddModal, setModalInfo}) => {
    const debug = false;
    const dispatch = useDispatch();

    const activeTree = useSelector(state => state.activeTree);

    return (
        <div className={activeTree && activeTree._id === tree._id ? 'tree-card tree-card--active' : 'tree-card'}>
            <div 
                onClick={() => dispatch(setActiveTree({activeTree: tree}))}
                className='tree-card__click-area'>
                <img 
                    className='tree-card__image'
                    src={`https://static.treepadcloud.com/images/${tree.icon}`} 
            /> 
                <h2 className='tree-card__title'>{tree.name}</h2>
                <p className='tree-card__subtitle'>{ownerName}</p>
            </div>
            { activeTree && activeTree._id === tree.id &&
                <div className='tree-card__actions'>
                     <img
                        onClick={() => {
                            setModalInfo({
                                action: 'edit',
                                icon: tree.icon,
                                treeId: tree.id,
                                treeName: tree.name,
                                treeDesc: tree.desc
                            });
                            toggleAddModal();
                        }} 
                        className='tree-card__edit'
                        src={editIcon} />
                    <img 
                        onClick={() => deleteTree(tree.id)}
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
import React, { Component } from 'react'
import './Trees.scss'


export default class Trees extends Component {

    render() {
        
        const { treeTitle, sectionState, toggleSectionState, linkIcon, closeIcon } = this.props;

        console.log('trees');

        let sectionClassName = 'trees';
        let titleClassName = 'trees__title';
        let contentClassName = 'trees__content';
        let iconClassname = 'trees__icon'

        if (sectionState) {
            sectionClassName += ' trees--active';
        } else {
            sectionClassName += ' trees--inactive';
            iconClassname += ' trees__icon--inactive';
            contentClassName += ' trees__content--inactive';

        }

        return (
            <>
                <section className={sectionClassName}>
                    <img className='trees__link' src={linkIcon}/>
                    <img 
                        className='trees__close'
                        onClick={e => toggleSectionState(e, 'trees')}
                        src={closeIcon}/>            
                    <div 
                        className={titleClassName}
                        >
                        {treeTitle}
                    </div>
                    <div className={contentClassName}>
                       <h1>Content Goes Here</h1>
                    </div>
                </section>
            </>
        )
    }
}

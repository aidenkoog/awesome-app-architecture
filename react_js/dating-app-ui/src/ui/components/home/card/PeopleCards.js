import React, { useState } from 'react'
import TinderCard from 'react-tinder-card';
import { PEOPLE_DUMMY } from '../../../../data/dummy/PeopleDummy';
import './PeopleCards.css'

export default function PeopleCards() {

    const [people, setPeople] = useState(PEOPLE_DUMMY);
    
    return (
        <div>
            <div className='card__container'>
                {people.map(person => (
                    <TinderCard 
                        className='swipe' 
                        key={person.name} 
                        preventSwipe={['up', 'down']}>
                            <div style={
                                { 
                                    backgroundImage: `url(${person.url})` }
                                } 
                                className='card'>
                                <h3>{person.name}</h3>
                            </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}
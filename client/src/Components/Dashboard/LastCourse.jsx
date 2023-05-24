import React from 'react';
import Title from './Title';
import { ReactComponent as Leopardo } from '../../Assets/leopardo.svg';

const LastCourse = () => {
  return (
    <section className="container">
      <Title>Último curso</Title>
      <div>
        <Leopardo />
        
      </div>
    </section>
  );
};

export default LastCourse;

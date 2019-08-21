import React from 'react';
import styled, { css } from 'styled-components';

export default class Draggable extends React.Component {


  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 411,
    translateY: 0,

    lastTranslateX: 411,
    lastTranslateY: 0
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
   // this.props.distance(this.value); 
  };

  handleMouseMove = ({ clientX, clientY }) => {

    const { isDragging } = this.state;
    const { onDrag } = this.props;
   
     
      if (!isDragging) {
        return;
      }
      
      
      if ( (clientX - this.state.originalX + this.state.lastTranslateX)<60) {/*||(clientX - this.state.originalX + this.state.lastTranslateX>197)){*/
        this.setState(prevState => ({
          translateX:60,
          translateY: 0
        }), () => {
          if (onDrag) {
            onDrag({
              translateX: this.state.translateX,
              translateY: 0
            });
          }  
        })
      }
      else if(clientX - this.state.originalX + this.state.lastTranslateX>411){
        this.setState(prevState => ({
          translateX:411,
          translateY: 0
        }), () => {
          if (onDrag) {
            onDrag({
              translateX: this.state.translateX,
              translateY: 0
            });
          }  
        })
      }
    else {
      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: 0
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: 0
          });
        }  
      }
      
      )}
     // console.log(Math.round(this.state.translateX*100/384+49.22));

     if (this.props.frequency==24){
      if(this.props.object=="Bus"){
        this.props.distance(Math.round(this.state.translateX*40/350-6.971));
      }
      
      else if (this.props.object=="Car"){
        this.props.distance(Math.round(this.state.translateX*40/350-6.971));      
      }

      else if (this.props.object=="Person"){
        this.props.distance(Math.round(this.state.translateX*10/350-1.7428));    
      }
     }

     else if (this.props.frequency==60) {

      if(this.props.object=="Bus"){
        this.props.distance(Math.round(this.state.translateX*30/350-5.228));      
      }
      else if (this.props.object=="Car"){
        this.props.distance(Math.round(this.state.translateX*30/350-5.228));      
      }
      else if (this.props.object=="Person"){
        this.props.distance(Math.round(this.state.translateX*10/350-1.7428));
      }
    }
     
  };
  

   

   handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;
    return (
      <Container
        onMouseDown={this.handleMouseDown}
      //  onChange={ (event) => this.props.change(event.target.value) }
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        value={Math.round(this.state.translateX*100/384+49.22)}
      >
        
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`
  }),
})`
  cursor: grab;
  
  ${({ isDragging }) =>
  isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;


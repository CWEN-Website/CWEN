import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);

        this.lefRef= React.createRef();

        /* Setting the state Index parts array */
        let buildingPartsIndex = [];

        // the 0th value should be the final index
        buildingPartsIndex[0] = this.props.parts.length - 1;

        for(let i = 1; i < 5; i++){
            buildingPartsIndex[i] = i - 1;
        }


        /* building the state parts array */
        let buildingStateParts = [];
        for(let i = 0; i < 5; i++){
            buildingStateParts[i] = this.props.parts[buildingPartsIndex[i]];
        }

        this.state = {
            length: this.props.parts.length,
            sliding: "N",
            partsIndex: buildingPartsIndex,
            parts: buildingStateParts,
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.doneAnimation = this.doneAnimation.bind(this);
        this.finishedMovingLeft = this.finishedMovingLeft.bind(this);
    }

    moveLeft(e) {
        e.preventDefault();

        // prevent double clicking
        if(this.state.sliding !== "N"){
            return
        }

        this.setState({sliding: "L"})

        // onAnimationEnd does not work. This is the hack I came up wit
        setTimeout(this.doneAnimation,2000);
    };

    moveRight(e) {
        e.preventDefault()
        // prevent double clicking
        if(this.state.sliding !== "N"){
            return
        }

        e.preventDefault();
        
        this.setState({sliding: "R"});

        // onAnimationEnd does not work. This is the hack I came up with
        setTimeout(this.doneAnimation,2000);
    };

    test(){
        alert("Done!")
    }

    doneAnimation(){
        if(this.state.sliding === "L"){
            this.finishedMovingLeft();
        }else if(this.state.sliding === "R"){
            this.finishedMovingRight();
        }
    }

    finishedMovingLeft(){
        /*updating the parts Index  array*/
        let updatingPartsIndex = this.state.partsIndex.slice();

        for(let i = 0; i < 4; i++){
            updatingPartsIndex[i] = updatingPartsIndex[i + 1];
        }

        if(updatingPartsIndex[4] === this.state.length - 1){
            updatingPartsIndex[4] = 0;
        }else{
            updatingPartsIndex[4] = updatingPartsIndex[4] + 1;
        }

        

        /* building the state parts array */
        let buildingStateParts = [];
        for(let i = 0; i < 5; i++){
            buildingStateParts[i] = this.props.parts[updatingPartsIndex[i]];
        }


        this.setState({
            sliding: "N",
            partsIndex: updatingPartsIndex,
            parts: buildingStateParts,
        })
    }

    finishedMovingRight(){
        /*updating the parts Index  array*/
        let updatingPartsIndex = this.state.partsIndex.slice();

        for(let i = 4; i > 0; i--){
            updatingPartsIndex[i] = updatingPartsIndex[i - 1];
        }

        if(updatingPartsIndex[0] === 0){
            updatingPartsIndex[0] = this.state.length - 1;
        }else{
            updatingPartsIndex[0] = updatingPartsIndex[0] - 1;
        }

        /* building the state parts array */
        let buildingStateParts = [];
        for(let i = 0; i < 5; i++){
            buildingStateParts[i] = this.props.parts[updatingPartsIndex[i]];
        }


        this.setState({
            sliding: "N",
            partsIndex: updatingPartsIndex,
            parts: buildingStateParts,
        })
    }
    

    render() {        
        return (
                <div id = "rotation-wrapper">

                    <div id = "rotation">
                        <div id = "rot-head-wrapper">
                            <div id = "rot-head">
                                <div id = "rot-text">
                                    <h2>{this.props.type}</h2>
                                </div>

                                <div id = "rot-buttons">
                                    <a href="/" onClick={this.moveLeft}>&lt;</a>
                                    <a href="/" onClick={this.moveRight}>&gt;</a>
                                </div>
                            </div>
                        </div>

                        <div id = "rotatingWrapper">
                            <div id = "rotating">
                                {this.state.parts.map(stuff => <Rotpart key = {stuff.image} parts = {stuff} sliding = {this.state.sliding}/>)}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Rotation;
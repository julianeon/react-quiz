import React, { Component } from 'react';
import './App.css';
import garbage from './garbage.gif';
import up from './yesss.gif';
import down from './thomas.gif';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  text-align: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

 const dataSet = [
      {
        question: "Puppies",
        answers: [
          "Good",
          "Bad"
        ],
        correct: 0
      },
      {
        question: "Evil",
            answers: [
		"Good",
		"Bad"
            ],
            correct: 1
      },
       {
            question: "... children.",
            answers: [
              "Be good to",
              "Be bad to"
            ],
            correct: 0
          },
          {
            question: "As President, how many concentration camps should you build?",
            answers: [
		"0",
		"100",
		"As many as a billion dollars will buy",
		"One for every American"
            ],
            correct: 0
          },
    ];


class App extends Component {
  render() {
    return(
	    <div>
	    	  <Router>
          <div className="content">
          <Route exact path="/" component={Intro}/>
 	  <Route path="/quiz" component={Quiz} />
 	  <Route path="/finish" component={Outro} />	  
	  </div>
	  </Router>

      </div>
    )
  }
}

const Intro = () => {
    return (
	    <Center>
	    <h1>Are you a garbage person?</h1>
	    <img src={garbage} alt="garbage"/>
	    <p>Take this one weird quiz and find out!</p>
	    <StyledLink to="/quiz" component={Quiz}>&#9193;</StyledLink>	    
	    </Center>
    )
}

function Outro(props) {
    if (props.score===0) {
    return (
	    <Center>
	    <h1>Verdict</h1>
	    <img src={up} alt="good"/>
	    </Center>
    )
    } else
    return (
	    <Center>
	    <h1>Verdict</h1>
	    <img src={down} alt="garbage"/>
	    </Center>
    )
	
}

class Quiz extends Component {
    constructor(props) {
    super(props)
    
    this.state = {current:0, dataSet:dataSet, correct:0, incorrect:0}
    this.handleClick = this.handleClick.bind(this)
    
  } 
  
  handleClick(choice) {
    if (choice === this.state.dataSet[this.state.current].correct) {
	this.setState({correct: this.state.correct + 1})
    } else {
	this.setState({incorrect: this.state.incorrect + 1})
    }
    
    if (this.state.current < dataSet.length) {
	this.setState({current: this.state.current + 1}) 
    }}

    render() {
	if (this.state.current === dataSet.length) {
            return (
		    <div>
		    <Outro score={this.state.incorrect}/>
		    </div>
	    )
	} else {
  	    console.log(this.state.current); 
	    return (
		    <div>
		    <QuizArea handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />
		    </div>
	    )
	}}
}

function QuizArea(props) {
  var style = {
    width: "25%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em"
  }
  return(
    <div style={style}>
      <Question dataSet={props.dataSet} />
      <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
    </div>
  )
}



function Question(props) {
  var style = {
    color: "red",
  }
  return (
    <h1 style={style}>{props.dataSet.question}</h1>
  )
}

function Answer(props) {
  var style = {
    width: "100%",
    height: 50,
    color: "blue"
  }
  return(
    <div>
      <button style={style} onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
    </div>
  )
}

function AnswerList(props) {
  var answers = []
  for (let i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(<Answer choice={i} handleClick={props.handleClick} answer={props.dataSet.answers[i]} />)
  }
  return(
    <div>
      {answers}
    </div>
  )
}

export default App;

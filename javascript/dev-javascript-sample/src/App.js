import React, { Component } from "react";
import Quote from "./components/Quote";
import $ from 'jquery';
import { Grid, Row, Col, Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import "./App.css";

class App extends Component {

  // Setting state
  state = {
    quotes: [],
    picQuotes: [],
    category: 1,
    search: "",
    searchQuotes: []
  };

  //when the page loads
  componentDidMount() {

    const dUrl = "https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/b191cf3b6ea9cdcca8b363516ff969261398061f/quotes.json";

    fetch(dUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result,
            picQuotes: result
          });
          console.log(this.state.quotes);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };


  //gathers the search value from the input box and sets it to the search state
  handleChange = event => {

    event.preventDefault();
    let value = event.target.value;
    this.setState({ search: value.toLowerCase() });

  };

  //functions runs on the search button to see if any of the quotes in the database
  //contain a word that matches the search result
  handleButton = event => {

    event.preventDefault();
    var storeSearch = [];
    console.log(this.state.picQuotes);
    console.log(this.state.picQuotes[0]);

    // //iterates through all quotes
    // for (let i = 0; i < this.state.quotes.length; i++) {

    //   var element = this.state.quotes[i].name;
    //   var check = element.indexOf(this.state.search);

    //   //if the name of the freebie is contained in the name, push it to the search array
    //   if (check >= 0) {
    //     storeSearch.push(this.state.quotes[i]);
    //   }
    // }

    // //pushes the stored search array to the state search results
    // this.setState({ searchQuotes: storeSearch });

  };


  render() {

    const currentQuotes = this.state.picQuotes.map((picQuotes, id) =>
      <li key={picQuotes.id}>
        <Panel className="panel-success">
          <Panel.Heading componentClass="h3">
            {picQuotes.quote}
          </Panel.Heading>
          <Panel.Body>
            <p>{picQuotes.context}</p>
          </Panel.Body>
        </Panel>
      </li>);


    return (
      <Grid fluid>

        <Col md={12} sm={12}>

          <form>
            <FormGroup>
              <FormControl className="searchBox"
                type="text"
                value={this.state.value}
                name="searchbar"
                placeholder="Search quotes by keywords!"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button type="button" onClick={this.handleButton} className="searchButton">Search</Button>
          </form>

          <Quote>
            {currentQuotes}
          </Quote>

        </Col>

      </Grid>
    );
  }
}

export default App;

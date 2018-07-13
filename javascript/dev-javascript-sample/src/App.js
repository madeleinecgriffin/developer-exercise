import React, { Component } from "react";
import Quote from "./components/Quote";
import { Grid, Row, Col, Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import "./App.css";

class App extends Component {

  // Setting state
  state = {
    quotes: [], //list of all quotes pulled from url
    picQuotes: [], //current quotes matching filter criteria
    pageQuotes: [], //current quotes on specific page and matching filter criteria
    search: "", //stores the search word the user wants to look for
    numPages: 0, //determines the number of pages based on the length of JSON array
    pageList: [], //lists the number of pages as links
    currentPage: 1, //determines which page to display
  };

  //when the page loads, fetch the quotes from the link
  componentDidMount() {

    const dUrl = "https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/b191cf3b6ea9cdcca8b363516ff969261398061f/quotes.json";

    fetch(dUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result,
            picQuotes: result,
            numPages: Math.round(result.length / 10)
          });
          this.createPages();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };

  createPages() {

    //turns the number of pages into a list of links
    var store = [];
    for (let i = 1; i <= this.state.numPages; i++) {
      store.push(i);
    }

    //sets the array of page numbers to state
    this.setState({ pageList: store });

    this.assignPages();
  }

  //this function assigns each quote a page number
  assignPages() {

    var storePages = this.state.picQuotes;
    var divide = 1;

    //iterates through all quotes currently displaying
    for (let i = 0; i < this.state.picQuotes.length; i++) {

      //assigns page numbers to all the quotes so that there are 10 quotes per page
      storePages[i].pageNumber = divide;

      if ((i + 1) % 10 === 0) {
        divide++;
      }
    }

    this.setState({ quotes: storePages });
    this.setState({ picQuotes: storePages });
    console.log(this.state.picQuotes);

    //determines which page to display on page 1 based on new filters
    this.handlePageButton(1);

  }

  //filters quotes by page button clicked
  handlePageButton = id => {

    this.setState({ currentPage: id });

    var storePage = [];

    //iterates through all quotes to display only with the appropriate page number
    for (let i = 0; i < this.state.picQuotes.length; i++) {

      var element = this.state.picQuotes[i].pageNumber;

      if (element == id) {
        storePage.push(this.state.picQuotes[i]);
      }
    }

    //sets displayed quotes to those of the page
    this.setState({ pageQuotes: storePage });
    console.log(this.state.pageQuotes);

  };


  //gathers the search value from the input box and sets it to the search state
  handleChange = event => {

    event.preventDefault();
    let value = event.target.value;

    this.setState({ search: value.toLowerCase() });

  };

  //resets the quotes to list all
  handleResetButton = event => {

    event.preventDefault();

    //sets displayed quotes to all
    this.setState({ picQuotes: this.state.quotes });

    //reassigns page numbers to pages based on new filter criteria
    this.assignPages();

  };


  //filters quotes by theme depending on button clicked
  handleCategoryButton = id => {

    var storeCategory = [];

    //iterates through all quotes
    for (let i = 0; i < this.state.picQuotes.length; i++) {

      var element = this.state.picQuotes[i].theme;

      if (element == id) {
        storeCategory.push(this.state.picQuotes[i]);
      }
    }

    //sets displayed quotes to all
    this.setState({ picQuotes: storeCategory });
    console.log(storeCategory, this.state.picQuotes, this.state.pageQuotes);
    //reassigns page numbers to pages based on new filter criteria
    this.assignPages();

  };

  //functions runs on the search button to see if any of the quotes in the database
  //contain a word that matches the search result
  handleSearchButton = event => {

    event.preventDefault();
    var storeSearch = [];

    //iterates through all quotes
    for (let i = 0; i < this.state.picQuotes.length; i++) {

      var element = this.state.picQuotes[i].quote.toLowerCase();
      var check = element.indexOf(this.state.search);

      //if the text of the quote is contained in the search, push it to the search array
      if (check >= 0) {
        storeSearch.push(this.state.picQuotes[i]);
      }
    }

    //pushes the stored search array to the state search results
    this.setState({ picQuotes: storeSearch });

    //reassigns page numbers to pages based on new filter criteria
    this.assignPages();

  };


  render() {

    //maps all the current search results (default all) to the page
    const currentQuotes = this.state.pageQuotes.map((pageQuotes, id) =>
      <li key={pageQuotes.id}>
        <Panel className="panel-success">
          <Panel.Heading componentClass="h3">
            {pageQuotes.quote}
          </Panel.Heading>
          <Panel.Body>
            <p>{pageQuotes.context}</p>
            <p>{pageQuotes.source}</p>
            <p>{pageQuotes.theme}</p>
          </Panel.Body>
        </Panel>
      </li>);

    var pages = this.state.pageList.map((pageList, id) =>
      <li key={pageList.id}>
        <Button type="button" onClick={() => this.handlePageButton(pageList)} className="pageButton">
          {pageList}
        </Button>
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
            <Button type="button" onClick={this.handleSearchButton} className="searchButton">Search</Button>
          </form>

          <p>Which category of quotes would you like to view?</p>
          <Button type="button" onClick={this.handleResetButton} className="resetButton">All</Button>
          <Button type="button" id="movies" onClick={() => this.handleCategoryButton("movies")} className="categoryButton">Movies</Button>
          <Button type="button" id="games" onClick={() => this.handleCategoryButton("games")} className="categoryButton">Games</Button>


          <Quote>
            {currentQuotes}
          </Quote>

          <div>
            {pages}
          </div>

        </Col>

      </Grid>
    );
  }
}

export default App;

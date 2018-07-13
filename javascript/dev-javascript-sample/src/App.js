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
    category: "all", //stores the current category the user wants to look for
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
            numPages: Math.ceil(result.length / 10)
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

  
  //this function creates the page buttons depending on how many items there are to display
  createPages() {

    //turns the number of pages into a list of buttons
    var store = [];
    for (let i = 1; i <= this.state.numPages; i++) {
      store.push(i);
    }

    //sets the array of page numbers to state and then runs the assign pages function
    this.setState({ pageList: store }, () => {
      this.assignPages();
    });
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

    //sets the current list to display and then runs it back to the first page to display for that list
    this.setState({ 
      picQuotes: storePages 
    }, () => {
        this.handlePageButton(1);
    });
  }


  //filters quotes by page button clicked
  handlePageButton = id => {

    //if the id passed is for the previous or next button, determines which page to go to by
    //looking at the current page
    if (id === "prev" && this.state.currentPage !== 0) {
      id = this.state.currentPage;
    }
    else if (id === "prev" && this.state.currentPage === 0) {
      id = this.state.currentPage + 1;
    } 
    else if (id === "next" && this.state.currentPage !== (this.state.numPages - 1)) {
      id = this.state.currentPage + 2;
    } 
    else if (id === "next" && this.state.currentPage === (this.state.numPages - 1)) {
      id = this.state.currentPage + 1;
    } 

    //sets the current page state to the index of the array matching the page number (ie 0 if first page)
    this.setState({ currentPage: id - 1 });

    var storePage = [];

    //iterates through all quotes to display only with the appropriate page number
    for (let i = 0; i < this.state.picQuotes.length; i++) {

      var element = this.state.picQuotes[i].pageNumber;

      if (element === id) {
        storePage.push(this.state.picQuotes[i]);
      }
    }

    //sets displayed quotes to those of the page - it will be a list of up to 10
    this.setState({ pageQuotes: storePage });
  };


  //gathers the search value from the input box and sets it to the search state
  handleChange = event => {

    event.preventDefault();
    let value = event.target.value;

    //stores the current search value by state
    this.setState({ 
      search: value.toLowerCase(),
      value: event.target.value
     });
  };


  //resets the quotes to list all
  handleResetButton = event => {

    event.preventDefault();

    //sets displayed quotes to all and brings us back to the first page of results
    this.setState({ 
      value: "",
      search: "",
      numPages: Math.ceil(this.state.quotes.length / 10) 
    }, () => {
      this.handleCategoryButton(this.state.category);
    });
  };


  //filters quotes by theme depending on button clicked
  handleCategoryButton = id => {

    var storeCategory = [];

    //iterates through all quotes and stores them in an array if the theme matches the category
    for (let i = 0; i < this.state.quotes.length; i++) {

      var element = this.state.quotes[i].theme;

      if (element === id || id === "all") {
        //if a search is not in place, push all matching themes to display
        if (this.state.search === "") {
          storeCategory.push(this.state.quotes[i]);
        }
        //if a search is in place, only push those matching the search term to display
        else {
          var element2 = this.state.quotes[i].quote.toLowerCase();
          var check = element2.indexOf(this.state.search);
    
          //if the text of the quote is contained in the search, push it to the search array
          if (check >= 0) {
            storeCategory.push(this.state.quotes[i]);
          }
        } 
      }
    }

    //sets displayed quotes to only those with matching theme, resets number of pages, reassigns page numbers
    this.setState({ 
      picQuotes: storeCategory, 
      category: id,
      numPages: Math.ceil(storeCategory.length / 10) 
    }, () => {
      this.createPages();
    });
  };

  //functions runs on the search button to see if any of the quotes in the database
  //contain a word that matches the search result
  handleSearchButton = event => {

    event.preventDefault();
    var storeSearch = [];

    //iterates through all quotes
    for (let i = 0; i < this.state.quotes.length; i++) {

      var element = this.state.quotes[i].quote.toLowerCase();
      var check = element.indexOf(this.state.search);

      //if the text of the quote is contained in the search, push it to the search array
      if (check >= 0) {

        var element2 = this.state.quotes[i].theme;

        //if there is no category chosen, push all matching searches to dispaly
        if (this.state.category === "all") {
          storeSearch.push(this.state.quotes[i]);
        }
        //if there is a current category, only push those that match the category and search
        else if (this.state.category === element2) {
          storeSearch.push(this.state.quotes[i]);
        }
      }
    }

    //pushes the stored search array to the state search results and reassigns page numbers to display
    this.setState({ 
      picQuotes: storeSearch, 
      numPages: Math.ceil(storeSearch.length / 10)
    }, () => {
      this.createPages();
    });
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

    //creates a list of buttons for each page number
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
            <Button type="button" onClick={this.handleResetButton} className="resetButton">Reset</Button>
          </form>

          <p>Which category of quotes would you like to view?</p>
          <Button type="button" onClick={() => this.handleCategoryButton("all")} className="resetButton">All</Button>
          <Button type="button" id="movies" onClick={() => this.handleCategoryButton("movies")} className="categoryButton">Movies</Button>
          <Button type="button" id="games" onClick={() => this.handleCategoryButton("games")} className="categoryButton">Games</Button>


          <Quote>
            {currentQuotes}
          </Quote>

          <Button type="button" onClick={() => this.handlePageButton("prev")} className="pageButton">Prev</Button>
          <div>
            {pages}
          </div>
          <Button type="button" onClick={() => this.handlePageButton("next")} className="pageButton">Next</Button>


        </Col>

      </Grid>
    );
  }
}

export default App;

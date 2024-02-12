import {Switch, Route} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchResults from './components/SearchResults'
import MovieDetails from './components/MovieDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Popular} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/search/:searchInput" component={SearchResults} />
    <Route exact path="/movie/:id" component={MovieDetails} />
  </Switch>
)

export default App

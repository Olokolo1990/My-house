import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import {Image} from "./components/Image/image";
import {Kitchen} from "./Kitchen";
import {Industry} from "./Industry";
import {ShoppingList} from "./ShoppingList";
import {Forecast} from "./Forecast";
import {Add_kitchen} from "./Add_kitchen";
import {Add_industry} from "./Add_industry";
import {Add_ShoppingList} from "./Add_ShoppingList";

const Container = withRouter((props) => {
    return props.location.pathname === '/' ? (
        <div className="main_container">
            <div className="App">
                <Image/>
                <h1>Mój Dom</h1>
            </div>
            <div className="buttons">
                <Link to="/Kitchen" className="btn">Stan Kuchni</Link>
                <Link to="/Industry" className="btn">Stan Przemysłu</Link>
                <Link to="/ShoppingList" className="btn">Lista Zakupów</Link>
                <Link to="/Forecast" className="btn">Pogoda</Link>
            </div>
        </div>
    ) : null;
});

const App = () => {
    return (
        <Router>
            <Container />
            <Switch>
                <Route exact path="/Kitchen"><Kitchen/></Route>
                <Route exact path="/Industry"><Industry/></Route>
                <Route exact path="/ShoppingList"><ShoppingList/></Route>
                <Route exact path="/Forecast"><Forecast/></Route>
                <Route exact path="/Add_kitchen"><Add_kitchen/></Route>
                <Route exact path="/Add_industry"><Add_industry/></Route>
                <Route exact path="/Add_ShoppingList"><Add_ShoppingList/></Route>
            </Switch>
        </Router>);
}

export default App;
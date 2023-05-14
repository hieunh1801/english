import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { Navbar, Alignment, Button } from "@blueprintjs/core";

const Header = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>English App</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp4-minimal" icon="home">
          <Link
            to={"todos"}
            style={{
              textDecoration: "none",
            }}
          >
            Todo
          </Link>
        </Button>

        {/* <Button className="bp4-minimal" icon="document">
          <Link to={"adsf"} style={{ textDecoration: "none" }}>
            Test
          </Link>
        </Button> */}
      </Navbar.Group>
    </Navbar>
  );
};
function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

import Hero from "./sections/hero/Hero";
import Profile from "./sections/profile/Profile";
import Project from "./sections/project/Project";
import Contact from "./sections/contact/Contact";
import "./Home.css";

const Home = ({ introEnd }) => {
 
  return (
    <div className="home">
      <Hero introEnd={introEnd} />
      <Profile />
      <Project />
      <Contact />
    </div>
  );
};

export default Home;
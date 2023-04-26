import { Link } from "react-router-dom";
import logoCode from "/Logo code.png";
import "../css/index.css";
import Notes from "../../public/Notes.png";
import PricingSection from "../components/PricingSection";

//Images
import React from "../../public/React-icon.svg.png";
import MySQL from "../../public/MySQL-logo.png";
import Express from "../../public/Expressjs.png";
import Nodejs from "../../public/Nodejs.png"

const   Index = () => {
  return (
    <>
      <nav>
        <ul className="navIndexContainer">
          <li>
            <img src={logoCode} width="80px" />
          </li>
          <li className="navLinksContainer">
            <Link to="#">About Us</Link>
            <Link to="/auth/signin">Sign In</Link>
            <Link to="/auth/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <header className="sectionIndexContainer">
        <div className="focusIndex">
          <h1>ORDENA TODAS TUS IDEAS EN UN SOLO SITIO</h1>
          <h3>
            Con esta aplicacion de notas lleva tus notas al siguiente nivel!!
          </h3>
          <Link to="/auth/signup">
            <button className="button-41" role="button">
              Comienza Ya
            </button>
          </Link>
        </div>

        <div>
          <img src={Notes} width="450px" />
        </div>
      </header>

      <section>
        <div className="indexSection">
          <h1>ESCOGE TU PLAN</h1>

          <div className="indexPricing">
            <PricingSection
              title="Starter"
              price="29.99"
              description={[
                {
                  one: "lorem ipsum dolor sit amet",
                  two: "lorem ipsum dolor sit amet",
                  three: "lorem ipsum dolor sit amet",
                  four: "lorem ipsum dolor sit amet",
                  five: "lorem ipsum dolor sit amet",
                },
              ]}
            />

            <PricingSection
              title="Pro"
              price="49.99"
              className="mostPopular"
              description={[
                {
                  one: "lorem ipsum dolor sit amet",
                  two: "lorem ipsum dolor sit amet",
                  three: "lorem ipsum dolor sit amet",
                  four: "lorem ipsum dolor sit amet",
                  five: "lorem ipsum dolor sit amet",
                },
              ]}
            >
              <div>Most Popular</div>
            </PricingSection>

            <PricingSection
              title="Enterprice"
              price="99.99"
              description={[
                {
                  one: "lorem ipsum dolor sit amet",
                  two: "lorem ipsum dolor sit amet",
                  three: "lorem ipsum dolor sit amet",
                  four: "lorem ipsum dolor sit amet",
                  five: "lorem ipsum dolor sit amet",
                },
              ]}
            />
          </div>

          <div>
            <h1>TECNOLOGIAS CON LAS QUE FUE REALIZADA ESTA APP WEB</h1>
          </div>

          <div className="technologies">
            <img src={MySQL} width="150px" />
            <img src={Express} width="200px" />
            <img src={React} width="130px" />
            <img src={Nodejs} width="150px"/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;

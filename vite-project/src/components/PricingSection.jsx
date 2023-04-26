import { Link } from "react-router-dom";

const PricingSection = ({ title, description, price, className, children }) => {
  return (
    <>
      <div className={`pricingContent ${className} `}>

        {children}

        <h2 className="pricingTitle">{title}</h2>

        <h1 className="price">
          ${price} <span className="monthly">/Mont</span>
        </h1>

        {description &&
          description.map(({ one, two, three, four, five }, index) => {
            return (
              <ul className="description" key={index}>
                <li>● {one}</li>
                <li>● {two}</li>
                <li>● {three}</li>
                <li>● {four}</li>
                <li>● {five}</li>
              </ul>
            );
          })}

        <Link to='/auth/signin' className="buttonGetStarted">Get Started</Link>
      </div>
    </>
  );
};

export default PricingSection;

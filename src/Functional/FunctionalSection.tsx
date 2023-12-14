import { Link } from "react-router-dom";
import { ActiveComponent } from "../types";
import { ReactNode } from "react";

export const FunctionalSection = ({
  children,
  determineActiveComponent,
  activeComponent,
  favoritedDogsCount,
  unfavoritedDogsCount,
}: {
  children: ReactNode;
  determineActiveComponent: (component: ActiveComponent) => void;
  activeComponent: ActiveComponent;
  favoritedDogsCount: number;
  unfavoritedDogsCount: number;
}) => {
  const generateClassName = (
    activeComponent: ActiveComponent,
    currentComponent: ActiveComponent
  ) => {
    return activeComponent === currentComponent ? "active" : "";
  };

  const favoritedClassName = generateClassName(activeComponent, "favorited");
  const unfavoritedClassName = generateClassName(
    activeComponent,
    "unfavorited"
  );
  const createDogFormClassName = generateClassName(
    activeComponent,
    "create-dog-form"
  );

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${favoritedClassName}`}
            onClick={() => determineActiveComponent("favorited")}
          >
            favorited ( {favoritedDogsCount} )
          </div>
          <div
            className={`selector ${unfavoritedClassName}`}
            onClick={() => determineActiveComponent("unfavorited")}
          >
            unfavorited ( {unfavoritedDogsCount} )
          </div>
          <div
            className={`selector ${createDogFormClassName}`}
            onClick={() => determineActiveComponent("create-dog-form")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>;
    </section>
  );
};

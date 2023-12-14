import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveComponent } from "../types";

type ClassSectionProps = {
  children: ReactNode;
  determineActiveComponent: (component: ActiveComponent) => void;
  activeComponent: ActiveComponent;
  favoritedDogsCount: number;
  unfavoritedDogsCount: number;
};

export class ClassSection extends Component<ClassSectionProps> {
  generateClassName = (
    activeComponent: ActiveComponent,
    currentComponent: ActiveComponent
  ) => {
    return activeComponent === currentComponent ? "active" : "";
  };

  render() {
    const favoritedClassName = this.generateClassName(
      this.props.activeComponent,
      "favorited"
    );
    const unfavoritedClassName = this.generateClassName(
      this.props.activeComponent,
      "unfavorited"
    );
    const createDogFormClassName = this.generateClassName(
      this.props.activeComponent,
      "create-dog-form"
    );
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={`selector ${favoritedClassName}`}
              onClick={() => {
                this.props.determineActiveComponent("favorited");
              }}
            >
              favorited ( {this.props.favoritedDogsCount} )
            </div>
            <div
              className={`selector ${unfavoritedClassName}`}
              onClick={() => {
                this.props.determineActiveComponent("unfavorited");
              }}
            >
              unfavorited ( {this.props.unfavoritedDogsCount} )
            </div>
            <div
              className={`selector ${createDogFormClassName}`}
              onClick={() => {
                this.props.determineActiveComponent("create-dog-form");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>;
      </section>
    );
  }
}

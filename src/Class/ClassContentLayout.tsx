import { Component, ReactNode } from "react";

type ClassContentProps = {
  children: ReactNode;
};

export class ClassContentLayout extends Component<ClassContentProps> {
  render() {
    return <div className="content-container">{this.props.children}</div>;
  }
}

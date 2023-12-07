import { ReactNode } from "react";

export const FunctionalContentLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="content-container">{children}</div>;
};

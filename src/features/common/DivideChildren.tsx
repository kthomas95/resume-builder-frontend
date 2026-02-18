import { Children, FC, PropsWithChildren, ReactNode } from "react";
import { intersperse } from "./interperse";

export interface DivideProps extends PropsWithChildren {
    divider: ReactNode;
}

export const DivideChildren: FC<DivideProps> = ({ children, divider }) =>
    intersperse(Children.toArray(children), divider);

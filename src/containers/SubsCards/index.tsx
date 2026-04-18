import { FC } from "react";
import { useCards } from "./hooks/useCards";
import { CardView } from "./components/CardView";

export const Card: FC = () => {
    let { data = [], isLoading, isError } = useCards();
    
    return (
        <div className="container">
            <CardView data={data} isLoading={isLoading} isError={isError} />
        </div>
    )
};
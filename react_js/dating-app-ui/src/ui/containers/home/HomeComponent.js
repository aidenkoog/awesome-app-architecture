import { BottomButtons } from "../../components/home/buttons/BottomButtons"
import PeopleCards from "../../components/home/card/PeopleCards"
import Header from "../../components/home/header/Header"

export const HomeComponent = () => {
    return (
        <div>
            <Header />
            <PeopleCards />
            <BottomButtons />
        </div>
    )
}
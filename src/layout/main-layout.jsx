const { Footer } = require("@/components/footer/footer")
const { Header } = require("@/components/header/header")

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />

        </>
    )
}
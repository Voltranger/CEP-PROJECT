import { GiAtom } from 'react-icons/gi'


const Header = () => {
    return ( 
    <>
    <header className="g-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-h p-4">
        <div className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
            
            <h1 className="text-3xl font-bold  text-white">
            SciPlay Labs
            </h1>

            <GiAtom className="text-white w-8 h-8 animate-spin" />

        </div>

    </header>
    </> 
    );
}

export default Header;
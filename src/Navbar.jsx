import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
    <nav className="bg-[#f2f2f2] text-[#00008B] border-b-[1px] border-b-[#d2d2d2] flex justify-between items-center gap-8 py-3 px-6 font-bold text-[22px]">
            <Link to="/" className="text-[2rem]">Início</Link>
            <ul className="m-0 p-0 list-none flex gap-4 items-center">
                <li>
                    <Link to="/info" className="text-[24px] flex no-underline h-full text-inherit items-center p-1 hover:bg-[#d2d2d2]">Como se previnir?</Link>
                </li>
                <li>
                    <Link to="/empresas" className="text-[24px] flex no-underline h-full text-inherit items-center p-1 hover:bg-[#d2d2d2]">Empresas mais Usadas</Link>
                </li>
                <li className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="rounded-md bg-[#0b3d91] px-4 py-1 text-white font-semibold text-[24px] hover:bg-[#0e56bd] transition-colors flex items-center cursor-pointer border-none">
                        Cadastros <span className="text-[14px] ml-1">▼</span>
                    </button>
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-[#d2d2d2] rounded-md shadow-lg min-w-[200px] z-10">
                            <Link to="/register" className="block px-4 py-2 text-[20px] text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => setIsOpen(false)}>
                                Cadastrar Golpe
                            </Link>
                            <Link to="/rempresas" className="block px-4 py-2 text-[20px] text-[#00008B] no-underline hover:bg-[#d2d2d2]" onClick={() => setIsOpen(false)}>
                                Login Empresa
                            </Link>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
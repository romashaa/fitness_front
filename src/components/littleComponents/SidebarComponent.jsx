import React from 'react';
import {Link} from "react-router-dom";
import '../FitnessApp.css'

const SidebarComponent = ({active, setActive}) => {
    return (
        <div className={active ? 'menu active' : 'menu'} onClick={()=>setActive(false)}>
            <div className="menu_content" onClick={(e)=>e.stopPropagation()}>
                <ul className="menu_ul">
                    <li>
                        <Link className='menu_li' to="/myProfile/masha">Мій профіль</Link>
                    </li>
                    <li>
                       <Link className='menu_li' to="/ration">Раціон</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarComponent;
import React, {Component} from 'react';
import {Link} from "react-router-dom";

const FooterComponent=()=>{
    return (
            <div>
                <footer className="bg-dark text-center text-white fixed-bottom">
                    {/*// <!-- Grid container -->*/}
                    {/*/!*<!-- Copyright -->*!/*/}
                    <div className='text-center p-3 bg-dark' >
                        &copy; {new Date().getFullYear()} Copyright:{' '}
                        <a className='text-white' >
                            Love Quran by Eka Sinta Aprilia
                        </a>
                    </div>
                    {/*// <!-- Copyright -->*/}
                </footer>
            </div>
        );
}
export default FooterComponent;

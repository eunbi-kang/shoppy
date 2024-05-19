import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs'
// import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const getIsLoggedIn = () => Boolean(localStorage.getItem('isLoggedIn')) || false;

export default function Navbar() {
    const {user, isLoading, login, logout } = useAuthContext();
    console.log(user);
    return (
        <>
        {/* {user &&  */}
            <header className='flex justify-between border-b border-gray-300 p-2'>
                <Link to='/' className='flex items-center text-4xl text-brand'>
                    <FiShoppingBag />
                    <h1>HaPpyShoPpY</h1>
                </Link>
                <nav className='flex items-center gap-4 font-semibold'>
                    <Link to='/products'>Products</Link>
                    {isLoading && (<ClipLoader color="#F96162" />)}
                    {user && (<Link to='/carts'>Carts</Link>)}
                    {user && user.isAdmin && (
                        <Link to='/products/new' className='text-2xl'>
                            <BsFillPencilFill />
                        </Link>
                    )}
                    {user && <User user={user} />}
                    {/* {(() => {
                        if (isLoading) {
                            return (
                                <ClipLoader color="#36d7b7" />
                            )
                        } else {
                            return (
                                user 
                                ? <Button text={'Logout'} onClick={logout}>Logout</Button >
                                : <Button text={'Login'} onClick={login}>Login</Button >
                            )
                        }
                    }
                    )} */}
                    {user 
                        ? <Button text={'Logout'} onClick={logout}>Logout</Button >
                        : <Button text={'Login'} onClick={login}>Login</Button >
                    }
                    {/* {!user && <Button text={'Login'} onClick={login}>Login</Button >}
                    {user && <Button text={'Logout'} onClick={logout}>Logout</Button >} */}
                </nav>
            </header>
        {/* } */}
        </>
    );
}


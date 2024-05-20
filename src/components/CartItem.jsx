import React from 'react';
import { RiDeleteBin6Fill} from 'react-icons/ri';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';

export default function CartItem({ product,
    product: { id, image, title, option, quantity, price },
    uid, }) {
    const handleMinus = () => {
        if (quantity < 2) return;
        addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
    }
    const handlePlus = () => addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
    const handleDelete = () => removeFromCart(uid, id);

    return (
        <li>
            <img src={image} alt={title} />

            <div>
                <p>{title}</p>
                <p>{option}</p>
                <div>
                    <AiOutlineMinusSquare onClick={handleMinus} />
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare onClick={handlePlus} />
                    <RiDeleteBin6Fill onClick={handleDelete} />
                </div>
            </div>
        </li>
    )
}
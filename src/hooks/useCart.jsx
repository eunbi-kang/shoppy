import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
    const {uid} = useAuthContext(); // 현재 사용자의 uid를 받아옴
    const queryClient = useQueryClient();
    const cartQuery = useQuery({
        queryKey:['carts', uid || ''], // carts중 에서도 사용자 별로 uid가 캐싱되도록 queryKey 구성
        queryFn: () => getCart(uid),
        enabled: !!uid
    });

    const addOrUpdateItem = useMutation({
        mutationFn: (product) => addOrUpdateToCart(uid, product),
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        }
})


//     const addOrUpdateItem = useMutation(
//         (product) => addOrUpdateToCart(uid, product),
//         {
//             onSuccess: () => {
//                 queryClient.invalidateQueries(['carts', uid]);
//             },
//         }
//     );

    const removeItem = useMutation({
        mutationFn: (id) => removeFromCart(uid, id), 
        onSuccess : () => {
            queryClient.invalidateQueries(['carts', uid])
        }
    })

    // const removeItem = useMutation((id) => removeFromCart(uid, id), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['carts', uid]);
    //     }
    // });


    return {cartQuery, addOrUpdateItem, removeItem};
}


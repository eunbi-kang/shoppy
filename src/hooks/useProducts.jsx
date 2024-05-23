/* Products를 Read / Update 하는 기능을 해당 파일에서 구현 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts} from "../api/firebase";

export default function useProducts() {
    const queryClient = useQueryClient();
    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60,
    });

    
    const addProduct = useMutation({
        mutationFn: ({product, url}) => addNewProduct(product,url),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: 'products'});
        }
})

    return { productsQuery, addProduct };
}
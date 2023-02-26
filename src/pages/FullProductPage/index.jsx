import React from 'react';
import {getProductByIDAxios} from "../../Axios";
import {useNavigate, useParams} from "react-router-dom";
import Card from "../../components/Card";
import {useSelector} from "react-redux";


const FullProductPage = () => {
    const params = useParams();
    const [product, setProduct] = React.useState({});
    const card = useSelector(state => state.card.products);
    const navigate = useNavigate();

    React.useEffect(()=>{
        getProductByIDAxios(params.id).then(res=>{
            if(res === 'error'){
                navigate('/error')
            }else{
                const product = card.find(item => item.id === res.id)
                if(product) setProduct(product); else setProduct(res)
            }
        })
    }, [])

    React.useEffect(()=>{
        const product = card.find(item => item.id === Number(params.id))
        if(product) setProduct(product);
    }, [card])

    return (
        <div>
            {
                (product) ? <Card key={product.id} {...product} fullProduct={true}/> : <h1>Загрузка...</h1>
            }
        </div>
    );
};

export default FullProductPage;
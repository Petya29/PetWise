import React from 'react';
import ProductItem from './ProductItem';

export default function ProductsList(props) {
    return (
        <div className="products-list">
            {(props.products).map((product) => (
                <ProductItem product={product} modalId={props.modalId} key={product.id} />
            ))}
        </div>
    )
}

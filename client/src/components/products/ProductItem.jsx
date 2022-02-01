import React from 'react';
import AppModal from '../UI/AppModal/AppModal';
import PurchaseProduct from './PurchaseProduct';

export default function ProductItem(props) {
    return (
        <div className="product-item">
            <div className="card">
                <div className="card-image">
                    <img src={props.product.image ? props.product.image : 'https://www.usnews.com/dims4/USNEWS/9b62b7c/2147483647/crop/2000x1313%2B0%2B4/resize/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fa9%2Fe8%2F046d240745f590f48c4d6067a9f5%2F200923-stock.jpg'} alt="product" />
                    <span className="card-title product-title">{props.product.name}</span>
                </div>
                <div className="card-content">
                    <p>{props.product.description}</p>
                </div>
                <div className="card-action product-footer">
                    <span className="product-cost">
                        Price: {props.product.cost}
                    </span>
                    <a className="waves-effect waves-light btn modal-trigger" href={"#productModal" + props.product.id}>
                        <i className="material-icons right">attach_money</i>
                        Buy
                    </a>
                </div>
            </div>
            <AppModal modalId={"productModal" + props.product.id}>
                <PurchaseProduct product={props.product} />
            </AppModal>
        </div>
    )
}

import React, { Fragment, useState } from 'react';
import OrderService from '../../services/OrderService';
import AppLoader from '../UI/AppLoader/AppLoader';

export default function PurchaseProduct(props) {

    const [loading, setLoading] = useState(false);
    const [successPurchasing, setSuccessPurchasing] = useState(false);
    const [purchasingError, setPurchasingError] = useState('');

    const purchasing = async () => {
        try {
            setLoading(true);
            setPurchasingError('');

            await OrderService.addOrder(props.product.id);

            setTimeout(() => {
                setSuccessPurchasing(true);
                setLoading(false);
            }, 500)
        } catch (e) {
            console.log(e);
            setLoading(false);
            setSuccessPurchasing(false);
            setPurchasingError(e?.response.data.errors[0].msg);
        }
    }

    const back = () => {
        setLoading(false);
        setSuccessPurchasing(false);
        setPurchasingError('');
    }

    return (
        <div className="purchase-product">
            {!loading && !purchasingError && !successPurchasing
                ?
                <Fragment>
                    <div className="modal-content">
                        <h4>Do you want to buy a product "{props.product.name}" ?</h4>
                        <p>If you buy this product, your account will be charged {props.product.cost}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-red btn-flat">Disagree</a>
                        <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => purchasing()}>Agree</a>
                    </div>
                </Fragment>
                :
                loading
                    ?
                    <div className="modal-loader-wrap">
                        <AppLoader style={{ width: "50px", height: "50px" }} color="#000000" />
                    </div>
                    :
                    successPurchasing
                        ?
                        <Fragment>
                            <div className="modal-content">
                                <div className="purchasing-thx">
                                    <span>Purchased successfully</span>
                                    <i className="material-icons right">assignment_turned_in</i>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                                <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => { back() }}>Back</a>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="modal-content">
                                <div className="purchasing-error">
                                    <span>Error</span>
                                    <i className="material-icons">error_outline</i>
                                    <div className="center-align">{purchasingError}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                                <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => { back() }}>Back</a>
                            </div>
                        </Fragment>
            }
        </div>
    )
}

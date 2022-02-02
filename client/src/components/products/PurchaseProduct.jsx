import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderService from '../../services/OrderService';
import AppLoader from '../UI/AppLoader/AppLoader';

export default function PurchaseProduct(props) {

    const { t } = useTranslation();

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
                        <h4>{t('doYouWantPurchase')} "{props.product.name}" ?</h4>
                        <p>{t('accountWillBeCharged')} {props.product.cost}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-red btn-flat">{t('Disagree')}</a>
                        <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => purchasing()}>{t('Agree')}</a>
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
                                    <span>{t('purchasedSuccessfully')}</span>
                                    <i className="material-icons right">assignment_turned_in</i>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-red btn-flat">{t('Cancel')}</a>
                                <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => { back() }}>{t('Back')}</a>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div className="modal-content">
                                <div className="purchasing-error">
                                    <span>{t('Error')}</span>
                                    <i className="material-icons">error_outline</i>
                                    <div className="center-align">{purchasingError}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-close waves-effect waves-red btn-flat">{t('Cancel')}</a>
                                <a href="#!" className="waves-effect waves-green btn-flat" onClick={() => { back() }}>{t('Back')}</a>
                            </div>
                        </Fragment>
            }
        </div>
    )
}

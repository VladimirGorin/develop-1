import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, agreement }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay-terms" onClick={onClose}></div>
            <div className="modalTerms">
                <div className="agreement">
                    <div className="title-terms">
                        <h3>БЕЗОПАСНОСТЬ ПЛАТЕЖЕЙ</h3>
                    </div>
                    <div className="agreement-table">
                        <div className="title--agreement">
                            <div className="desc--agreement">
                                <h2>
                                    ОПЛАТИТЬ ЗАКАЗ МОЖНО БАНКОВСКИМИ КАРТАМИ VISA, MASTER CARD, «МИР» ИЛИ ЧЕРЕЗ ПЛАТЕЖНЫЕ СИСТЕМЫ APPLE PAY, ЯНДЕКС.ДЕНЬГИ, QIWI ИЛИ PAYPAL (ПОСЛЕДНЯЯ — ТОЛЬКО ДЛЯ ПОКУПАТЕЛЕЙ ИЗ-ЗА ПРЕДЕЛОВ РОССИЙСКОЙ ФЕДЕРАЦИИ).
                                    ЧТОБЫ ОПЛАТИТЬ ПОКУПКУ, ВЫ БУДЕТЕ ПЕРЕНАПРАВЛЕНЫ НА СЕРВЕР ПЛАТЕЖНОЙ СИСТЕМЫ UNITPAY, НА КОТОРОМ НУЖНО ВВЕСТИ НЕОБХОДИМЫЕ ДАННЫЕ.
                                    ПРИ ОПЛАТЕ БАНКОВСКОЙ КАРТОЙ БЕЗОПАСНОСТЬ ПЛАТЕЖЕЙ ГАРАНТИРУЕТ ПРОЦЕССИНГОВЫЙ ЦЕНТР UNITPAY.
                                </h2>
                                <h2>
                                    ПЛАТЕЖНАЯ СИСТЕМА UNITPAY ОБЛАДАЕТ ПОДТВЕРЖДЕННЫМ СЕРТИФИКАТОМ СООТВЕТСТВИЯ ТРЕБОВАНИЯМ СТАНДАРТА PCI DSS В ЧАСТИ ХРАНЕНИЯ, ОБРАБОТКИ И ПЕРЕДАЧИ ДАННЫХ ДЕРЖАТЕЛЕЙ КАРТ.
                                    СТАНДАРТ БЕЗОПАСНОСТИ БАНКОВСКИХ КАРТ PCI DSS ПОДДЕРЖИВАЕТСЯ МЕЖДУНАРОДНЫМИ ПЛАТЕЖНЫМИ СИСТЕМАМИ, ВКЛЮЧАЯ MASTERCARD И VISA, INC.
                                    СИСТЕМА UNITPAY ТАКЖЕ ЯВЛЯЕТСЯ УЧАСТНИКОМ ПРОГРАММЫ НЕПРЕРЫВНОГО СООТВЕТСТВИЯ COMPLIANCE CONTROL PCI DSS COMPLIANCE PROCESS (P.D.C.P.).
                                    ВАШИ КОНФИДЕНЦИАЛЬНЫЕ ДАННЫЕ, НЕОБХОДИМЫЕ ДЛЯ ОПЛАТЫ (РЕКВИЗИТЫ КАРТЫ, РЕГИСТРАЦИОННЫЕ ДАННЫЕ И ДР.), НЕ ПОСТУПАЮТ В ИНТЕРНЕТ-МАГАЗИН — ИХ ОБРАБОТКА ПРОИЗВОДИТСЯ НА СТОРОНЕ ПРОЦЕССИНГОВОГО ЦЕНТРА UNITPAY И ПОЛНОСТЬЮ ЗАЩИЩЕНА.
                                </h2>
                                <h2>
                                    НИКТО, В ТОМ ЧИСЛЕ НАШ ИНТЕРНЕТ-МАГАЗИН «WORLDAION.COM», НЕ МОЖЕТ ПОЛУЧИТЬ ДАННЫЕ ВАШЕЙ БАНКОВСКОЙ КАРТЫ ИЛИ ИНЫЕ ДАННЫЕ, НЕОБХОДИМЫЕ ДЛЯ ОСУЩЕСТВЛЕНИЯ ПЛАТЕЖА.
                                </h2>
                            </div>
                        </div>

                    </div>
                    <div className="btn--agreement blinkLight">
                        <button onClick={agreement}>
                            <h2>ПРИНЯТЬ</h2>
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;

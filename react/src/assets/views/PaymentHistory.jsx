import { useStateContext } from "../../contexts/ContextProvider";

const PaymentHistory = () => {
    const { payLog } = useStateContext();
    return (
        <div className="container container-payment">
            <div className="payment-history animated fadeInDown">
                <div className="payment-header">
                    <div className="payment-title">
                        <p>ИСТОРИЯ ПОПОЛНЕНИЙ</p>
                    </div>
                </div>
                <div className="payment--information">
                    <table className="payment-table">
                        <thead>
                            {Object.values(payLog).map((logItem) => (
                                <tr key={logItem.id}>
                                    <td>{logItem.id}</td>
                                    <td>{logItem.title}</td>
                                    <td>{logItem.personName}</td>
                                    <td>{logItem.price}</td>
                                    <td>{logItem.lot}</td>
                                    <td>{logItem.created_at}</td>
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            <tr>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;

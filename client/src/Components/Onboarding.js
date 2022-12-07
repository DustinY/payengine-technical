import React, {useState} from "react";
import axios from "axios";

function Onboarding(){
    const [merchantId, setMerchantId] = useState('');

    const config = {
        method: 'get',
        url: '/merchant-id',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    axios(config)
        .then((res) => {
            const merchant_id = res.data.merchant_id
            console.log(merchant_id)
            setMerchantId(merchant_id)
        })
        .catch((err) => {
            console.log(err)
        });

    return (<div>
        <pay-engine
            id="pf-onboarding"
            type="boarding"
            merchant-id={merchantId}
            css="#onboarding-styles"
        ></pay-engine>
    </div>)
}

// class Onboarding extends React.Component {
//     constructor(props) {
//       super(props);
//       this.props = props;
//       this.state = { merchantId: undefined }
//     //   axios
//       this.loadMerchantId()
//     }

//     loadMerchantId() {
//         const config = {
//             method: 'get',
//             url: '/merchant-id',
//             headers: {
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         }
//         axios(config)
//             .then((res) => {
//                 const merchantId = res.data.merchant_id
//                 console.log(merchantId)
//                 this.setState({merchantId: merchantId}, () => {
//                     console.log(this.state)
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             });

//     }

//     render() {
//         return (
//             <div>
//                 <pay-engine
//                     id="pf-onboarding"
//                     type="boarding"
//                     merchant-id={this.state.merchantId}
//                     css="#onboarding-styles"
//                 ></pay-engine>
//             </div>
//         ) ? !!this.state.merchantId : (<div><p>This has not loaded</p></div>)
        
//     }
// }

export default Onboarding
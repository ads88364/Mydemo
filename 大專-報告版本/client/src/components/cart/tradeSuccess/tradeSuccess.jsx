import React, { Component } from 'react';
class TradeSuccess extends Component {
    render() { 
        let text = ""
        this.props.data.state.tradeId&&this.props.data.state.tradeId.map(item=>{
            item=item.toString()
            item=item.padStart(6,"0")
            console.log(item)
            text+=item+"、"
            return  1
        })
        return (
            <React.Fragment>
                <div className='m-5'>訂單{text.slice(0,-1)}已建立成功，等待租借者回應。</div>
            </React.Fragment>
        );
    }
}
 
export default TradeSuccess;
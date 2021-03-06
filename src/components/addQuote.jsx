'use strict';

import React from 'react';
import status from '../constants/status';
import _ from 'lodash';

class AddQuote extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        
        this.state = {
            quoteName: this.getQuoteName(),
            quotePrice: this.getQuotePrice()
        };
        
        this.quoteNameChange = this.quoteNameChange.bind(this);
        this.quotePriceChange = this.quotePriceChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {        
        if (!_.isEqual(nextProps.editItem, this.props.editItem)) {
            this.setState({
                quoteName: nextProps.editItem.name,
                quotePrice: nextProps.editItem.price
            });
        };
    }

    show() {
        jQuery('#myModal').modal('show');
    }

    hide() {
        jQuery('#myModal').modal('hide');
    }

    getQuotePrice() {
        return this.isEditing() ? this.props.editItem.price : 0;
    }

    getQuoteName() {
        return this.isEditing() ? this.props.editItem.name : this.props.items[0];
    }

    quoteNameChange(e) {
        this.setState({quoteName: e.target.value});
    }

    quotePriceChange(e) {
        this.setState({quotePrice: e.target.value});
    }

    add() {
        this.props.callback(Object.assign({}, this.state, {id: this.isEditing() ? this.props.editItem.id : _.uniqueId('quote')}));
        //clean the state
        this.setState({
            quoteName: this.props.items[0],
            quotePrice: 0
        });
    }

    isEditing() {
        return this.props.editItem !== null && this.props.statu === status.EDIT;
    }

    render() {
        const quotes = this.props.items.map((v, i) => {            
            return <option value={v} key={i}>{v}</option>;
        });

        return (
            <div id="myModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={e => {e.preventDefault(); this.add();}}>
                            <div className='form-group'>
                                <label>Name</label>
                                
                                <select name='quoteName' onChange={(e) => {this.quoteNameChange(e);}} value={this.state.quoteName}>
                                    {quotes}
                                </select>
                            </div>
                            <div>
                                <label>Price</label>
                                <input type='number' className='form-control' placeholder='quote price' onChange={(e)=> {this.quotePriceChange(e);}} value={this.state.quotePrice}/>
                            </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type='button' className='btn btn-primary' onClick={this.add}>{this.isEditing() ? 'Update' : 'Add'}</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
}

AddQuote.propTypes = {
    callback: React.PropTypes.func,
    items: React.PropTypes.array
};

AddQuote.defaultProps = {
    callback: function() {},
    items: []
};

export default AddQuote;


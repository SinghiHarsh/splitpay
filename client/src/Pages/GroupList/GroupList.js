import React, { Component } from 'react'
import './card.css'

export default class GroupList extends Component {
  handleClick = (e) => {
      console.log(e);
  }  
  render() {
    if(this.props.groupList && this.props.groupList.length !== 0){
        return(
            <div className="list">
            {
                this.props.groupList.map((item,index)=>{
                    return(
                        <div className="card__item" key={index} onClick={this.handleClick}> 
                            <span className="font-group">{item.groupName ? item.groupName : null}</span>
                        </div>
                    )
                })
            }
            </div>
        )
    }
    else {
        return (
            <div className="list disp">
                <span className="no-group">No new groups</span>  
            </div>
          )
    }
  }
}

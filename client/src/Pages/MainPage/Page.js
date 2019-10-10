import React from 'react'
import './style.css'
import group from '../../images/group.svg'
import addFriend from '../../images/add-contact.svg'
import profit from '../../images/profit.svg'
import loss from '../../images/loss.svg'
import { Redirect ,withRouter } from 'react-router-dom'
import axios from 'axios'
import GroupList from '../GroupList/GroupList';
import Select from '../Select/Select';
import downArrow from '../../images/down-chevron.svg'
import multiply from '../../images/multiply.svg'

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        } 
        this.state = {
            loggedIn,
            isShowing: false,
            isOpen: false,
            selectedFriends:[],
            friends:[],
            groupName:""
        }
    }
    makeApiCall = (token)=> {
        const body = {
            token
        }
        axios.post("/user", body)
        .then(res=>{
            console.log("check res",res)
            let data = res.data
            this.setState({
                email: data.email_id,
                friends:data.friends,
                name: data.name,
                groups: data.groups.reverse()
            })
        })
        .catch(err=>{
            console.log(err)
        })  
    }
    submitGroupForm=()=>{
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        var finalArray= []
        this.state.selectedFriends.forEach((element,index)=>{
            this.state.friends.forEach((element1,index1)=>{
                if(element === element1.name){
                    finalArray.push(element1._id)
                }
            })
        })
        const body1 =  {
            groupName: this.state.groupName,
            groupMembers: finalArray
        }
        axios.post("/create-group",body1, axiosConfig)
        .then(res=>{
            this.closeModal();
            this.makeApiCall(localStorage.getItem("token"));
            console.log(res);
            this.setState({
                groupName: "",
                selectedFriends:[],
            })
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    changeData = (e) => {
        console.log(e)
    }
    openModal = (e)=> {
        this.setState({
            isShowing:true
        })
    }
    showDropDown = (e)=>{
        if(this.state.isOpen){
            this.setState({
                isOpen: false
            })
        }
        else {
            this.setState({
                isOpen: true
            })
        }
    }
    closeModal = (e)=> {
        this.setState({
            isShowing:false
        })
    }
    getUserId = (e) => {
        this.state.friends.map((element,index)=>{
            if(e.target.id == element._id){
                if(!this.state.selectedFriends.includes(element.name)){
                    this.setState({
                        selectedFriends: [...this.state.selectedFriends, element.name]
                    })
                }
            } 
        })
    }
    removeUser = (name) => {
        console.log("correct name",name)
        this.setState({
            selectedFriends: this.state.selectedFriends.filter((i,index)=>{
                return i !== name;
            })
        })
    }
    componentDidMount(){
        this.makeApiCall(localStorage.getItem("token"));
    }
    render(){
        console.log("check state", this.state)
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
        }
        return(
            <div className="main-page">
                <div className="div-1">
                    <div className="logo">
                        <span className="logo-font">Splito</span>
                    </div>
                    <div className="activity">
                        <div className="menu">
                            <span className="menu-font">MENU</span>
                            <div className="field">
                                <div className="icon-1">
                                    <img className="svg-icon" src={group} alt="loading" />
                                    <span className="field-1">Groups</span>
                                </div>
                                <div className="icon-1">
                                    <img className="svg-icon" src={addFriend} alt="Loading" />
                                    <span className="field-1">Add Friend</span>
                                </div>
                            </div>
                        </div>
                        <div className="recent-activity">
                            <span className="recent-font">FRIENDS</span>
                            {
                                this.state.friends ? this.state.friends.map((element,index)=>{
                                    return(
                                        <div>
                                            <span>{element.name}</span>
                                        </div>
                                    )
                                })
                                : (
                                    <div>
                                        No Friends
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="profile">
                        <div className="details">
                            <span className="font-1">{this.state.name ? this.state.name : null}</span>
                            <span className="font-2">{this.state.email ? this.state.email : null}</span>
                        <div className="profit-loss">
                            <span><img className="svg-icon-profit" src={profit} alt="loading" /><strong className="text-1"
                            >$170.50</strong></span> 
                            <span><img className="svg-icon-loss" src={loss} alt="loading" />
                            <strong className="text-1">$23.40</strong></span> 
                        </div>
                            <div className="btn-e">
                                <span className="size-btn">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-2">
                    <div className="search">
                        <input className="search-field" type="text" placeholder="Enter for search..." />
                    </div>
                    <div className="add-group">        
                        <a href="#" className="btn-add-group" onClick={this.openModal}>Add new group</a>
                        <div className="popup"
                            style={{
                                display: this.state.isShowing ? 'flex': 'none'
                            }}
                        >
                            <div className="popup-content"
                                style={{
                                    display: this.state.isShowing ? 'flex': 'none'
                                }}
                            >
                                <form className="create-group-data">
                                    <div className="form-group-1">
                                        <span className="font-group-1">Create group</span>
                                        <span className="font-group-2">Split money equally between your friends</span>
                                    </div>
                                    <div className="form-group-2">
                                        <input type="text" placeholder="Group Name" name="groupName" onChange={this.handleChange} className="group-name"/>
                                    </div>
                                    <div className="form-group-3">
                                        <div className="label-container">
                                            <div className="align-label">
                                                {
                                                    this.state.selectedFriends && this.state.selectedFriends.length > 0 ?
                                                    this.state.selectedFriends.map((element,index)=>{
                                                        return(
                                                                <div className="label-wrapper">
                                                                    <span className="inv-label">{element}</span>
                                                                    <svg className="cross-icon" onClick={()=>{this.removeUser(element)}}>
                                                                        <path className="color" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                                                    </svg>
                                                                </div>
                                                        )
                                                    })
                                                    :(
                                                        <div className="not-selected">No Friends selected</div>
                                                    )
                                                }
                                            </div>
                                            <img className="dropdown-icon" onClick={this.showDropDown} src={downArrow} />    
                                        </div>
                                        <Select
                                            options={this.state.friends}
                                            open={this.state.isOpen}
                                            getUserId={this.getUserId}
                                        />
                                    </div>
                                    <div className="form-group-4">
                                        <div className="close-btn">
                                            <a onClick={this.closeModal} href="#" className="close-btn-disp">Close</a>
                                        </div>
                                        <div className="submit-btn">
                                            <a href="#" className="submit-btn-disp" onClick={this.submitGroupForm}>Submit</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                        <GroupList 
                            groupList = {this.state.groups}
                        />
                </div>
                <div className="div-3">
                    <div className="top-buttons">
                        <div className="add-expense">
                            <a href="#" className="add-exp" >Add Expense</a>
                        </div>
                        <div className="add-payment">
                            <a href="#" className="add-pay">Add payment</a>
                        </div>
                    </div>
                    <div className="balances">
                        <span className="no-group">No balances</span>
                    </div>
                    <div className="transactions">
                        <span className="no-group">No transaction history</span>                         
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(MainPage)



                                
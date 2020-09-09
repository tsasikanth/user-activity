import React,{Component}from 'react';
import './App.css';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import axios from 'axios';
Modal.setAppElement("#root");
class App extends Component {
  state={
        open: false,
        ok: true,
        userActivity:[],
        userName:null,
        date: new Date(),
        members: [
                  {
                  id: "W012A3CDE",
                  real_name: "Egon Spengler",
                  tz: "America/Los_Angeles",
                  activity_periods: [
                            {
                            start_time: "Feb 01 2020  1:33PM",
                            end_time: "Feb 1 2020 1:54PM"
                            },
                            {
                            start_time: "Mar 01 2020  11:11AM",
                            end_time: "Mar 1 2020 2:00PM"
                            },
                            {
                            start_time: "Mar 16 2020  5:33PM",
                            end_time: "Mar 16 2020 8:02PM"
                            }
                  ]
                  },
                  {
                  id: "W07QCRPA4",
                  real_name: "Glinda Southgood",
                  tz: "Asia/Kolkata",
                  activity_periods: [
                                          {
                                              start_time: "Feb 01 2020  1:33PM",
                                              end_time: "Feb 1 2020 1:54PM"
                                          },
                                          {
                                              start_time: "Mar 01 2020  11:11AM",
                                              end_time: "Mar 1 2020 2:00PM"
                                          },
                                          {
                                              start_time: "Mar 16 2020  5:33PM",
                                              end_time: "Mar 16 2020 8:02PM"
                                          }
                                    ]
                  }
              ]
     }
  onOpenModal = (userId,name) => {
        let userObj = this.state.members.filter(user=>{
              return user.id===userId
        })
        //console.log(userObj)
        let activityObj = userObj[0];
        //console.log(activityObj)
        //console.log(userObj)
        let activityPeriods = activityObj.activity_periods
        this.setState({ 
          open: true,
          userActivity:activityPeriods,
          userName:name,
          usrId:userId
        });
  };
 
  onCloseModal = () => {
        this.setState({ 
              open: false,
              userActivity:[],
              userName:null
        });
  };
  onChange = (date) => {
        console.log(date);
        let dateString = date.toString();
        console.log(dateString);
        let userObj = this.state.members.filter(user=>{
              return user.id===this.state.usrId
          })
        console.log(userObj)
        let activityObj = userObj[0];
        console.log(activityObj)
        console.log(userObj)
        let activityPeriods = activityObj.activity_periods
        let activeList = activityPeriods.filter((obj)=>{
          console.log(obj.start_time.slice(0,11))
          console.log(dateString.includes(obj.start_time.slice(0,11)))
              return dateString.includes(obj.start_time.slice(0,11))
        })
        console.log(activeList)
        this.setState({ 
          userActivity:activeList 
        })
  }
  render(){
        let usersList = this.state.members.map((obj)=>{
          return (
              <div className = "align-user" key ={obj.id} onClick={()=>this.onOpenModal(obj.id,obj.real_name)}>
                  <div className = "align-name">Name:{obj.real_name}</div>
                  <div className="align-country">country:{obj.tz}</div>         
              </div>
              
          )
        })
        let activityList = <p>No Activity for this user on this day</p>; 
        if(this.state.userActivity.length>0){
          activityList = this.state.userActivity.map((obj,index)=>{
            return (
              <div key = {index}>
                  {/* <p>{obj.start_time}</p> */}
                  <div style ={{margin:"40px"}}>
                      <div>
                            <div className = "t1">
                                <div  className = "t2"></div>
                                <div  className = "t3">{obj.start_time}</div>
                            </div>
                        </div>
                        <div className = "activityTime">

                        </div>
                        <div>
                            <div className = "t4">
                                <div  className = "t5"></div>
                                <div  className = "t6">{obj.end_time}</div>
                            </div>
                        </div>
                        
                  </div>
                  {/* <p>{obj.end_time}</p> */}   
              </div>
            )
          })
        }
        return (
          <div className = "App">
              {usersList}
              <Modal isOpen={this.state.open} onRequestClose={this.onCloseModal} center>
                <button onClick = {this.onCloseModal}>Close Modal</button>
                <div style = {{display:"flex"}}>
                    <div className = "t9">
                          <h2>{this.state.userName} Activity Time</h2>
                          {activityList}
                    </div>
                    <div style = {{marginLeft: "10%"}}>
                        <Calendar onChange={this.onChange} value={this.state.date}/>
                    </div> 
                </div>
                    
                      
              </Modal>
          </div>
        )
  }
}

export default App;

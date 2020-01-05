import React ,{Component}from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { receiveEntries,addEntry } from '../actions/index';
import { timeToString,getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { connect } from 'react-redux';
import entries from '../reducers/index';

class History extends Component {
    componentDidMount(){
        const {dispatch} = this.props
        fetchCalendarResults().then((entries) =>
        dispatch(receiveEntries(entries)))
        .then(({entries}) =>{
            if(!entries[timeToString()]){
                dispatch(addEntry({
                    [timeToString()]:getDailyReminderValue()
                }))
            }
        })


    }
    render() {
        return (
          <View>
    <Text>{JSON.stringify(this.props)}</Text>
          </View>
        )
      }
}

function mapStateToProps(entries){
    return{
        entries
    }

}
export default connect(mapStateToProps)(History) 
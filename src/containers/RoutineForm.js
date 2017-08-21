import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import TextAreaField from '../components/TextAreaField';
import SelectField from '../components/SelectField';

import * as actions from '../actions/routineFormActions';
import { displayTime } from './../utils/displayTime';

export class RoutineForm extends Component {
  render() {
    const { actions } = this.props;

    return (
      <form>
        <h1>Routine Form</h1>
        <div>
          <TextField
            label="Name"
            name="routine.name"
            defaultValue={this.props.routine.name}
            onBlur={(ev) => actions.changeRoutine("name", ev.target.value)} />
          <TextAreaField
            label="Description"
            name="routine.description"
            defaultValue={this.props.routine.description}
            onBlur={(ev) => actions.changeRoutine("description", ev.target.value)} />
          <TextField
            label="Link"
            name="routine.link"
            defaultValue={this.props.routine.link}
            onBlur={(ev) => actions.changeRoutine("link", ev.target.value)} />
          <SelectField
            label="Public"
            name="routine.public"
            value={this.props.routine.public}
            onChange={(ev) =>
              actions.changeRoutine("public", (ev.target.value === "true"))} >
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </SelectField>
        </div>
        <div>
          { this.props.routine.groups.map((group, groupIndex) => {
            return (
              <ul key={groupIndex}>
                <li>
                  <NumberField
                    label="Times"
                    name={`routine.group[${groupIndex}]`}
                    defaultValue={group.times}
                    onBlur={(ev) =>
                      actions.changeGroup(
                        group.id, "times", parseInt(ev.target.value))} />
                </li>
                  { group.intervals.map((interval, intervalIndex) => {
                      return (
                        <ul key={intervalIndex}>
                          <li>
                            <TextField
                              label="Name"
                              name={
                                `routine.group[${groupIndex}].interval[${intervalIndex}].name`
                              }
                              defaultValue={interval.name}
                              onBlur={(ev) =>
                                actions.changeInterval(
                                  group.id, interval.id, "name", ev.target.value)} />
                          </li>
                          <li>
                            <NumberField
                              label="Duration"
                              name={
                                `routine.group[${groupIndex}].interval[${intervalIndex}].duration`
                              }
                              defaultValue={interval.duration}
                              onBlur={(ev) =>
                                actions.changeInterval(
                                  group.id, interval.id, "duration", parseInt(ev.target.value))} />
                          </li>
                        </ul>
                      )
                    })
                  }
              </ul>
              );
            })
          }
        </div>
        <input
          type="submit"
          value="Save" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    routine: state.currentRoutine.routine,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}


export default connect(mapStateToProps, mapDispatchToProps)(RoutineForm);

import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { SemiCircle } from "@tiaanduplessis/react-progressbar";
import { VectorMap } from "react-jvectormap";
import $ from "jquery";
import Axios from "axios";
import { Button, Modal } from "react-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Home.css";
import Med from "./med.svg";


var countt = 0;
const steps = [
  {
    id: "1",
    component: (
      <div>
        {" "}
        <button type="button" id="btnTest" className="btn">
          Please understand that the following interaction is not to be
          substituted for an expert advice. This has been developed in
          accordance with common symptoms and conditions related to Covid-19.
          <br></br>
          We <strong>do not</strong> collect any personal data from this
          session.<br></br>
          Please confirm that you'vs read and understood the statment.
        </button>{" "}
      </div>
    ),

    trigger: "2",
  },
  {
    id: "2",
    options: [{ label: "I confirm", trigger: "3" }],
  },
  {
    id: "3",
    message: "Let's begin!",
    trigger: "4",
  },
  {
    id: "4",
    message: "How old are you?",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: 0, label: "Less than 18", trigger: "6" },
      { value: 1, label: "18 - 26", trigger: "6" },
      { value: 2, label: "27 - 36", trigger: "6" },
      { value: 3, label: "37 - 60", trigger: "6" },
      { value: 4, label: "Above 60", trigger: "6" },
    ],
  },
  {
    id: "6",
    message: "What's your body temperature?",
    trigger: "7",
  },
  {
    id: "7",
    options: [
      { value: 0, label: "Normal (97.7-99.5 F)", trigger: "8" },
      { value: 1, label: "Fever (99.5-102 F)    ", trigger: "8" },
      { value: 2, label: "Severe Fever (Above 102 F)", trigger: "8" },
    ],
  },
  {
    id: "8",
    message: "Do you've difficulty in breathing?",
    trigger: "9",
  },
  {
    id: "9",
    options: [
      { value: 0, label: "No", trigger: "10" },
      { value: 1, label: "Moderately", trigger: "10" },
      { value: 2, label: "Severely", trigger: "10" },
    ],
  },
  {
    id: "10",
    message: "Do you suffer from coughing?",
    trigger: "11",
  },
  {
    id: "11",
    options: [
      { value: 0, label: "No", trigger: "12" },
      { value: 1, label: "Moderately", trigger: "12" },
      { value: 2, label: "Severely", trigger: "12" },
    ],
  },
  {
    id: "12",
    message: "Have you travelled abroad recently?",
    trigger: "13",
  },
  {
    id: "13",
    options: [
      { value: 0, label: "No", trigger: "14" },
      { value: 1, label: "Yes, in last 30 days.", trigger: "14" },
      { value: 2, label: "Yes, in last 15 days.", trigger: "14" },
    ],
  },
  {
    id: "14",
    message: "Do you lack sense of taste or smell?",
    trigger: "15",
  },
  {
    id: "15",
    options: [
      { value: 0, label: "No", trigger: "16" },
      { value: 1, label: "Yes", trigger: "16" },
    ],
  },
  {
    id: "16",
    message: "Have you come in contact with anyone who's infected ?",
    trigger: "17",
  },
  {
    id: "17",
    options: [
      { value: 0, label: "No", trigger: "18" },
      { value: 1, label: "Not sure", trigger: "18" },
      { value: 2, label: "Yes", trigger: "18" },
    ],
  },
  {
    id: "18",
    message: "Do you have / had any medical issues related to your Heart?",
    trigger: "19",
  },
  {
    id: "19",
    options: [
      { value: 0, label: "No", trigger: "20" },
      { value: 1, label: "Yes, at past", trigger: "20" },
      { value: 2, label: "Yes, at present", trigger: "20" },
    ],
  },
  {
    id: "20",
    message: "Do you have / had any medical issues related to your Lungs?",
    trigger: "21",
  },
  {
    id: "21",
    options: [
      { value: 0, label: "No", trigger: "22" },
      { value: 1, label: "Yes, at past", trigger: "22" },
      { value: 2, label: "Yes, at present", trigger: "22" },
    ],
  },
  {
    id: "22",
    message: "Do you smoke?",
    trigger: "23",
  },
  {
    id: "23",
    options: [
      { value: 0, label: "No", trigger: "24" },
      { value: 1, label: "Occasionally", trigger: "24" },
      { value: 2, label: "Yes", trigger: "24" },
    ],
  },
  {
    id: "24",
    component: (
      <div className="w-100s">
          Your result:
      </div>
    ),
    asMessage: true,
    end: true,
  },
];

const theme = {
  background: "white",
  fontfamily: "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif" ,
  headerBgColor: "#603392",
  headerFontColor: "#fff",
  headerFontSize: "25px",
  botBubbleColor: "#603392",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4c4c4c",
};

const config = {
  width: "500px",
  height: "600px",
  floating: false,
  padding: "0px",
  
};

export default class Home extends Component {
  state = {
    loading: false,
    search: "",
    update: "",
    number: 0,
    data: [],
    va: [],
    n1: 0,
    n2: 10,
    help: [],
    data2: [],
    mapworld: 2,
  };

  async handleChange(selectedOptions) {
    // console.log(selectedOptions);
    this.setState({
      help: selectedOptions,
      Modal: true,
    });
  }

  async handleClose(e) {
    this.setState({
      help: [],
      Modal: false,
    });
  }

  getdata() {
    var countryData = [];
    this.state.data.forEach(function (obj) {
      // console.log(`Map: ${obj.code} : ${obj.total}`);
      countryData[obj.code] = obj.total;
    });
    // console.log(countryData);
    return countryData;
  }


  trailcolor() {
    if (this.state.number >= 35) {
      return "#EC3E3F";
    }
    if (35 > this.state.number && this.state.number >= 27) {
      return "#F69A2B";
    }
    if (27 > this.state.number && this.state.number >= 15) {
      return "#3780C5";
    }
    if (15 > this.state.number) {
      return "#35A46A";
    }
  }

  

  


  handleshow = (e, el, code) => {
    el.html(
      el.html() +
        `<br> Number of corona cases: ${this.getdata3(
          code
        )}<br>  Patients cured : ${this.getdata10(
          code
        )} <br> Total deaths : ${this.getdata11(code)}`
    );
  };

  handleEnd = ({ steps, values }) => {
    // console.log(steps);
    // console.log(values);
    countt =
      values[0] +
      values[1] +
      values[2] +
      values[3] +
      values[4] +
      values[5] +
      values[6]+
      values[7]+
      values[8]+
      values[9];
    // console.log("count" + countt);
    this.setState({
      number: countt,
    });
  };


  render() {
    const DataTable = this.state.data
      .slice(this.state.n1, this.state.n2)
      .map((people, i) => {
        return (
          <tbody key={i}>
            <tr>
              <td className="text-center align-middle">{people.name}</td>
              <td className="text-left align-middle text-align-left">
                <p>Total cases: {people.total}</p>
                <p>New cases: {people.new_cases}</p>
                <p>Total deaths: {people.total_deaths}</p>
                <p>New deaths: {people.new_deaths}</p>
                <p>Total recovered: {people.total_recovered}</p>
                <p>Active cases: {people.active_cases}</p>
                <p>Critical cases: {people.critical_cases}</p>
              </td>
            </tr>
          </tbody>
        );
      });

    return (
      <div className="Home">
        <div>
          <div className="d-flex justify-content-center p-4 mt-3">
            <div className="card  p-3 mb-0 bg-white border-0">
                <div className="d-flex justify-content-center">
                  <ThemeProvider theme={theme}>
                    <ChatBot
                      handleEnd={this.handleEnd}
                      style={{ 'box-shadow': 'none', 'border-radius': '0px' }}
                      botDelay={300}
                      hideSubmitButton={false}
                      hideBotAvatar={true}
                      headerTitle="covidbot"
                      // speechSynthesis={{ enable: true, lang: "en" }}
                      steps={steps}
                      {...config}
                    />
                  </ThemeProvider>
                </div>
              <div>
                {this.state.number === 0 ? (
                  <div className="test-center mt-3 text-info text-bold d-flex justify-content-center animated flash infinite">
                    {" "}
                          Please take above test to know your risk related to
                          Corona virus
                  </div>
                ) : (
                    <div>
                      <div className="mt-4" id="bar">
                        <SemiCircle
                          style={{ width: "200px" }}
                          progress={this.state.number / 51}
                          color={this.trailcolor()}
                          trailColor={"#B8B8B8"}
                          strokeWidth={4}
                          easing="easeInOut"
                          text={{
                            className: "semi-text",
                            value: "",
                            style: {
                              color: "#000000",
                              transform: {
                                prefix: true,
                                value: "translate(-50%, -50%)",
                              },
                            },
                          }}
                        />
                      </div>
                      <div>
                        {this.state.number >= 35 ? (
                          <div>
                            <div className="d-flex justify-content-center mt-0 text-danger">
                              <h3>Critical condition</h3>
                            </div>
                            <div className="mt-3">
                              <h3>
                                <i className="fas fa-hospital-alt"></i>
                              </h3>
                              <h3>
                                We recommend you to Schedule an Appointment with a doctor on our app
                                  </h3>
                              <li>
                                Avoid close contact with people who are sick
                                  </li>
                            </div>
                          </div>
                        ) : null}
                        {35 > this.state.number &&
                          this.state.number >= 27 ? (
                            <div>
                              <div className="d-flex justify-content-center mt-0 text-warning">
                                <h3>Risky</h3>
                              </div>
                              <div className="mt-3">
                                <h3>
                                  <i className="fas fa-hospital-alt"></i>
                                </h3>
                                <h3>
                                  We recommend you to Schedule an Appointment with a doctor on our app
                                  </h3>
                                <li>
                                  Avoid close contact with people who are sick
                                  </li>
                              </div>
                            </div>
                          ) : null}
                        {27 > this.state.number &&
                          this.state.number >= 15 ? (
                            <div>
                              <div className="d-flex justify-content-center mt-0 text-info">
                                <h3>Be careful</h3>
                              </div>
                              <div className="mt-5">
                                <h3>
                                  <i className="fas fa-hands-wash"></i>
                                </h3>
                                <h3>Clean your hands often</h3>
                              </div>
                            </div>
                          ) : null}
                        {15 > this.state.number ? (
                          <div>
                            <div className="d-flex justify-content-center mt-0 text-success">
                              <h3>Safe</h3>
                            </div>
                            <div className="mt-3">
                              <h3>
                                <i className="fas fa-hands-wash"></i>
                              </h3>
                              <h3>Clean your hands often</h3>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

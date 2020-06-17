import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import FormSearchContainer from "./components/FormSearchContainer";

class LoadSelectComponent extends React.Component {

  render() {
    return (
      <div className="container">
        <FormSearchContainer />
      </div>
    );
  }
}

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <LoadSelectComponent />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

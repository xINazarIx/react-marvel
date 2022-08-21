import {Component} from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component{
  state = {
    error: false
  }

  componentDidCatch(err, errInfo){
    this.setState({error: true})
  }

  render(){
    if(this.state.error){
      return <div><ErrorMessage /></div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
import React, { Component } from 'react'
import Wrapper from './input.style'

export class Input extends Component {
  constructor (props) {
    super(props)
    // this.state = {}
    this.inputRef = React.createRef()
    this.getValue = this.getValue.bind(this)
  }

  getValue () {
    return this.inputRef.current.value
  }

  render () {
    let error = null
    if (this.props.errors && this.props.idName && this.props.errors[this.props.idName]) {
      error = this.props.errors[this.props.idName]
    }

    return (
      <Wrapper>
        <span
          style={error ? {marginTop: '-1.1em'} : null}
          className='form-error'>{error}</span>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input
            placeholder={this.props.placeholder}
            ref={this.inputRef}
            type={this.props.type}
            className={this.props.className}
            id={this.props.idName}
            onChange={() => {
              this.props.onChange(this.props.idName, this.props.errors)
            }}
            style={this.props.addonAfter ? {marginRight: '-40px'} : null}
            autoComplete={this.props.autocomplete}
          />
          {this.props.addonAfter ? (<span className='add-on-right'>{this.props.addonAfter}</span>) : null}
        </div>
      </Wrapper>
    )
  }
}

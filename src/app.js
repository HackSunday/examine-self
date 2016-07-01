import React from 'react'
import ReactDOM from 'react-dom'
import update from 'react/lib/update'
import './style.scss'

const STORE_KEY = 'EXAMINE_YOURSELF'

let App = React.createClass({
  getInitialState () {
    return {
      data: [],
      adding: false
    }
  },

  componentDidMount () {
    let data = localStorage.getItem(STORE_KEY)

    if (data) {
      this.setState({
        data: data
      })
    }
  },

  render () {
    let { data } = this.state

    return (
      <div className='app'>
        <header className='header'>
          <h1 className='title'>吾日三省吾身</h1>
          <p className='desc'>Learn to examine yourself every single day.</p>
        </header>
        <main className='main'>
          {data.length ?
            <ul>
              {data.map((item, index) => {
                return (
                  <li key={index}>
                    {item['content']}
                  </li>
                )
              })}
            </ul> :
            <div>
              <p>How about add something to examine yourself?</p>
              <button className='add-btn' onClick={this._toggleAddForm}>ADD</button>
            </div>
          }
        </main>
        {this.state.adding ? <div className='mask'>{this._renderForm()}</div> : null}
      </div>
    )
  },

  _renderForm () {
    return (
      <div className='add-form'>
        <div
          style={{
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, .075)'
          }}>
          <p style={{ margin: 0 }}>What to you wanna add?</p>
          <span
            style={{ cursor: 'pointer', color: '#777' }}
            onClick={() => {
              this.setState({
                adding: false
              })
            }}>✕</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 0'
          }}>
          <input
            type='text'
            ref='content'
            style={{
              padding: '10px 5px',
              marginBottom: '20px',
              outline: 'none',
              fontSize: '16px',
              width: '100%',
              borderRadius: '4px',
              border: '1px solid #e2e2e2'
            }} />
          <button className="add-btn">OK</button>
        </div>
      </div>
    )
  },

  _toggleAddForm () {
    this.setState({
      adding: true
    })
  },

  _add () {

  },

  _update () {

  },

  _format () {

  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

import React from 'react'
import ReactDOM from 'react-dom'
import update from 'react/lib/update'
import './style.scss'
import logo from 'file?name=[sha512:hash:base64:7].[ext]!./logo.png'

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
        data: JSON.parse(data)
      })
    }
  },

  render () {
    let { data } = this.state

    return (
      <div className='app'>
        <header className='header'>
          <h1 className='title'>
            <img src={logo} alt="logo" />
          </h1>
          <p className='desc'>吾日三省吾身。 <br /> Learn to examine yourself every single day.</p>
        </header>
        <main className='main'>
          {data.length ?
            <div style={{ paddingTop: '20px' }}>
              <button className='add-btn' onClick={this._toggleAddForm}>ADD</button>
              <ul>
                {data.map((item, index) => {
                  return (
                    <li key={index}>
                      {item['content']}
                    </li>
                  )
                })}
              </ul>
            </div> :
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
          <p style={{ margin: 0 }}>What do you wanna add?</p>
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
          <button
            className='add-btn'
            onClick={this._add}>OK</button>
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
    let content = this.refs.content.value.trim()

    if (!content.length) return

    let data = {
      id: this.state.data.length + 1,
      content: content,
      streak: 0,
      lastCheckTime: '',
      createTime: this._format(new Date())
    };

    this.setState(update(this.state, {
      data: {
        $push: [data]
      }
    }), () => {

      localStorage.setItem(STORE_KEY, JSON.stringify(this.state.data));

      this.setState({
        adding: false
      })

      this.refs.content.value = ''
    })
  },

  _update () {

  },

  _format (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

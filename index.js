

// Main Component - Parent
class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    searchData: '',
    user: null
   };
 }

 getRequest = () => {
 fetch(`https://itunes.apple.com/search?term=${this.state.searchData}&limit=8`)
   .then(response => response.json())
   .then(data => {
      const albums = data.results;
        this.setState({
        user: albums
     });
   })
   .catch((error) => console.log('Please try with right name!'));
   console.log('get user');
  }
  
 handleChange = (e) => {
  e.preventDefault();
  this.setState({
    searchData: e.target.value
  })  
 }
 render() {  
   return (
    <div>
      <Search 
        searchData={this.state.searchData}
        handleChange={this.handleChange}
        getRequest={this.getRequest}
        user={this.state.user}
        />
    </div>
    );
  }
}

//Search component - child
class Search extends React.Component {
render() {
return(
<div>
 <div className="row">
  <label className='header'>
    itunes search
  </label>
  <input
    id='username'
    type='text' 
    placeholder='enter album name'
    value={this.props.searchData}
    onChange={this.props.handleChange}
    />
  <button className="button" onClick={this.props.getRequest}>Search</button>
 {this.props.user ?
 <div>
  <ul className="user-list">
      {this.props.user.map(function(itemm) {
          return <div key={itemm.trackId}>
                    <div className="list-group-item ">
                      <img
                         className='avatar'
                         src={itemm.artworkUrl100}
                         alt='artist'
                         style={{width: 100, height: 100}}
                       />
                      <ul>
                       <li className='album-list'>{'Album: ' + itemm.trackName}</li>
                       <li className='album-list'>{'Artist: ' + itemm.artistName}</li>
                       <li className='album-list'>{'Country: ' + itemm.country}</li>
                       <li className='album-list'>{'Type: ' + itemm.kind}</li>
                     </ul>
                    </div>
                  </div>
       })}
  </ul>  
  </div> : null}
  </div>
  </div>
 );
}
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

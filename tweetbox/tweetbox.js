var TweetBox = React.createClass({
  getInitialState: function(){
    return {
      text: '',
      photoAdded: false
    }
  },
  handleChange: function(event){
    this.setState({text: event.target.value});
  },
  togglePhoto: function(event){
    this.setState({photoAdded: !this.state.photoAdded})
  },
  remainingCharacters: function(){
    var charCount = 140 - this.state.text.length;
    if (this.state.photoAdded){
      charCount -= 23;
    }
    return charCount;
  },
  overflowAlert: function(){
    if (this.remainingCharacters() < 0){
      var photoAddedChars = this.state.photoAdded ? 23 : 0;
      var textBeforeOverflow = this.state.text.substring(140 - 10 - photoAddedChars, 140 - photoAddedChars);
      var textAfterOverflow = this.state.text.substring(140 - photoAddedChars);
      return(
        <div className="alert alert-warning">
          Oops! Too long:&nbsp;...{textBeforeOverflow}<span className="bg-danger">{textAfterOverflow}</span>
        </div>  
      );
    }
    return '';
  },
  render: function(){
    return (
      <div className="well clearfix">
        { this.overflowAlert() }
        <textarea className="form-control" onChange={this.handleChange}></textarea>
        <br/>
        <span>{ this.remainingCharacters() }</span>
        <button className="btn btn-primary pull-right" disabled={this.state.text.length === 0}>Tweet</button>
        <button className="btn btn-default pull-right" onClick={this.togglePhoto}>{this.state.photoAdded ? "✓ Photo Added" : "Add Photo"}</button>
      </div>
    );
  }
})

React.render(
  <TweetBox/>,
  document.body
)
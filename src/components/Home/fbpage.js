import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'flex',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  contentWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: "100vh",
  }
})

const INITIAL_STATE = {
  width: 500,
  height: 1000
}

class FBPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
        this.resizeFB = this.resizeFB.bind(this);
    }

    componentDidMount() {
      this.resizeFB();
      window.addEventListener("resize", this.resizeFB);
    }

    resizeFB = () => {
      let fbHeight = window.innerHeight;
      let fbWidth = window.innerWidth;

      // Range check for allowed height of FB Page plugin
      if(fbHeight < 70) {
        fbHeight = 70;
      }

      // Range check for allowed width of FB Page plugin
      if(fbWidth > 500) {
        fbWidth = 500;
      }
      else if(fbWidth < 180) {
        fbWidth = 180;
      }

      this.setState({
        height: fbHeight,
        width: fbWidth
      });
    }

    getPagePluginURL = () => {
      return "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhknucsd%2F&tabs=timeline,events" +
        "&width=" + this.state.width + "&height=" + this.state.height + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId";
    }

    render() {
        return (
          <div className={this.props.classes.root}>
            <iframe
              title="hkn-ucsd-fb"
              className={this.props.classes.contentWrapper}
              src={this.getPagePluginURL()}
              width={this.state.width}
              height={this.state.height}
              frameBorder="0"
              allow="encrypted-media"
            >
            </iframe>
          </div>
        );
      }
}

export default withStyles(styles)(FBPage);
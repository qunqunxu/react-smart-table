import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import components from './index';
import styles from './App.css';

class App extends Component {
  static propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
  };

  renderList() {
    return Object.keys(components).map(key => {
      const comp = components[key];

      return (
        <li key={'component-' + key} className={styles.listItem}>
          <Link className={styles.demoName} to={{ pathname: '/', query: { page: key } }}>
            {key}
          </Link>
          <div className={styles.demo}>
            {comp ? React.createElement(comp) : null}
          </div>
        </li>
      );
    });
  }

  renderPageDetail() {
    const { params, location } = this.props;
    const { query } = location;
    const { page } = query;

    return (
      <div className={styles.detailWrapper}>
        <p className={styles.back}><Link to={{ pathname: '/' }}>Back to homepage</Link></p>
        <p className={styles.detailTitle}>{page}</p>
        {components[page] ? React.createElement(components[page]) : null}
      </div>
    );
  }

  render() {
    const { location, params } = this.props;

    if (!location.query || !location.query.page) {
      return (
        <div className={styles.container}>
          <p className={styles.title}>Demos</p>
          <ul className={styles.list}>
            {this.renderList()}
          </ul>
        </div>
      );
    }

    return this.renderPageDetail();
  }
}

export default App;

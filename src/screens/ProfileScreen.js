import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // eslint-disable-line
import { RkCard, RkText, RkButton } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import { loginWithFacebook, logout } from '../actions';
import { FBLoginButton } from '../common/components';

class ProfileScreen extends Component {
  async componentDidMount() {
    await Font.loadAsync(FontAwesome.font);
  }

  loginWithFacebook() {
    this.props.loginWithFacebook();
  }

  logout() {
    this.props.logout();
  }

  renderLoginButton() {
    if (this.props.isLoggedIn) {
      return (
        <View style={{ margin: 10 }}>
          <RkButton
            onPress={this.logout.bind(this)}
            rkType="rounded small info"
          >
            Log Out
          </RkButton>
        </View>
      );
    }
    return (
      <View style={{ margin: 10 }}>
        <FBLoginButton onPress={this.loginWithFacebook.bind(this)} />
      </View>
    );
  }

  render() {
    const { displayName, photoURL } = this.props.user;
    return (
      <View style={{ flex: 1 }}>
        <RkCard>
          <View rkCardContent>
            <RkText style={{ fontSize: 28, fontWeight: 'bold' }}>
              {displayName}
            </RkText>
          </View>
          <View rkCardContent>
            <Image rkCardImg source={{ uri: `${photoURL}?type=large` }} />
          </View>
          {this.renderLoginButton()}
        </RkCard>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { loginWithFacebook, logout }
)(ProfileScreen);

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const formdata = new FormData();
formdata.append('method', 'getQuote');
formdata.append('key', '457653');
formdata.append('format', 'json');
formdata.append('lang', 'en');

const Content = ({ state }) => {
  if (state.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{state.quote.quoteText}</Text>
        <Text style={[styles.text, styles.author]}>
          — {state.quote.quoteAuthor}
        </Text>
      </View>
    );
  }
};

export default class App extends React.Component {
  state = {
    isLoading: true,
    quote: {},
  };

  getDailyQuote() {
    return fetch('http://api.forismatic.com/api/1.0/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          quote: data,
        });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getDailyQuote();
  }

  render() {
    return <Content state={this.state} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    paddingTop: 50,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fafafa',
  },
  author: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});

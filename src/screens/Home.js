
import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, FlatList, TouchableOpacity } from 'react-native'
import { Container, Input, Content, List, ListItem, Left, Body, Thumbnail, Right } from 'native-base'
import { Icon } from 'react-native-elements'
import { Grid, Col, Row, } from 'react-native-easy-grid'
import { getData } from './../redux/actions/home';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token')

        this.props.dispatch(getData(token));
    }

    moveToBoard = (id) => {
        this.props.navigation.navigate('Board', {
            crossword_id: id
        })
    }

    handleLogout = () => {
        this.props.navigation.navigate('Login')
        AsyncStorage.removeItem('token')
    }

    render() {
        console.log(this.props.crosswords)
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#FFB873' }}>
                    <FlatList keyExtractor={(item, index) => (item, index).toString()} data={this.props.crosswords.crosswords} renderItem={({ item }) =>
                        <List>
                            <ListItem avatar style={styles.ListItem}>
                                <Left>
                                    <Thumbnail style={styles.Thumbnail} source={{ uri: ((item.usercrosswords[0].is_finished == 1) ? "https://tse3.mm.bing.net/th?id=OIP.OI0zDzADIWtwyGmUjvUSIgHaHa&pid=Api&P=0&w=300&h=300" : null) }} />
                                </Left>
                                <Grid style={styles.tittleList}>
                                    <TouchableOpacity onPress={() => this.moveToBoard(item.id)} >
                                        <Row>
                                            <Text style={styles.tittle}>{item.name}</Text>
                                        </Row>
                                    </TouchableOpacity>
                                </Grid>
                            </ListItem>
                        </List>

                    } />
                    <Icon
                        reverse
                        name='logout'
                        type='material-community'
                        color='#00142B'
                        containerStyle={{justifyContent: 'flex-end', alignSelf: 'flex-end', padding: 5}}
                        onPress={() => this.handleLogout()}
                    />

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    ListItem: {
        backgroundColor: '#00142B',
        borderColor: 'white',
        padding: 5,
        borderRadius: 20,
        marginRight: 15,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 1
    },
    Thumbnail: {
        backgroundColor: 'white',
        width: 35,
        height: 35,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    tittleList: {
        alignItems: 'center',
        marginTop: 15,
        marginRight: 0,
        paddingLeft: 10
    },
    tittle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

const mapStateToProps = state => {
    return {
        crosswords: state.home
    }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getData: () => dispatch(actionCrosswords.getData())
//   }
// }

export default connect(
    mapStateToProps
)(Home);


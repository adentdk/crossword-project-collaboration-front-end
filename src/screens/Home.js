
import React, { Component } from 'react'
import { View, Text, StyleSheet,AsyncStorage , FlatList,TouchableOpacity} from 'react-native'
import {Container, Input, Content, List, ListItem, Left, Body, Thumbnail,Right} from 'native-base'
import {Grid, Col, Row,} from 'react-native-easy-grid'
import { getData } from './../redux/actions/home';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  async componentDidMount(){
    const token = await AsyncStorage.getItem('token')
    this.props.dispatch(getData(token));
  }

  moveToBoard = (id) => {
      this.props.navigation.navigate('Board',{
          crossword_id : id
      })
  }

  render() {
    const is_finised = 1
    return (
        <Container>
            <Content>
                <FlatList    keyExtractor={(item, index) => (item, index).toString()} data={this.props.crosswords.crosswords} renderItem={({item}) => 
                <List>
                    <ListItem avatar style={styles.ListItem}>
                    <Left>
                            <Thumbnail style={ styles.Thumbnail } source={{ uri: ( (item.usercrosswords[0].is_finished == 1) ? "https://tse3.mm.bing.net/th?id=OIP.OI0zDzADIWtwyGmUjvUSIgHaHa&pid=Api&P=0&w=300&h=300" : null ) }} />
                    </Left>
                        <Grid style={ styles.tittleList }>
                            <TouchableOpacity onPress={() => this.moveToBoard(item.id)} > 
                                <Row>
                                    <Text style={styles.tittle}>{item.name}</Text>
                                </Row>
                            </TouchableOpacity>
                        </Grid>
                    <Right />
                    </ListItem>
                </List> 

                }/>
                
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    ListItem:{
        backgroundColor:'#FFB873',
        padding:5,
        borderRadius:20,
        marginRight:15,
        marginTop: 10,
        borderBottomColor:'rgba(0,0,0,.1)',
        borderRightColor:'rgba(0,0,0,.1)',
        borderBottomWidth:2,
        borderRightWidth:2,
    },
    Thumbnail:{
        backgroundColor:'white',
        width:35,
        height:35,
        marginBottom:10,
        borderColor:'black',
        borderWidth:1
    },
    tittleList:{
        alignItems:'center',
        marginTop:15,
        marginRight:0,
        paddingLeft : 10
    },
    tittle:{
        fontSize:20,
        fontWeight:'bold'
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


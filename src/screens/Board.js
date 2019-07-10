import React, { Component } from  'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList
} from 'react-native'

import {Container, Input, Content} from 'native-base'
import axios from 'axios'

class Board extends Component {

    constructor(){
        super()
        this.state = {
            answer : [
                {
                    "id": 1,
                    "crossword_id": 1,
                    "number": 1,
                    "question": "hewan berkaki empat",
                    "answer": "jaran",
                    "is_clue": true,
                    "indexes": '0,1,2,3,4'
                },
                {
                    "id": 2,
                    "crossword_id": 1,
                    "number": 2,
                    "question": "hewan berkaki dua",
                    "answer": "ayam",
                    "is_clue": false,
                    "indexes": '1,6,11,16'
                },
                {
                    "id": 3,
                    "crossword_id": 1,
                    "number": 3,
                    "question": "hewan yang seperti chandra",
                    "answer": "ampas",
                    "is_clue": false,
                    "indexes": '15,16,17,18,19'
                },
            ],
        }
    }

    componentDidMount(){
        axios.get('http://192.168.0.18:3333/api/v1/crosswords/1/answer')
        .then(result => {
            this.setState({
                answer : result.data.data
            })
        }).catch(e => {
            console.log(e)
        })
    }
    
    generateArray() {

        let answer = []
        let index = []
        this.state.answer.map((data) => {
                data.indexes.split(',').map((item,key) => {
                    answer.push({index:item, value:data.answer.substr(key,1)})
                    index.push(parseInt(item))
                })
            })



        return index
    }

    render(){
        const data = this.generateArray()
        let tts = []
        
        for (let i = 0; i < 144; i++) {
            tts.push({index: i, value:'index ke-'+i})
        }
        return(
            <Container>
                <Content>
                    <View>
                        <FlatList data={tts} numColumns={12} renderItem={({item}) => 
                          
                          <View key={item.index.toString()} style={{flex:1}}>      
                           { 
                               data.includes(item.index) 
                                ?
                                    <Input value={item.index.toString()} style={{flex:1,height:40,borderWidth:0.5,textAlign:"center"}}/>
                                :
                                    <View style={{backgroundColor:"red", flex:1,height:40}}><Text>{item.index.toString()}</Text></View>
                            }
                          </View>

                        }
                        />
                    </View>
                    <View>
                        <Text style={{textAlign:"center"}}>question is here !</Text>
                    </View>
                    <View>
                        
                    </View>
                </Content>
            </Container>
        )
    }

}

export default Board

const styles = StyleSheet.create({
    container : {
        alignItems:"center",
        flex:1,
        backgroundColor:"#aaa"
    },
    row : {
        flexDirection:"row",
    }
})





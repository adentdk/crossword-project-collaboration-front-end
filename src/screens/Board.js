import React, { Component } from  'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList
} from 'react-native'

import {Container, Input, Content} from 'native-base'
import {Grid, Col, Row,} from 'react-native-easy-grid'
import axios from 'axios'
import {connect} from 'react-redux'

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
        // axios.get('http://192.168.0.17:3333/api/v1/crosswords/1/answer')
        // .then(result => {
        //     this.setState({
        //         answer : result.data.data
        //     })
        // }).catch(e => {
        //     console.log(e)
        // })
    }
    
    generateArray() {
         // let grid = []

        // for (let x = 0; x < length; x++) {
        //     grid[x] = []

        //     for(let y = 0 ; y < length; y++){
        //        grid[x][y] = <View style={{backgroundColor:"#000"}}/> 
        //     }
        // }
        let answer = []
        let index = []
        this.state.answer.map((data) => {
                data.indexes.split(',').map((item,key) => {
                    // answer.push({index:item, value:data.answer.substr(key,1)})
                    index.push(parseInt(item))
                })
            })
        return index
    }

    generateAnswer() {
       let answer = ['a','b','v','f','h']
       let output=''
       answer.map(item => output+=item)
       return output
   }

        // answer.map(item => {
        //     grid[item.index.substr(0,1)][item.index.substr(1,1)] = item.value
        // })
        // let array = []
       
        // for (let x = 0; x < length ; x++) {
        //     array.push(x)
        // }


    generateRows(length){

        let row = []
        for (let i = 0; i < length; i++) {
            row.push(
               <Row style={{backgroundColor:"#bbb",borderBottomWidth:0.1}} key={"row "+i}>
                   {this.generateColums(length)}
                </Row>
           ) 
        }
        return row
    }

    generateColums(length)
    {
        
        let coll = []
        for (let i = 0; i < length; i++) {
            coll.push(
               <Col style={{backgroundColor:"#bbb",borderWidth:.4}} key={"col "+i}>
                   <Input value={i.toString()} />
                </Col>
           ) 
        }
        return coll
    }

    changeText=(value,index,number,crosswordName="animals")=> {
        this.props.getInput(index,value,number,crosswordName)
    }

    componentDidMount(){
        // const a={b:'inib',c:'ini c'}
        // const inib='b'
        // const f=a[inib]
        // alert(f)
    }

    async componentWillUnmount(){
        const data=this.props.getBoadrdval
        let answer=data.boards.animals
        let a=''

        for (let index = 0; index < data.boards.animals.length; index++) {
             
            const data=await axios.get('http:192.168.0.15:3333/test')
        }
    }

    render(){
        const data =this.generateArray()
        const answer=this.generateAnswer()
        console.log('ini aswer',answer)
        const isi = [1,3,7,14,5,3,7,10,9,12,20,24,34,44,54]
        let tts = []
        console.log(data)
        
        for (let i = 0; i < 144; i++) {
            tts.push({index: i, value:'index ke-'+i})
        }
        console.log('ahahah',this.props.getBoardval)
        return(
            <Container>
                <Content>
                    <View>
                        <FlatList data={tts} numColumns={12} renderItem={({item,index}) => 
                          
                          <View key={item.index.toString()} style={{flex:1}}>      
                           { 
                               data.includes(item.index) 
                                ?
                                    <Input onChangeText={text => this.changeText(text,index,this.state.answer[index].number)} style={{flex:1,height:40,borderWidth:0.5,textAlign:"center"}}/>
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

mapStateToProps = state => ({
    getBoardval: state.boards.boards.animals
})

dispatchEvent = dispatch => ({
    getInput : (index,value,number,crosswordName) => {dispatch({type:'ADD',index,value,number,crosswordName})}
})

export default connect(mapStateToProps,dispatchEvent)(Board)

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





import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    TextInput,
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Input, Content, Button } from 'native-base'
import axios from 'axios'
import * as action from '../redux/actions/boards'

//silakan passing props

const crosswordId=2
const userId=3
const fixedIndex=25
//dr field
const answerId=3

class Board extends Component {

    constructor() {
        super()
        this.state = {
            answer:[
                {
                        id: 2,
                        crossword_id: 1,
                        number: 2,
                        question:" hewan berkaki dua",
                        answer: "ayam",
                        is_clue: false,
                        indexes: '1,6,11,16'
                    },
                    {
                        id: 3,
                        crossword_id: 1,
                        number: 3,
                        question: "hewan yang seperti chandra",
                        answer: "ampas",
                        is_clue: false,
                        indexes: '15,16,17,18,19'
                    },
                    {
                        id: 2,
                        crossword_id: 1,
                        number: 2,
                        question:" hewan berkaki dua",
                        answer: "ayam",
                        is_clue: false,
                        indexes: '4,11,9,6,17'
                    },
                    {
                        id: 3,
                        crossword_id: 1,
                        number: 3,
                        question: "hewan yang seperti chandra",
                        answer: "ampas",
                        is_clue: false,
                        indexes: '9,7,3,17,22'
                    },
            ]
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    componentDidMount() {
        // if(!this.props.getData){
        this.props.fetchData()
        this.props.fetchAnswer()
        // this.setState({answer:this.props.getData})
        // }
        // this.setState({answerss:this.props.getData})
        // this.setState({answer:this.props.getBoardval})
    }

    // componentDidUpdate()
    // componentWillReceiveProps(prevState,prevProps){
    //     if(prevProps.getData !== this.props.getData)
    //     {
    //         this.setState({answer:this.props.getData})
    //     }
    // }
    
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.getData !== this.props.getData){
    //         this.setState({answer:nextProps.getData})
    //     }
    // }

    generateArray() {

        let answer = []
        let index = []
        this.state.answer.map((data) => {
            data.indexes.split(',').map((item, key) => {
                answer.push({ index: item, value: data.answer.substr(key, 1) })
                index.push(parseInt(item))
            })
        })
        return index
    }


    changeText=(value,index,crosswordName='testGan',answerId)=> {
        this.props.getInput(index,value,answerId,crosswordName)
    }

    getSoal = (i) => {
        console.log("index klik " + i)
        this.state.answer.map((data) => {
            data.indexes.split(',').filter(item => {
                if (item == i) {
                    this.setState({
                        question: `${data.type}: ${data.question}`,
                        type: data.type
                    })
                }
                
            })
        })
    }

    handleSubmit = () => {
        alert('OK')
    }

    focusNextField=(id, data) => {
        // console.log(data)
        // console.log("data[index.item] :" + data[id])
        // console.log("item : " + id)

        idx = (data.indexOf(id) + 1)
        nextIndex = data[idx]
        console.log(nextIndex)

        let next
        next = `index_${nextIndex}`
        if (nextIndex !== undefined) {
            if (this.state.type == 'mendatar' && (data[idx + 1] == data[idx] + 1)) {
                this.inputs[next].focus()
            } else if (this.state.type == 'menurun') {
                this.inputs[next].focus()
            }

        }

    }



    render() {
        const data = this.generateArray()
        let tts = []
        // var crosswordName=this.state.answer.crosswordName
        console.log('ini jawaban',this.state.answer)
        for (let i = 0; i < 25; i++) {
            tts.push({ index: i, value: 'index ke-' + i })
        }
        return (
            <Container>
                <Content>
                    <View>
                        <FlatList
                            data={tts}

                            numColumns={5}
                            keyExtractor={(item, index) => (item, index).toString()}
                            renderItem={({ item, index }) =>

                                <View style={{ flex: 1 }}>
                                    {
                                        data.includes(item.index)
                                            ?
                                            <TextInput
                                                onFocus={() => this.getSoal(item.index)}
                                                
                                                ref={input => {
                                                    this.inputs[`index_${item.index}`] = input;
                                                }}
                                                onKeyPress={() => {
                                                    console.log(data)
                                                    this.focusNextField(item.index,data);
                                                }}
                                                onChangeText={text => this.changeText(text,index)}
                                                maxLength={1}
                                                style={{ flex: 1, height: 40, borderRightWidth: 0.5,borderBottomWidth: 0.5, textAlign: "center" }} />
                                            :
                                            <View style={{ backgroundColor: "#313131", borderRightWidth: 0.5, borderBottomWidth: 0.5,borderColor: 'white', flex: 1, height: 40 }} />
                                    }
                                </View>

                            }
                        />
                    </View>
                    <View style={{
                        flex: 1, height: 40, backgroundColor: '#00142B', flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: "center", color: '#f4f6f6' }}>{this.state.question}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex:1, paddingHorizontal: 80, paddingBottom: 20}}>
                        <Button block rounded onPress={() => this.handleSubmit} style={{ backgroundColor: '#00142B', marginTop: 15}}>
                            <Text style={{color: 'white'}}>Submit</Text>
                        </Button>
                        <Button block rounded onPress={() => {
                            this.props.navigation.navigate("Logout")
                        }} style={{ backgroundColor: '#00142B', marginTop: 15}}>
                            <Text style={{color: 'white'}}>Logout</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }

}
const dataf='Nama-namakota'
mapStateToProps = state => ({
    
})

dispatchEvent = dispatch => ({
    getInput : (index,value,number,crosswordName) => {dispatch(action.getInput(index,value,number,crosswordName))},
    getFirst: (crosswordName,fixedIndex) => {dispatch(action.getFirst(crosswordName,fixedIndex))},
    fetchData: () => {dispatch( action.fetchData() )},
    fetchAnswer : () => {dispatch( action.fetchAnswer() )},
    submit: action.submit()
})

export default connect(mapStateToProps,dispatchEvent)(Board)

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#aaa"
    },
    row: {
        flexDirection: "row",
    }
})

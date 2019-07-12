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
import { url } from '../../assets/variables'
import { Container, Input, Content, Button } from 'native-base'
import axios from 'axios'

class Board extends Component {

    constructor() {
        super()
        this.state = {
            answer: [],
            userAnswer : [],
            question: '',
            type: ''
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token')
        const crossword_id = this.props.navigation.getParam('crossword_id','NO-CROSSWORDID')
        console.log(token,crossword_id)

        // console.log(url.axios + '/api/v1/crosswords/1/answer');
        
        axios.get(`${url.axios}/api/v1/crosswords/${crossword_id}/answer`,
            {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            }
        )
            .then(result => {
                this.setState({
                    answer: result.data.data
                })
                console.log(result)
            }).catch(e => {
                console.log(e)
            })
    }

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

    focusNextField(id, data) {
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
                        <Button block rounded onPress={() => this.handleSubmit()} style={{ backgroundColor: '#00142B', marginTop: 15}}>
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

export default Board

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





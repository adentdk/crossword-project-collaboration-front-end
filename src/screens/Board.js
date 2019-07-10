import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    TextInput
} from 'react-native'
import { url } from '../../assets/variables'
import { Container, Input, Content } from 'native-base'
import axios from 'axios'

class Board extends Component {

    constructor() {
        super()
        this.state = {
            answer: [

            ],
            question: '',
            type: ''
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    componentDidMount() {
        axios.get(`${url.axios}/crosswords/3/answer`)
            .then(result => {
                this.setState({
                    answer: result.data.data
                })
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

    focusNextField(id,data1) {
        // console.log('ini field' + this.state.type)
        let next
        if (data1 == (id+1) && this.state.type == 'mendatar') {
            next = `index_${id + 1}`
            this.inputs[next].focus();
        } else {
            next = `index_${id + 5}`
            this.inputs[next].focus();
        }
       
        // if (this.state.type === 'mendatar') {
            
        // } else {
        //     next = `index_${id + 5}`
        //     this.inputs[next].focus();
        // }
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
                                                value={index.toString()}
                                                ref={input => {
                                                    this.inputs[`index_${item.index}`] = input;
                                                }}
                                                onKeyPress={() => {
                                                    
                                                    this.focusNextField(item.index, data[item.index+1]);
                                                }}
                                                maxLength={1}
                                                style={{ flex: 1, height: 40, borderWidth: 0.25, textAlign: "center" }} />
                                            :
                                            <View style={{ backgroundColor: "#313131", borderWidth: 0.25, borderColor: 'white', flex: 1, height: 40 }} >
                                                <Text style={{ color: 'white'}}>{index.toString()}</Text>
                                            </View>

                                    }
                                </View>

                            }
                        />
                    </View>
                    <View style={{
                        flex: 1, height: 40, backgroundColor: '#ca3e47', flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: "center", color: '#f4f6f6' }}>{this.state.question}</Text>
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
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#aaa"
    },
    row: {
        flexDirection: "row",
    }
})





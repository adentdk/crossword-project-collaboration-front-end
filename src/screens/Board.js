import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    TextInput,
    TouchableOpacity,
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
let userData
const answerId=3

let handleText={}

class Board extends Component {

    constructor() {
        super()
        this.state = {
            answer:[],
            answerIdIndex:false,
            allQuestion:[],
            question:[],
            text:{},
            getAddIndex:[],
            giveNumber:[],
            activeField:null
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
    }

    componentDidMount() {
        // if(!this.props.getData){
        this.props.fetchData()
        setTimeout(() => this.props.fetchAnswer() ,1000)
        // setTimeout(() => this.props.fetchAnswer(),500)
        // this.setState({answer:this.props.getData})
        // }
        // this.setState({answerss:this.props.getData})
        // this.setState({answer:this.props.getBoardval})
    }

    componentDidUpdate(prevProps,prevState){
        let crosswordName='namanamakota'
        if(this.props.getBoard.UIndex !== prevProps.getBoard.UIndex){
            userData=this.props.getBoard[crosswordName].data
        }
        if(this.props.getBoard.SIndex !== prevProps.getBoard.SIndex){
            alert(this.props.getBoard[crosswordName].msg,this.props.getBoard[crosswordName].errorData)
        }
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

    changeText=(value,index,answerId)=> {
        this.props.getInput(index,value,answerId)
        this.setState(prev => ({text:{...prev.text,['text_'+index]:value}}))
    }

    handleSubmit = () => {
        // this.props.save()
        let crosswordName='namanamakota'
        let checkField=false
        let emptyIndex=[]
        this.props.getBoard[crosswordName].default.map((data,index) => {
            userData.map((aData,aIndex)=> {
                if(data.index === aData.index && data.id === aData.answerId && aData.data){
                    checkField=true
                    console.log('ini true submit')
                }
            })
            if(!checkField){
                emptyIndex.push({data:" ",index:data.index,answerId:data.id})
                console.log('ini false submit')
            }
            checkField=false
        })
        console.log('emptyIndex',emptyIndex)
        userData.push(...emptyIndex)
        console.log('userData',userData)
        this.props.submit(userData)
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

    getValue=(index)=> {
        let crosswordName='namanamakota'
        let result
        let check = this.props.getBoard[crosswordName].data.map((data,index) => {
            if(data.index === index){
                result = data.data
            }
        })
        return result
    }

    createBoard=()=> {
        let tts = []
        let crosswordName='namanamakota'
        let defaultData=this.props.getBoard[crosswordName].default
        defaultData.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)) 
        let updateIndex=0
        let beforeIndex
        let beforeData
        let sameIndex=0

        //angaka 25 nya ada di redux(fixedIndex)
        for (let i = 0; i < 25; i++) {
            if(defaultData[updateIndex]){
                let isClue=defaultData[updateIndex].isClue
                if(isClue && !this.state.getAddIndex.includes(i)){
                    let answerId=[defaultData[updateIndex].id]
                    this.setState(prev => ({getAddIndex:[...prev.getAddIndex,i]}))
                    this.props.getInput(i,defaultData[updateIndex].data,answerId)
                }
                if(defaultData[updateIndex].index === beforeIndex){
                    if(isClue || beforeData.isClue && !this.state.getAddIndex.includes(i)){
                        let answerId2=[defaultData[updateIndex].id]
                        beforeData.isClue=true    
                        this.props.getInput(i-1,defaultData[updateIndex].data,answerId2)
                        this.setState(prev => ({getAddIndex:[...prev.getAddIndex,i]}))
                    }
                    beforeData.answerId.push(defaultData[updateIndex].id)
                    beforeData.number2=defaultData[updateIndex].number
                    tts[i-1]=beforeData
                    beforeIndex=0
                    tts.push({blank:true})
                    updateIndex += 1
                    sameIndex += 1
                }else if(defaultData[updateIndex].index + sameIndex === i){
                    tts.push({isClue,data:defaultData[updateIndex].data,answerId:[defaultData[updateIndex].id],number:defaultData[updateIndex].number,blank:false})   
                    beforeData={isClue,data:defaultData[updateIndex].data,answerId:[defaultData[updateIndex].id],number:defaultData[updateIndex].number,blank:false}
                    beforeIndex=defaultData[updateIndex].index      
                    updateIndex += 1   
                    sameIndex=0
                }else {
                    sameIndex = 0
                    beforeIndex=null
                    tts.push({blank:true})
                }    
            }else {
                sameIndex = 0
                beforeIndex=null
                tts.push({blank:true})
            }
        }
        return tts
    }

    createAnswer=()=> {
        let crosswordName='namanamakota'
        let defaultData = this.props.getBoard[crosswordName].data
        let mainData=this.createBoard()
        if(defaultData.length === 0){
            return mainData
        }else{

            defaultData.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
            let updateIndex=0 
            let beforeIndex
            let beforeData
            let sameIndex=0
            let newData=[]
            let newDataa=[]
            
            for (let i = 0; i < 25; i++) {
                if(defaultData[updateIndex]){
                    if(defaultData[updateIndex].index === beforeIndex){
                        sameIndex+=1
                        beforeIndex=0
                        updateIndex += 1
                        newData.push(mainData[i])

                    }else if(defaultData[updateIndex].index + sameIndex === i){
                        beforeIndex=defaultData[updateIndex].index      
                        newData.push({...mainData[i],userAnswer:defaultData[updateIndex].data})
                        updateIndex += 1
                        sameIndex=0
                        // newData.push(newObj)
                    }else {

                        newData.push(mainData[i])
                        sameIndex = 0
                        beforeIndex=null

                    }    
                }else {
                    newData.push(mainData[i])
                    sameIndex = 0
                    beforeIndex=null
                }
            }
            return newData
        }
    }

    handleValue=(isClue,data,userAnswer,index)=> {
        if(isClue){
            return data
        }else {
            this.setState(prev => (
                {text:{
                    ...prev.text,
                    ['text_'+index]:userAnswer        
                }}
            ))
            return 'A'
        }
    }

    handleQuestion=(answerId)=> {
        let crosswordName="namanamakota"
        let allQuestion=this.props.getBoard[crosswordName].question
        if(answerId.length === 1){
            let result=allQuestion.filter((data,index) => {
                if(data.answerId === answerId[0]){
                    return true
                }
            })
            this.setState({question:[result[0].data,result[0].number],answerIdIndex:false})
        }else {
            let result=allQuestion.filter((data,index) => {
                if(data.answerId === answerId[this.state.answerIdIndex ? 0 : 1]){
                    return true
                }
            })
            this.setState(prev => ({question:[result[0].data,result[0].number],answerIdIndex:!prev.answerIdIndex}))
        }
    }

    render() {
        console.log('ni text gan',this.state.giveNumber)
        let crosswordName="namanamakota" 
        let beforeNumber
        let checkNumber=[]
        let getNumber
        return (
            <Container>
                <Content>
                        {
                        !this.props.getBoard.loadData && !this.props.getBoard.loadAnswer && !this.props.getBoard.error ? 
                            <React.Fragment>
                            <View>
                                <FlatList
                                    data={this.createAnswer()}
                                    numColumns={5}
                                    keyExtractor={(item, index) => (item, index).toString()}
                                    renderItem={({item,index}) =>
                                    {   
                                        if(!checkNumber.includes(item.number2 || item.number)){ 
                                            checkNumber.push(item.number2 || item.number)
                                            getNumber=item.number2 || item.number
                                        }else{
                                            getNumber=""
                                        }
                                        return (
                                        <View style={{ flex: 1 }}>
                                            {   
                                                !item.blank
                                                    ?
                                                    <View>
                                                        <TextInput
                                                            ref={input => {
                                                                this.inputs[`index_${item.index}`] = input;
                                                            }}
                                                            onChangeText={text => this.changeText(text,index,item.answerId)}
                                                            maxLength={1}
                                                            defaultValue={item.isClue ? item.data : item.userAnswer}
                                                            value={this.state.text['text_'+index]}
                                                            // value={this.handleValue(item.isClue,item.data,item.userAnswer,index)}
                                                            onTouchStart={() => this.handleQuestion(item.answerId)}
                                                            style={{ flex: 1, height: 40,borderRightWidth: 1.5,borderBottomWidth: 1.5, textAlign: "center" }}
                                                        />
                                                        <Text style={{position:'absolute',top:0,left:3,fontSize:13}}>{getNumber}</Text>
                                                    </View>
                                                    :
                                                    <View style={{ backgroundColor: "#313131", borderRightWidth: 0.5, borderBottomWidth: 0.5,borderColor: 'white', flex: 1, height: 40 }} />
                                            }
                                        </View>
                                        )

                                    }}
                                />
                            </View>
                            <View style={{
                                flex: 1, height: 40, backgroundColor: '#00142B', flexDirection: 'row', alignItems: 'center'
                                , justifyContent: 'center'
                            }}>
                                <Text style={{ textAlign: "center", color: '#f4f6f6',fontSize:20}}>{this.state.question[1]}.&nbsp;{this.state.question[0]}</Text>
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
                        </React.Fragment>
                    :
                        <Text style={{fontSize:50,alignSelf:'center'}}>Loading..</Text>
                    }
                </Content>
            </Container>
        )
    }
}

const dataf='namanamakota'
mapStateToProps = (state,prevProps) => ({
    getBoard:state.boards.boards
})

dispatchEvent = dispatch => ({
    getInput : (index,value,number) => {dispatch(action.getInput(index,value,number))},
    getFirst: (crosswordName,fixedIndex) => {dispatch(action.getFirst(crosswordName,fixedIndex))},
    fetchData: () => {dispatch( action.fetchData() )},
    save: () => {dispatch( action.save(userData,3) )},
    submit: (finalData) => {dispatch( action.submit(finalData,2,3) )},
    fetchAnswer : () => {dispatch( action.fetchAnswer() )}
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

import React, { Component } from  'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native'

import {Container} from 'native-base'
import {Grid, Col, Row,} from 'react-native-easy-grid'
class Board extends Component {

    constructor(){
        super()

    }
    
    generateRows(length){

        let coll = []
        for (let i = 0; i < length; i++) {
            coll.push(
               <Row style={{backgroundColor:"#bbb",borderWidth:1}} key={"col "+i}>
                   {this.generateColums(length)}
                </Row>
           ) 
        }
        return coll
    }

    generateColums(length)
    {
        
        let coll = []
        for (let i = 0; i < length; i++) {
            coll.push(
               <Col style={{backgroundColor:"#bbb",borderWidth:1}} key={"col "+i}>
                   <Text>1</Text>
                </Col>
           ) 
        }
        return coll
    }

    render(){
        const size = 5
        return(
            <Container>
                <Grid>
                    {this.generateRows(size)}
                </Grid>
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

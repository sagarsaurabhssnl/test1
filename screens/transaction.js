import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Vibration, KeyboardAvoidingView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import db from "../config";

export default class transaction extends React.Component {
    constructor() {
        super(); this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal",
            bookId: "",
            studentId: "",
            data: "",
            transactionMessage: ""
        }
    }
    bookId
    getCameraPermission = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted", buttonState: id, scanned: false })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        if (this.state.buttonState === "studentid") {
            Vibration.vibrate();
            this.setState({ scanned: true, studentId: data, buttonState: "normal" })
            console.log(this.state.studentId)
        } else if (this.state.buttonState === "bookid") {
            Vibration.vibrate();
            this.setState({ scanned: true, bookId: data, buttonState: "normal" })
            console.log(this.state.bookId)
        }
    }

    initiateBookIssue = async () => {
        // alert("calle1S")
        db.collection("transaction").add({
            "studentId": this.state.studentId,
            "bookId": this.state.bookId,
            "date": firebase.firestore.Timestamp.now().toDate(),
            "transactionType": "issue"
        });
        alert("called")
        db.collection("book").doc(this.state.bookId).update({
            available: false
        })
        db.collection("student").doc(this.state.studentId).update({
            bookNumber: firebase.firestore.FieldValue.increment(1)
        })
    }

    initiateBookReturn = async () => {
        db.collection("transaction").add({
            studentId: this.state.studentId,
            bookId: this.state.bookId,
            data: firebase.firestore.Timestamp.now().toDate(),
            transactionType: "return"
        });
        db.collection("books").doc(this.state.bookId).update({
            available: true
        });
        db.collection("student").doc(this.state.studentId).update({
            bookNumber: firebase.firestore.FieldValue.increment(-1)
        });
    }

    handleTransaction = async () => {
        console.log("check1")
        await db.collection("book").doc(this.state.bookId).get().then((fetch) => {
            var data = fetch.data();
            console.log(data)
            if (data.available) {
                this.initiateBookIssue();
                this.setState({
                    studentId: "",
                    bookId: ""
                })
                // alert("Book Issued")
            } else {
                this.initiateBookReturn();
                this.setState({
                    studentId: "",
                    bookId: ""
                })
                alert("Book Returned")
            }
        })
        console.log("check3")


    }

    render() {
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState !== "normal" && hasCameraPermission) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            );
        } else if (buttonState === "normal") {
            return (
                <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
                    <Image source={require("../assets/booklogo.jpg")} style={{
                        width: 200, height: 200
                    }} />
                    <View style={styles.main}><TextInput value={this.state.bookId} style={styles.input} placeholder={"Book ID"} onChangeText={(val) => { this.setState({ bookId: val }) }}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => { this.getCameraPermission("bookid") }}><Text style={{ color: "#fff" }}>Scan</Text></TouchableOpacity>
                    </View>
                    <View style={styles.main}><TextInput value={this.state.studentId} style={styles.input} placeholder={"Student ID"} onChangeText={(val) => { this.setState({ studentId: val }) }}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => { this.getCameraPermission("studentid") }}><Text style={{ color: "#fff" }}>Scan</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.submit} onPress={() => { this.handleTransaction() }}><Text>SUBMIT</Text></TouchableOpacity>
                </KeyboardAvoidingView>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        transform: [{ translateY: 50 }]
    },
    input: {
        width: 150,
        height: 50,
        backgroundColor: "#888",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 6
    },
    button: {
        width: 90,
        height: 40,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginLeft: 20
    },
    submit: {
        transform: [{ translateY: 50 }],
        backgroundColor: "#78a",
        width: 120,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30
    }
});

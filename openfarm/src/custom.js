import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header-content": {
        "position": "absolute",
        "bottom": 0,
        "width": "100%"
    },
    "chat-body answer-add": {
        "clear": "both",
        "position": "relative",
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "bottom": 0,
        "background": "#ecf0f1"
    },
    "chat-body answer-add input": {
        "border": "none",
        "background": "#fafafa",
        "display": "block",
        "height": 40,
        "color": "black",
        "width": "100%",
        "fontSize": 16,
        "lineHeight": 20,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "chat input": {
        "WebkitAppearance": "none",
        "borderRadius": 0
    },
    "chat-body answerleft text": {
        "background": "white",
        "color": "#333333",
        "borderRadius": "20px 20px 20px 0"
    },
    "chat-body answer text": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "fontSize": 14,
        "lineHeight": 16,
        "position": "relative"
    },
    "chat-body answerleft text:before": {
        "left": -30,
        "borderRightColor": "#ebebeb",
        "borderRightWidth": 12
    },
    "chat-body answer text:before": {
        "content": "''",
        "display": "block",
        "position": "absolute",
        "bottom": 0,
        "border": "18px solid transparent",
        "borderBottomWidth": 0
    },
    "chat-body answerleft time": {
        "paddingLeft": 10,
        "color": "#333333",
        "fontStyle": "italic",
        "fontWeight": "bold"
    },
    "chat-body answer time": {
        "fontSize": 10,
        "lineHeight": 16,
        "position": "relative",
        "paddingBottom": 1
    },
    "chat-body answerright": {
        "paddingTop": 2,
        "paddingRight": 0,
        "paddingBottom": 2,
        "paddingLeft": 0,
        "textAlign": "right",
        "float": "right"
    },
    "chat-body answerright avatar": {
        "right": 0
    },
    "chat-body answerright avatar status": {
        "left": 4
    },
    "chat-body answerright text": {
        "background": "#00abc9",
        "color": "#ffffff",
        "borderRadius": "20px 20px 0 20px"
    },
    "chat-body answerright time": {
        "fontSize": 10,
        "paddingRight": 10,
        "color": "#333333"
    },
    "chat": {
        "height": "calc(100vh - 180px)"
    },
    "decor-default": {
        "backgroundColor": "#ffffff"
    },
    "chat-users h6": {
        "fontSize": 20,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0
    },
    "chat-users user": {
        "position": "relative",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 50,
        "display": "block",
        "cursor": "pointer",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0
    },
    "chat-users user avatar": {
        "top": 0,
        "left": 0
    },
    "chat-body answer": {
        "position": "relative",
        "maxWidth": 600,
        "overflow": "hidden",
        "clear": "both"
    },
    "chat-body answerleft": {
        "paddingTop": 2,
        "paddingRight": 0,
        "paddingBottom": 2,
        "paddingLeft": 0,
        "textAlign": "left",
        "float": "left"
    }
});
/*******************************************************************************
 * Copyright (c) 2013, 2014 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution. 
 *
 * The Eclipse Public License is available at 
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at 
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 *******************************************************************************/

if(typeof Paho==="undefined"){Paho={}}Paho.MQTT=(function(r){var h="1.0.0";var k="2014-07-28T23:21:53Z";var o={CONNECT:1,CONNACK:2,PUBLISH:3,PUBACK:4,PUBREC:5,PUBREL:6,PUBCOMP:7,SUBSCRIBE:8,SUBACK:9,UNSUBSCRIBE:10,UNSUBACK:11,PINGREQ:12,PINGRESP:13,DISCONNECT:14};var m=function(C,B){for(var z in C){if(C.hasOwnProperty(z)){if(B.hasOwnProperty(z)){if(typeof C[z]!==B[z]){throw new Error(u(j.INVALID_TYPE,[typeof C[z],z]))}}else{var A="Unknown property, "+z+". Valid properties are:";for(var z in B){if(B.hasOwnProperty(z)){A=A+" "+z}}throw new Error(A)}}}};var b=function(A,z){return function(){return A.apply(z,arguments)}};var j={OK:{code:0,text:"AMQJSC0000I OK."},CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error."},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."},};var f={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"};var u=function(z,B){var E=z.text;if(B){for(var A=0;A<B.length;A++){field="{"+A+"}";start=E.indexOf(field);if(start>0){var D=E.substring(0,start);var C=E.substring(start+field.length);E=D+B[A]+C}}}return E};var e=[0,6,77,81,73,115,100,112,3];var d=[0,4,77,81,84,84,4];var q=function(B,A){this.type=B;for(var z in A){if(A.hasOwnProperty(z)){this[z]=A[z]}}};q.prototype.encode=function(){var F=((this.type&15)<<4);remLength=0;topicStrLength=new Array();if(this.messageIdentifier!=undefined){remLength+=2}switch(this.type){case o.CONNECT:switch(this.mqttVersion){case 3:remLength+=e.length+3;break;case 4:remLength+=d.length+3;break}remLength+=c(this.clientId)+2;if(this.willMessage!=undefined){remLength+=c(this.willMessage.destinationName)+2;var A=this.willMessage.payloadBytes;if(!(A instanceof Uint8Array)){A=new Uint8Array(D)}remLength+=A.byteLength+2}if(this.userName!=undefined){remLength+=c(this.userName)+2}if(this.password!=undefined){remLength+=c(this.password)+2}break;case o.SUBSCRIBE:F|=2;for(var E=0;E<this.topics.length;E++){topicStrLength[E]=c(this.topics[E]);remLength+=topicStrLength[E]+2}remLength+=this.requestedQos.length;break;case o.UNSUBSCRIBE:F|=2;for(var E=0;E<this.topics.length;E++){topicStrLength[E]=c(this.topics[E]);remLength+=topicStrLength[E]+2}break;case o.PUBREL:F|=2;break;case o.PUBLISH:if(this.payloadMessage.duplicate){F|=8}F=F|=(this.payloadMessage.qos<<1);if(this.payloadMessage.retained){F|=1}destinationNameLength=c(this.payloadMessage.destinationName);remLength+=destinationNameLength+2;var D=this.payloadMessage.payloadBytes;remLength+=D.byteLength;if(D instanceof ArrayBuffer){D=new Uint8Array(D)}else{if(!(D instanceof Uint8Array)){D=new Uint8Array(D.buffer)}}break;case o.DISCONNECT:break;default:}var z=x(remLength);var G=z.length+1;var B=new ArrayBuffer(remLength+G);var H=new Uint8Array(B);H[0]=F;H.set(z,1);if(this.type==o.PUBLISH){G=t(this.payloadMessage.destinationName,destinationNameLength,H,G)}else{if(this.type==o.CONNECT){switch(this.mqttVersion){case 3:H.set(e,G);G+=e.length;break;case 4:H.set(d,G);G+=d.length;break}var C=0;if(this.cleanSession){C=2}if(this.willMessage!=undefined){C|=4;C|=(this.willMessage.qos<<3);if(this.willMessage.retained){C|=32}}if(this.userName!=undefined){C|=128}if(this.password!=undefined){C|=64}H[G++]=C;G=y(this.keepAliveInterval,H,G)}}if(this.messageIdentifier!=undefined){G=y(this.messageIdentifier,H,G)}switch(this.type){case o.CONNECT:G=t(this.clientId,c(this.clientId),H,G);if(this.willMessage!=undefined){G=t(this.willMessage.destinationName,c(this.willMessage.destinationName),H,G);G=y(A.byteLength,H,G);H.set(A,G);G+=A.byteLength}if(this.userName!=undefined){G=t(this.userName,c(this.userName),H,G)}if(this.password!=undefined){G=t(this.password,c(this.password),H,G)}break;case o.PUBLISH:H.set(D,G);break;case o.SUBSCRIBE:for(var E=0;E<this.topics.length;E++){G=t(this.topics[E],topicStrLength[E],H,G);H[G++]=this.requestedQos[E]}break;case o.UNSUBSCRIBE:for(var E=0;E<this.topics.length;E++){G=t(this.topics[E],topicStrLength[E],H,G)}break;default:}return B};function g(K,H){var F=H;var D=K[H];var G=D>>4;var z=D&=15;H+=1;var I;var J=0;var N=1;do{if(H==K.length){return[null,F]}I=K[H++];J+=((I&127)*N);N*=128}while((I&128)!=0);var B=H+J;if(B>K.length){return[null,F]}var L=new q(G);switch(G){case o.CONNACK:var C=K[H++];if(C&1){L.sessionPresent=true}L.returnCode=K[H++];break;case o.PUBLISH:var M=(z>>1)&3;var E=l(K,H);H+=2;var A=n(K,H,E);H+=E;if(M>0){L.messageIdentifier=l(K,H);H+=2}var O=new Paho.MQTT.Message(K.subarray(H,B));if((z&1)==1){O.retained=true}if((z&8)==8){O.duplicate=true}O.qos=M;O.destinationName=A;L.payloadMessage=O;break;case o.PUBACK:case o.PUBREC:case o.PUBREL:case o.PUBCOMP:case o.UNSUBACK:L.messageIdentifier=l(K,H);break;case o.SUBACK:L.messageIdentifier=l(K,H);H+=2;L.returnCode=K.subarray(H,B);break;default:}return[L,B]}function y(A,z,B){z[B++]=A>>8;z[B++]=A%256;return B}function t(A,B,z,C){C=y(B,z,C);i(A,z,C);return C+B}function l(z,A){return 256*z[A]+z[A+1]}function x(B){var z=new Array(1);var A=0;do{var C=B%128;B=B>>7;if(B>0){C|=128}z[A++]=C}while((B>0)&&(A<4));return z}function c(B){var A=0;for(var C=0;C<B.length;C++){var z=B.charCodeAt(C);if(z>2047){if(55296<=z&&z<=56319){C++;A++}A+=3}else{if(z>127){A+=2}else{A++}}}return A}function i(B,A,E){var D=E;for(var C=0;C<B.length;C++){var z=B.charCodeAt(C);if(55296<=z&&z<=56319){lowCharCode=B.charCodeAt(++C);if(isNaN(lowCharCode)){throw new Error(u(j.MALFORMED_UNICODE,[z,lowCharCode]))}z=((z-55296)<<10)+(lowCharCode-56320)+65536}if(z<=127){A[D++]=z}else{if(z<=2047){A[D++]=z>>6&31|192;A[D++]=z&63|128}else{if(z<=65535){A[D++]=z>>12&15|224;A[D++]=z>>6&63|128;A[D++]=z&63|128}else{A[D++]=z>>18&7|240;A[D++]=z>>12&63|128;A[D++]=z>>6&63|128;A[D++]=z&63|128}}}}return A}function n(G,C,z){var A="";var B;var E=C;while(E<C+z){var I=G[E++];if(I<128){B=I}else{var H=G[E++]-128;if(H<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),""]))}if(I<224){B=64*(I-192)+H}else{var F=G[E++]-128;if(F<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16)]))}if(I<240){B=4096*(I-224)+64*H+F}else{var D=G[E++]-128;if(D<0){throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16),D.toString(16)]))}if(I<248){B=262144*(I-240)+4096*H+64*F+D}else{throw new Error(u(j.MALFORMED_UTF,[I.toString(16),H.toString(16),F.toString(16),D.toString(16)]))}}}}if(B>65535){B-=65536;A+=String.fromCharCode(55296+(B>>10));B=56320+(B&1023)}A+=String.fromCharCode(B)}return A}var s=function(z,E,D){this._client=z;this._window=E;this._keepAliveInterval=D*1000;this.isReset=false;var C=new q(o.PINGREQ).encode();var B=function(F){return function(){return A.apply(F)}};var A=function(){if(!this.isReset){this._client._trace("Pinger.doPing","Timed out");this._client._disconnected(j.PING_TIMEOUT.code,u(j.PING_TIMEOUT))}else{this.isReset=false;this._client._trace("Pinger.doPing","send PINGREQ");this._client.socket.send(C);this.timeout=this._window.setTimeout(B(this),this._keepAliveInterval)}};this.reset=function(){this.isReset=true;this._window.clearTimeout(this.timeout);if(this._keepAliveInterval>0){this.timeout=setTimeout(B(this),this._keepAliveInterval)}};this.cancel=function(){this._window.clearTimeout(this.timeout)}};var w=function(z,D,B,E,A){this._window=D;if(!B){B=30}var C=function(H,F,G){return function(){return H.apply(F,G)}};this.timeout=setTimeout(C(E,z,A),B*1000);this.cancel=function(){this._window.clearTimeout(this.timeout)}};var v=function(D,C,A,E,z){if(!("WebSocket" in r&&r.WebSocket!==null)){throw new Error(u(j.UNSUPPORTED,["WebSocket"]))}if(!("localStorage" in r&&r.localStorage!==null)){throw new Error(u(j.UNSUPPORTED,["localStorage"]))}if(!("ArrayBuffer" in r&&r.ArrayBuffer!==null)){throw new Error(u(j.UNSUPPORTED,["ArrayBuffer"]))}this._trace("Paho.MQTT.Client",D,C,A,E,z);this.host=C;this.port=A;this.path=E;this.uri=D;this.clientId=z;this._localKey=C+":"+A+(E!="/mqtt"?":"+E:"")+":"+z+":";this._msg_queue=[];this._sentMessages={};this._receivedMessages={};this._notify_msg_sent={};this._message_identifier=1;this._sequence=0;for(var B in localStorage){if(B.indexOf("Sent:"+this._localKey)==0||B.indexOf("Received:"+this._localKey)==0){this.restore(B)}}};v.prototype.host;v.prototype.port;v.prototype.path;v.prototype.uri;v.prototype.clientId;v.prototype.socket;v.prototype.connected=false;v.prototype.maxMessageIdentifier=65536;v.prototype.connectOptions;v.prototype.hostIndex;v.prototype.onConnectionLost;v.prototype.onMessageDelivered;v.prototype.onMessageArrived;v.prototype._msg_queue=null;v.prototype._connectTimeout;v.prototype.sendPinger=null;v.prototype.receivePinger=null;v.prototype.receiveBuffer=null;v.prototype._traceBuffer=null;v.prototype._MAX_TRACE_ENTRIES=100;v.prototype.connect=function(A){var z=this._traceMask(A,"password");this._trace("Client.connect",z,this.socket,this.connected);if(this.connected){throw new Error(u(j.INVALID_STATE,["already connected"]))}if(this.socket){throw new Error(u(j.INVALID_STATE,["already connected"]))}this.connectOptions=A;if(A.uris){this.hostIndex=0;this._doConnect(A.uris[0])}else{this._doConnect(this.uri)}};v.prototype.subscribe=function(A,z){this._trace("Client.subscribe",A,z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}var B=new q(o.SUBSCRIBE);B.topics=[A];if(z.qos!=undefined){B.requestedQos=[z.qos]}else{B.requestedQos=[0]}if(z.onSuccess){B.onSuccess=function(C){z.onSuccess({invocationContext:z.invocationContext,grantedQos:C})}}if(z.onFailure){B.onFailure=function(C){z.onFailure({invocationContext:z.invocationContext,errorCode:C})}}if(z.timeout){B.timeOut=new w(this,window,z.timeout,z.onFailure,[{invocationContext:z.invocationContext,errorCode:j.SUBSCRIBE_TIMEOUT.code,errorMessage:u(j.SUBSCRIBE_TIMEOUT)}])}this._requires_ack(B);this._schedule_message(B)};v.prototype.unsubscribe=function(A,z){this._trace("Client.unsubscribe",A,z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}var B=new q(o.UNSUBSCRIBE);B.topics=[A];if(z.onSuccess){B.callback=function(){z.onSuccess({invocationContext:z.invocationContext})}}if(z.timeout){B.timeOut=new w(this,window,z.timeout,z.onFailure,[{invocationContext:z.invocationContext,errorCode:j.UNSUBSCRIBE_TIMEOUT.code,errorMessage:u(j.UNSUBSCRIBE_TIMEOUT)}])}this._requires_ack(B);this._schedule_message(B)};v.prototype.send=function(z){this._trace("Client.send",z);if(!this.connected){throw new Error(u(j.INVALID_STATE,["not connected"]))}wireMessage=new q(o.PUBLISH);wireMessage.payloadMessage=z;if(z.qos>0){this._requires_ack(wireMessage)}else{if(this.onMessageDelivered){this._notify_msg_sent[wireMessage]=this.onMessageDelivered(wireMessage.payloadMessage)}}this._schedule_message(wireMessage)};v.prototype.disconnect=function(){this._trace("Client.disconnect");if(!this.socket){throw new Error(u(j.INVALID_STATE,["not connecting or connected"]))}wireMessage=new q(o.DISCONNECT);this._notify_msg_sent[wireMessage]=b(this._disconnected,this);this._schedule_message(wireMessage)};v.prototype.getTraceLog=function(){if(this._traceBuffer!==null){this._trace("Client.getTraceLog",new Date());this._trace("Client.getTraceLog in flight messages",this._sentMessages.length);for(var z in this._sentMessages){this._trace("_sentMessages ",z,this._sentMessages[z])}for(var z in this._receivedMessages){this._trace("_receivedMessages ",z,this._receivedMessages[z])}return this._traceBuffer}};v.prototype.startTrace=function(){if(this._traceBuffer===null){this._traceBuffer=[]}this._trace("Client.startTrace",new Date(),h)};v.prototype.stopTrace=function(){delete this._traceBuffer};v.prototype._doConnect=function(A){if(this.connectOptions.useSSL){var z=A.split(":");z[0]="wss";A=z.join(":")}this.connected=false;this.socket=new WebSocket(A,["mqtt","mqttv3.1"]);this.socket.binaryType="arraybuffer";this.socket.onopen=b(this._on_socket_open,this);this.socket.onmessage=b(this._on_socket_message,this);this.socket.onerror=b(this._on_socket_error,this);this.socket.onclose=b(this._on_socket_close,this);this.sendPinger=new s(this,window,this.connectOptions.keepAliveInterval);this.receivePinger=new s(this,window,this.connectOptions.keepAliveInterval);this._connectTimeout=new w(this,window,this.connectOptions.timeout,this._disconnected,[j.CONNECT_TIMEOUT.code,u(j.CONNECT_TIMEOUT)])};v.prototype._schedule_message=function(z){this._msg_queue.push(z);if(this.connected){this._process_queue()}};v.prototype.store=function(D,C){storedMessage={type:C.type,messageIdentifier:C.messageIdentifier,version:1};switch(C.type){case o.PUBLISH:if(C.pubRecReceived){storedMessage.pubRecReceived=true}storedMessage.payloadMessage={};var B="";var A=C.payloadMessage.payloadBytes;for(var z=0;z<A.length;z++){if(A[z]<=15){B=B+"0"+A[z].toString(16)}else{B=B+A[z].toString(16)}}storedMessage.payloadMessage.payloadHex=B;storedMessage.payloadMessage.qos=C.payloadMessage.qos;storedMessage.payloadMessage.destinationName=C.payloadMessage.destinationName;if(C.payloadMessage.duplicate){storedMessage.payloadMessage.duplicate=true}if(C.payloadMessage.retained){storedMessage.payloadMessage.retained=true}if(D.indexOf("Sent:")==0){if(C.sequence===undefined){C.sequence=++this._sequence}storedMessage.sequence=C.sequence}break;default:throw Error(u(j.INVALID_STORED_DATA,[key,storedMessage]))}localStorage.setItem(D+this._localKey+C.messageIdentifier,JSON.stringify(storedMessage))};v.prototype.restore=function(H){var G=localStorage.getItem(H);var F=JSON.parse(G);var I=new q(F.type,F);switch(F.type){case o.PUBLISH:var z=F.payloadMessage.payloadHex;var A=new ArrayBuffer((z.length)/2);var D=new Uint8Array(A);var B=0;while(z.length>=2){var E=parseInt(z.substring(0,2),16);z=z.substring(2,z.length);D[B++]=E}var C=new Paho.MQTT.Message(D);C.qos=F.payloadMessage.qos;C.destinationName=F.payloadMessage.destinationName;if(F.payloadMessage.duplicate){C.duplicate=true}if(F.payloadMessage.retained){C.retained=true}I.payloadMessage=C;break;default:throw Error(u(j.INVALID_STORED_DATA,[H,G]))}if(H.indexOf("Sent:"+this._localKey)==0){I.payloadMessage.duplicate=true;this._sentMessages[I.messageIdentifier]=I}else{if(H.indexOf("Received:"+this._localKey)==0){this._receivedMessages[I.messageIdentifier]=I}}};v.prototype._process_queue=function(){var A=null;var z=this._msg_queue.reverse();while((A=z.pop())){this._socket_send(A);if(this._notify_msg_sent[A]){this._notify_msg_sent[A]();delete this._notify_msg_sent[A]}}};v.prototype._requires_ack=function(A){var z=Object.keys(this._sentMessages).length;if(z>this.maxMessageIdentifier){throw Error("Too many messages:"+z)}while(this._sentMessages[this._message_identifier]!==undefined){this._message_identifier++}A.messageIdentifier=this._message_identifier;this._sentMessages[A.messageIdentifier]=A;if(A.type===o.PUBLISH){this.store("Sent:",A)}if(this._message_identifier===this.maxMessageIdentifier){this._message_identifier=1}};v.prototype._on_socket_open=function(){var z=new q(o.CONNECT,this.connectOptions);z.clientId=this.clientId;this._socket_send(z)};v.prototype._on_socket_message=function(B){this._trace("Client._on_socket_message",B.data);this.receivePinger.reset();var A=this._deframeMessages(B.data);for(var z=0;z<A.length;z+=1){this._handleMessage(A[z])}};v.prototype._deframeMessages=function(F){var A=new Uint8Array(F);if(this.receiveBuffer){var C=new Uint8Array(this.receiveBuffer.length+A.length);C.set(this.receiveBuffer);C.set(A,this.receiveBuffer.length);A=C;delete this.receiveBuffer}try{var G=0;var D=[];while(G<A.length){var z=g(A,G);var E=z[0];G=z[1];if(E!==null){D.push(E)}else{break}}if(G<A.length){this.receiveBuffer=A.subarray(G)}}catch(B){this._disconnected(j.INTERNAL_ERROR.code,u(j.INTERNAL_ERROR,[B.message]));return}return D};v.prototype._handleMessage=function(I){this._trace("Client._handleMessage",I);try{switch(I.type){case o.CONNACK:this._connectTimeout.cancel();if(this.connectOptions.cleanSession){for(var H in this._sentMessages){var G=this._sentMessages[H];localStorage.removeItem("Sent:"+this._localKey+G.messageIdentifier)}this._sentMessages={};for(var H in this._receivedMessages){var z=this._receivedMessages[H];localStorage.removeItem("Received:"+this._localKey+z.messageIdentifier)}this._receivedMessages={}}if(I.returnCode===0){this.connected=true;if(this.connectOptions.uris){this.hostIndex=this.connectOptions.uris.length}}else{this._disconnected(j.CONNACK_RETURNCODE.code,u(j.CONNACK_RETURNCODE,[I.returnCode,f[I.returnCode]]));break}var E=new Array();for(var A in this._sentMessages){if(this._sentMessages.hasOwnProperty(A)){E.push(this._sentMessages[A])}}var E=E.sort(function(K,J){return K.sequence-J.sequence});for(var C=0,D=E.length;C<D;C++){var G=E[C];if(G.type==o.PUBLISH&&G.pubRecReceived){var B=new q(o.PUBREL,{messageIdentifier:G.messageIdentifier});this._schedule_message(B)}else{this._schedule_message(G)}}if(this.connectOptions.onSuccess){this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext})}this._process_queue();break;case o.PUBLISH:this._receivePublish(I);break;case o.PUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){delete this._sentMessages[I.messageIdentifier];localStorage.removeItem("Sent:"+this._localKey+I.messageIdentifier);if(this.onMessageDelivered){this.onMessageDelivered(G.payloadMessage)}}break;case o.PUBREC:var G=this._sentMessages[I.messageIdentifier];if(G){G.pubRecReceived=true;var B=new q(o.PUBREL,{messageIdentifier:I.messageIdentifier});this.store("Sent:",G);this._schedule_message(B)}break;case o.PUBREL:var z=this._receivedMessages[I.messageIdentifier];localStorage.removeItem("Received:"+this._localKey+I.messageIdentifier);if(z){this._receiveMessage(z);delete this._receivedMessages[I.messageIdentifier]}pubCompMessage=new q(o.PUBCOMP,{messageIdentifier:I.messageIdentifier});this._schedule_message(pubCompMessage);break;case o.PUBCOMP:var G=this._sentMessages[I.messageIdentifier];delete this._sentMessages[I.messageIdentifier];localStorage.removeItem("Sent:"+this._localKey+I.messageIdentifier);if(this.onMessageDelivered){this.onMessageDelivered(G.payloadMessage)}break;case o.SUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){if(G.timeOut){G.timeOut.cancel()}I.returnCode.indexOf=Array.prototype.indexOf;if(I.returnCode.indexOf(128)!==-1){if(G.onFailure){G.onFailure(I.returnCode)}}else{if(G.onSuccess){G.onSuccess(I.returnCode)}}delete this._sentMessages[I.messageIdentifier]}break;case o.UNSUBACK:var G=this._sentMessages[I.messageIdentifier];if(G){if(G.timeOut){G.timeOut.cancel()}if(G.callback){G.callback()}delete this._sentMessages[I.messageIdentifier]}break;case o.PINGRESP:this.sendPinger.reset();break;case o.DISCONNECT:this._disconnected(j.INVALID_MQTT_MESSAGE_TYPE.code,u(j.INVALID_MQTT_MESSAGE_TYPE,[I.type]));break;default:this._disconnected(j.INVALID_MQTT_MESSAGE_TYPE.code,u(j.INVALID_MQTT_MESSAGE_TYPE,[I.type]))}}catch(F){this._disconnected(j.INTERNAL_ERROR.code,u(j.INTERNAL_ERROR,[F.message]));return}};v.prototype._on_socket_error=function(z){this._disconnected(j.SOCKET_ERROR.code,u(j.SOCKET_ERROR,[z.data]))};v.prototype._on_socket_close=function(){this._disconnected(j.SOCKET_CLOSE.code,u(j.SOCKET_CLOSE))};v.prototype._socket_send=function(A){if(A.type==1){var z=this._traceMask(A,"password");this._trace("Client._socket_send",z)}else{this._trace("Client._socket_send",A)}this.socket.send(A.encode());this.sendPinger.reset()};v.prototype._receivePublish=function(B){switch(B.payloadMessage.qos){case"undefined":case 0:this._receiveMessage(B);break;case 1:var z=new q(o.PUBACK,{messageIdentifier:B.messageIdentifier});this._schedule_message(z);this._receiveMessage(B);break;case 2:this._receivedMessages[B.messageIdentifier]=B;this.store("Received:",B);var A=new q(o.PUBREC,{messageIdentifier:B.messageIdentifier});this._schedule_message(A);break;default:throw Error("Invaild qos="+wireMmessage.payloadMessage.qos)}};v.prototype._receiveMessage=function(z){if(this.onMessageArrived){this.onMessageArrived(z.payloadMessage)}};v.prototype._disconnected=function(A,z){this._trace("Client._disconnected",A,z);this.sendPinger.cancel();this.receivePinger.cancel();if(this._connectTimeout){this._connectTimeout.cancel()}this._msg_queue=[];this._notify_msg_sent={};if(this.socket){this.socket.onopen=null;this.socket.onmessage=null;this.socket.onerror=null;this.socket.onclose=null;if(this.socket.readyState===1){this.socket.close()}delete this.socket}if(this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1){this.hostIndex++;this._doConnect(this.connectOptions.uris[this.hostIndex])}else{if(A===undefined){A=j.OK.code;z=u(j.OK)}if(this.connected){this.connected=false;if(this.onConnectionLost){this.onConnectionLost({errorCode:A,errorMessage:z})}}else{if(this.connectOptions.mqttVersion===4&&this.connectOptions.mqttVersionExplicit===false){this._trace("Failed to connect V4, dropping back to V3");this.connectOptions.mqttVersion=3;if(this.connectOptions.uris){this.hostIndex=0;this._doConnect(this.connectOptions.uris[0])}else{this._doConnect(this.uri)}}else{if(this.connectOptions.onFailure){this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:A,errorMessage:z})}}}}};v.prototype._trace=function(){if(this._traceBuffer!==null){for(var A=0,z=arguments.length;A<z;A++){if(this._traceBuffer.length==this._MAX_TRACE_ENTRIES){this._traceBuffer.shift()}if(A===0){this._traceBuffer.push(arguments[A])}else{if(typeof arguments[A]==="undefined"){this._traceBuffer.push(arguments[A])}else{this._traceBuffer.push("  "+JSON.stringify(arguments[A]))}}}}};v.prototype._traceMask=function(B,A){var C={};for(var z in B){if(B.hasOwnProperty(z)){if(z==A){C[z]="******"}else{C[z]=B[z]}}}return C};var p=function(I,C,J,z){var B;if(typeof I!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof I,"host"]))}if(arguments.length==2){z=C;B=I;var F=B.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);if(F){I=F[4]||F[2];C=parseInt(F[7]);J=F[8]}else{throw new Error(u(j.INVALID_ARGUMENT,[I,"host"]))}}else{if(arguments.length==3){z=J;J="/mqtt"}if(typeof C!=="number"||C<0){throw new Error(u(j.INVALID_TYPE,[typeof C,"port"]))}if(typeof J!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof J,"path"]))}var A=(I.indexOf(":")!=-1&&I.slice(0,1)!="["&&I.slice(-1)!="]");B="ws://"+(A?"["+I+"]":I)+":"+C+J}var G=0;for(var E=0;E<z.length;E++){var H=z.charCodeAt(E);if(55296<=H&&H<=56319){E++}G++}if(typeof z!=="string"||G>65535){throw new Error(u(j.INVALID_ARGUMENT,[z,"clientId"]))}var D=new v(B,I,C,J,z);this._getHost=function(){return I};this._setHost=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getPort=function(){return C};this._setPort=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getPath=function(){return J};this._setPath=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getURI=function(){return B};this._setURI=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getClientId=function(){return D.clientId};this._setClientId=function(){throw new Error(u(j.UNSUPPORTED_OPERATION))};this._getOnConnectionLost=function(){return D.onConnectionLost};this._setOnConnectionLost=function(K){if(typeof K==="function"){D.onConnectionLost=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onConnectionLost"]))}};this._getOnMessageDelivered=function(){return D.onMessageDelivered};this._setOnMessageDelivered=function(K){if(typeof K==="function"){D.onMessageDelivered=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onMessageDelivered"]))}};this._getOnMessageArrived=function(){return D.onMessageArrived};this._setOnMessageArrived=function(K){if(typeof K==="function"){D.onMessageArrived=K}else{throw new Error(u(j.INVALID_TYPE,[typeof K,"onMessageArrived"]))}};this.connect=function(N){N=N||{};m(N,{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",ports:"object",mqttVersion:"number"});if(N.keepAliveInterval===undefined){N.keepAliveInterval=60}if(N.mqttVersion>4||N.mqttVersion<3){throw new Error(u(j.INVALID_ARGUMENT,[N.mqttVersion,"connectOptions.mqttVersion"]))}if(N.mqttVersion===undefined){N.mqttVersionExplicit=false;N.mqttVersion=4}else{N.mqttVersionExplicit=true}if(N.password===undefined&&N.userName!==undefined){throw new Error(u(j.INVALID_ARGUMENT,[N.password,"connectOptions.password"]))}if(N.willMessage){if(!(N.willMessage instanceof a)){throw new Error(u(j.INVALID_TYPE,[N.willMessage,"connectOptions.willMessage"]))}N.willMessage.stringPayload;if(typeof N.willMessage.destinationName==="undefined"){throw new Error(u(j.INVALID_TYPE,[typeof N.willMessage.destinationName,"connectOptions.willMessage.destinationName"]))}}if(typeof N.cleanSession==="undefined"){N.cleanSession=true}if(N.hosts){if(!(N.hosts instanceof Array)){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts,"connectOptions.hosts"]))}if(N.hosts.length<1){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts,"connectOptions.hosts"]))}var P=false;for(var M=0;M<N.hosts.length;M++){if(typeof N.hosts[M]!=="string"){throw new Error(u(j.INVALID_TYPE,[typeof N.hosts[M],"connectOptions.hosts["+M+"]"]))}if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(N.hosts[M])){if(M==0){P=true}else{if(!P){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts[M],"connectOptions.hosts["+M+"]"]))}}}else{if(P){throw new Error(u(j.INVALID_ARGUMENT,[N.hosts[M],"connectOptions.hosts["+M+"]"]))}}}if(!P){if(!N.ports){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}if(!(N.ports instanceof Array)){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}if(N.hosts.length!=N.ports.length){throw new Error(u(j.INVALID_ARGUMENT,[N.ports,"connectOptions.ports"]))}N.uris=[];for(var M=0;M<N.hosts.length;M++){if(typeof N.ports[M]!=="number"||N.ports[M]<0){throw new Error(u(j.INVALID_TYPE,[typeof N.ports[M],"connectOptions.ports["+M+"]"]))}var O=N.hosts[M];var L=N.ports[M];var K=(O.indexOf(":")!=-1);B="ws://"+(K?"["+O+"]":O)+":"+L+J;N.uris.push(B)}}else{N.uris=N.hosts}}D.connect(N)};this.subscribe=function(L,K){if(typeof L!=="string"){throw new Error("Invalid argument:"+L)}K=K||{};m(K,{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(K.timeout&&!K.onFailure){throw new Error("subscribeOptions.timeout specified with no onFailure callback.")}if(typeof K.qos!=="undefined"&&!(K.qos===0||K.qos===1||K.qos===2)){throw new Error(u(j.INVALID_ARGUMENT,[K.qos,"subscribeOptions.qos"]))}D.subscribe(L,K)};this.unsubscribe=function(L,K){if(typeof L!=="string"){throw new Error("Invalid argument:"+L)}K=K||{};m(K,{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(K.timeout&&!K.onFailure){throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.")}D.unsubscribe(L,K)};this.send=function(K){if(!(K instanceof a)){throw new Error("Invalid argument:"+typeof K)}if(typeof K.destinationName==="undefined"){throw new Error("Invalid parameter Message.destinationName:"+K.destinationName)}D.send(K)};this.disconnect=function(){D.disconnect()};this.getTraceLog=function(){return D.getTraceLog()};this.startTrace=function(){D.startTrace()};this.stopTrace=function(){D.stopTrace()};this.isConnected=function(){return D.connected}};p.prototype={get hostfunction(){return this._getHost()},set hostfunction(z){this._setHost(z)},get portfunction(){return this._getPort()},set portfunction(z){this._setPort(z)},get pathfunction(){return this._getPath()},set pathfunction(z){this._setPath(z)},get clientIdfunction(){return this._getClientId()},set clientIdfunction(z){this._setClientId(z)},get onConnectionLostfunction(){return this._getOnConnectionLost()},set onConnectionLostfunction(z){this._setOnConnectionLost(z)},get onMessageDeliveredfunction(){return this._getOnMessageDelivered()},set onMessageDeliveredfunction(z){this._setOnMessageDelivered(z)},get onMessageArrivedfunction(){return this._getOnMessageArrived()},set onMessageArrivedfunction(z){this._setOnMessageArrived(z)}};var a=function(A){var D;if(typeof A==="string"||A instanceof ArrayBuffer||A instanceof Int8Array||A instanceof Uint8Array||A instanceof Int16Array||A instanceof Uint16Array||A instanceof Int32Array||A instanceof Uint32Array||A instanceof Float32Array||A instanceof Float64Array){D=A}else{throw (u(j.INVALID_ARGUMENT,[A,"newPayload"]))}this._getPayloadString=function(){if(typeof D==="string"){return D}else{return n(D,0,D.length)}};this._getPayloadBytes=function(){if(typeof D==="string"){var F=new ArrayBuffer(c(D));var G=new Uint8Array(F);i(D,G,0);return G}else{return D}};var E=undefined;this._getDestinationName=function(){return E};this._setDestinationName=function(F){if(typeof F==="string"){E=F}else{throw new Error(u(j.INVALID_ARGUMENT,[F,"newDestinationName"]))}};var B=0;this._getQos=function(){return B};this._setQos=function(F){if(F===0||F===1||F===2){B=F}else{throw new Error("Invalid argument:"+F)}};var z=false;this._getRetained=function(){return z};this._setRetained=function(F){if(typeof F==="boolean"){z=F}else{throw new Error(u(j.INVALID_ARGUMENT,[F,"newRetained"]))}};var C=false;this._getDuplicate=function(){return C};this._setDuplicate=function(F){C=F}};a.prototype={get payloadStringfunction(){return this._getPayloadString()},get payloadBytesfunction(){return this._getPayloadBytes()},get destinationNamefunction(){return this._getDestinationName()},set destinationNamefunction(z){this._setDestinationName(z)},get qosfunction(){return this._getQos()},set qosfunction(z){this._setQos(z)},get retainedfunction(){return this._getRetained()},set retainedfunction(z){this._setRetained(z)},get duplicatefunction(){return this._getDuplicate()},set duplicatefunction(z){this._setDuplicate(z)}};return{Client:p,Message:a}})(window);
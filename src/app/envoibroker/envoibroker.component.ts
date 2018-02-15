import { Component, OnInit } from '@angular/core';
import {Broker} from '../broker';

@Component({
  selector: 'app-envoibroker',
  templateUrl: './envoibroker.component.html',
  styleUrls: ['./envoibroker.component.css']
})

export class EnvoibrokerComponent implements OnInit {
    
    broker:Broker ={
        Data: '',
        Topic: '',
        Message:"Pas de Données",
        mqtt: null,
        client: null,
        event :0,
        etatConnect:"Deconnecté"
    };
    
constructor() { }

  ngOnInit() {
  } 
    
onToggleConnectEvent(broker:Broker):void{
    if(broker.event==0){
        broker.mqtt = require('mqtt');
        broker.client = broker.mqtt.connect('mqtt://fde52271:0b9c06301e82918f@broker.shiftr.io', {clientId:'Cla'});
        broker.event=1;
        broker.etatConnect="Connecté";
    }
    else if(broker.event==1)
    {
        broker.client.end();
        broker.event=0;
        broker.etatConnect="Deconnecté";
    }
}

onDisconnect(broker:Broker):void{
    
    broker.client.close();
}
            
onPublish(broker:Broker) : void{
    broker.client.publish('/'+broker.Topic, broker.Data);
    broker.client.on('message', function(topic, message) {
        broker.Message = message.toString()+"sur le topic "+topic.toString();
    });
    broker.client.on('offline',function(){broker.client.reconnect()});
}

onSubscribe(broker:Broker) : void{
    broker.client.subscribe('/'+broker.Topic);
    broker.client.on('message', function(topic, message) {
        broker.Message = message.toString()+" depuis le topic "+topic.toString();
    });
    broker.client.on('offline',function(){broker.client.reconnect()});
}
}
/**
 * 消息中心
 */

const Event = {
    
    _event : [],

    On( eventname, callback, target) {
        const message = {
          id: this.messages.length + 1,
          eventname,
          callback,
          target,
        };
        this._event.push(message);
        return message.id;
    },
    
    send( eventname, data ) {
        for (let index = 0; index < this._event.length; index++) {
            var event = this._event[index];
            if(event.eventname == eventname)
            {
                event.callback( event.target, data );
            }
        }
    },
    
    delete(eventId) {
        const index = this._event.findIndex(message => message.id === eventId);
        if (index !== -1) {
          this._event.splice(index, 1);
          return true;
        }
        return false;
      },

};

wzj.event = module.exports = Event